from flask_seeder import FlaskSeeder
from app.app import app, db

def create_app():
  seeder = FlaskSeeder()
  seeder.init_app(app, db)
  return app 

app = create_app()

if __name__ == "__main__":
  create_app()