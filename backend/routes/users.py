from flask import Blueprint, jsonify
from pymongo import MongoClient

users_bp = Blueprint('users', __name__)
client = MongoClient("YOUR_MONGODB_CONNECTION_STRING")
db = client['agrolink360']
users = db['users']

# Get all farmers
@users_bp.route('/farmers', methods=['GET'])
def get_farmers():
    farmer_list = list(users.find({"role": "farmer"}, {"_id": 0}))
    return jsonify(farmer_list)

# Get all buyers
@users_bp.route('/buyers', methods=['GET'])
def get_buyers():
    buyer_list = list(users.find({"role": "buyer"}, {"_id": 0}))
    return jsonify(buyer_list)
