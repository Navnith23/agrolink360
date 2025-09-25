from flask import Flask
from routes.auth import auth_bp
from routes.users import users_bp
from routes.products import products_bp

app = Flask(__name__)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(users_bp, url_prefix='/api/users')
app.register_blueprint(products_bp, url_prefix='/api/products')

if __name__ == '__main__':
    app.run(debug=True)
