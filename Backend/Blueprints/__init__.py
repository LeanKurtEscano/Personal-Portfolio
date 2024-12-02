
from flask import Flask
from flask_cors import CORS
from .Auth.routes import lg
def create_app():
    
    app = Flask(__name__)
    app.secret_key = 'rtrwrwrerqwerf'
    CORS(app,supports_credentials=True, origins=["http://localhost:5173"])
    app.register_blueprint(lg, url_prefix = "/user")
    return app