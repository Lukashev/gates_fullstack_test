from flask_seeder import Seeder
from app.app import Metric, MetricError
import json

class TestSeeder(Seeder):

  def run(self):
    try:
      errors = {
        'errors_last_3days': 2,
        'errors_yesterday': 1,
        'errors_last_hour': 0
      }
      with open('dashboard_data.json') as json_file:
        data = json.load(json_file)
        metrics = data['data'][0]
        metrics_error_list = { key: data[key] for key in data if key != 'data' }

        last_3days = {}
        yesterday = {}
        last_hour = {}
        common = {}

        for key in metrics:
          current_metric = metrics[key]
          if key == 'gate_id':
            continue
          if 'last_3days' in key:
            last_3days[key.replace('_last_3days', '')] = current_metric
            continue
          if 'yesterday' in key:
            yesterday[key.replace('_yesterday', '')] = current_metric
            continue
          if 'last_hour' in key:
            last_hour[key.replace('_last_hour', '')] = current_metric
            continue
          common[key] = current_metric
        
        metric_obj_list = [
          { **last_3days, **common, 'id': 2 },
          { **yesterday, **common, 'id': 1 },
          { **last_hour, **common, 'id': 0 }
        ]

        metric_error_rows_deleted = self.db.session.query(MetricError).delete()
        metric_rows_deleted = self.db.session.query(Metric).delete()

        print(f'Metric rows deleted {metric_rows_deleted}')
        print(f'Metric error rows deleted {metric_error_rows_deleted}')

        print(metric_obj_list)

        for obj in metric_obj_list:
          m = Metric(**obj)
          self.db.session.add(m)

        for key in metrics_error_list:
          error_list = metrics_error_list[key]
          for obj in error_list:
            obj['period_id'] = errors.get(key)
            metric_error = MetricError(**obj)
            self.db.session.add(metric_error)

        self.db.session.commit()

    except Exception as ex:
      print(ex)
      self.db.session.rollback()