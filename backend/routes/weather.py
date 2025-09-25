from flask import Blueprint, jsonify

weather_bp = Blueprint('weather', __name__)

@weather_bp.route('/', methods=['GET'])
def get_weather():
    # Dummy weather
    return jsonify({
        "location": "Kerala",
        "temperature": "30°C",
        "condition": "Sunny"
    })
