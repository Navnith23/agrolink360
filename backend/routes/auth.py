from flask import Blueprint, request, jsonify
from pymongo import MongoClient

auth_bp = Blueprint('auth', __name__)
client = MongoClient("YOUR_MONGODB_CONNECTION_STRING")
db = client['agrolink360']
users = db['users']

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')  # For now, no password in DB, just validate username

    user = users.find_one({"username": username})
    if user:
        return jsonify({"status": "success", "user": {"username": user['username'], "role": user['role']}})
    return jsonify({"status": "error", "message": "User not found"}), 404
