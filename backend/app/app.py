from flask import Flask
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:root@localhost:5432/gates_fullstack'
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Metric(db.Model):
  __tablename__ = 'metric'

  id = db.Column(db.Integer(), primary_key=True)
  bookings_current = db.Column(db.Integer(), default=0)
  bookings_previous = db.Column(db.Integer(), default=0)
  searches_current = db.Column(db.Integer(), default=0)
  searches_previous = db.Column(db.Integer(), default=0)
  clicks_current = db.Column(db.Integer(), default=0)
  clicks_previous = db.Column(db.Integer(), default=0)
  timeout = db.Column(db.Float())
  zeroes = db.Column(db.Float())
  errors = db.Column(db.Float())
  avg_price = db.Column(db.Float())
  ctr = db.Column(db.Float())
  str = db.Column(db.Float())
  web_pessimizer = db.Column(db.Float())
  mobile_pessimizer = db.Column(db.Float())
  error_list = db.relationship("MetricError", backref="metric", cascade="all, delete", lazy=False)

  def __repr__(self):
    return f"<Metric: {self.id}"

  def as_dict(self):
    return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns }


class MetricError(db.Model):
  __tablename__ = 'metric_error'
  id = db.Column(db.Integer(), primary_key=True)
  code = db.Column(db.Integer(), default=0)
  count = db.Column(db.Integer(), default=0)
  period_id = db.Column(db.Integer(), db.ForeignKey('metric.id'))

  def as_dict(self):
    return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns }

  def __repr__(self):
    return f"<MetricError: {self.id}"


@app.errorhandler(Exception)
def all_exception_handler(error):
    return "Error: " + str(error)

# This route only for testing purposes
@app.route('/')
@cross_origin()
def test():
  return "Hello World"


# Here we get all rows from table Metric
@app.route('/v1/metrics/')
@cross_origin()
def get_metric_list():
  m_list = Metric.query.all()
  result = [{ **m.as_dict(), 'error_list': [{ **e.as_dict() } for e in m.error_list] } for m in m_list]
  return {'result': result}

@app.route('/v1/metrics/<metric_id>')
@cross_origin()
def get_metric_by_id(metric_id=0):
  try:
    current_metric = Metric.query.get(metric_id)
  except Exception:
    raise Exception("There is no metric that corresponding to current metric_id")
  return {'result': { **current_metric.as_dict(), 'error_list': [{ **e.as_dict() } for e in current_metric.error_list] } }

if __name__ == "__main__":
  app.run(debug=True)
