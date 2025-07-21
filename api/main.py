from flask import Flask, jsonify
from flask_cors import CORS
from career_analyzer import analyzer_bp
from roadmap import roadmap_bp

app = Flask(__name__)
CORS(app)

# Add a health check route
@app.route('/health')
def health():
    return jsonify({"status": "OK", "message": "DECIJ Backend is running"})

@app.route('/')
def home():
    return jsonify({"message": "DECIJ API is running", "endpoints": ["/health", "/api/career-roadmap", "/api/analyze-career"]})

# Register blueprints
app.register_blueprint(analyzer_bp)
app.register_blueprint(roadmap_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)