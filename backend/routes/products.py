from flask import Blueprint, jsonify
from pymongo import MongoClient

products_bp = Blueprint('products', __name__)
client = MongoClient("YOUR_MONGODB_CONNECTION_STRING")
db = client['agrolink360']
products = db['products']

@products_bp.route('/', methods=['GET'])
def get_all_products():
    product_list = list(products.find({}, {"_id": 0}))
    return jsonify(product_list)

@products_bp.route('/category/<cat>', methods=['GET'])
def get_products_by_category(cat):
    product_list = list(products.find({"category": cat}, {"_id": 0}))
    return jsonify(product_list)
