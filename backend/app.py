from flask import Flask, jsonify
from flask_cors import CORS
from data_processor import DataProcessor
import os

app = Flask(__name__)
CORS(app) # Allow all origins by default for now

# Initialize Data Processor
# Assuming data is in ../data/player_stats.csv relative to this file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, '../data/player_stats.csv')

try:
    processor = DataProcessor(DATA_PATH)
    print("Data loaded successfully.")
except Exception as e:
    print(f"Error loading data: {e}")
    processor = None

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "data_loaded": processor is not None})

@app.route('/api/stats/goals', methods=['GET'])
def get_top_goals():
    if not processor: return jsonify({"error": "Data not loaded"}), 500
    return jsonify(processor.get_top_scorers())

@app.route('/api/stats/assists', methods=['GET'])
def get_top_assists():
    if not processor: return jsonify({"error": "Data not loaded"}), 500
    return jsonify(processor.get_top_assists())

@app.route('/api/stats/ga_ratio', methods=['GET'])
def get_top_ga_ratio():
    if not processor: return jsonify({"error": "Data not loaded"}), 500
    return jsonify(processor.get_top_ga_ratio())

@app.route('/api/stats/saves', methods=['GET'])
def get_top_saves():
    if not processor: return jsonify({"error": "Data not loaded"}), 500
    return jsonify(processor.get_top_saves())

@app.route('/api/stats/clutch', methods=['GET'])
def get_top_clutch():
    if not processor: return jsonify({"error": "Data not loaded"}), 500
    return jsonify(processor.get_top_clutch())

if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0')
