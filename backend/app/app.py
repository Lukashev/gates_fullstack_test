from flask import Flask
from flask_cors import CORS
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
    return {c.name: str(getattr(self, c.name) for c in self.__table__.columns )}


class MetricError(db.Model):
  __tablename__ = 'metric_error'
  id = db.Column(db.Integer(), primary_key=True)
  code = db.Column(db.Integer(), default=0)
  count = db.Column(db.Integer(), default=0)
  period_id = db.Column(db.Integer(), db.ForeignKey('metric.id'))

  def as_dict(self):
    return {c.name: str(getattr(self, c.name) for c in self.__table__.columns )}

  def __repr__(self):
    return f"<MetricError: {self.id}"



@app.route('/')
def test():
  return "Hello World"




if __name__ == "__main__":
  app.run(debug=True)
