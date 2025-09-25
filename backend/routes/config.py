from pymongo import MongoClient

# MongoDB Atlas connection string (replace <username>, <password>, <cluster> accordingly)
MONGO_URI = "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/agrolink360?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI)
db = client.agrolink360  # database name
