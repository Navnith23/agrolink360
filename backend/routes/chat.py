from flask import Blueprint, request, jsonify
from datetime import datetime

chat_bp = Blueprint('chat', __name__)

# Dummy chat messages
messages = []

@chat_bp.route('/send', methods=['POST'])
def send_message():
    data = request.json
    msg = {
        "user": data.get("user"),
        "message": data.get("message"),
        "time": datetime.now().strftime("%H:%M %d/%m/%Y")
    }
    messages.append(msg)
    return jsonify(msg)

@chat_bp.route('/messages', methods=['GET'])
def get_messages():
    return jsonify(messages)
