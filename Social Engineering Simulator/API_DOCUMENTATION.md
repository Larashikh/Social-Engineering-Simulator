# 🔌 Backend API Integration Guide

## Overview

The Social Engineering Simulator is designed to work with a Flask backend. Currently, it uses mock data for demonstration, but can easily be integrated with a real backend.

## Architecture

```
┌─────────────────────────────────┐
│   Frontend (HTML/CSS/JS)        │
│   - Renders UI                  │
│   - Handles user interactions   │
└────────────┬────────────────────┘
             │
          fetch()
             │
             ▼
┌─────────────────────────────────┐
│   Backend API (Flask)           │
│   - Manages scenarios           │
│   - Processes answers           │
│   - Calculates scores           │
│   - Manages leaderboard         │
└─────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│   Database                      │
│   - User data                   │
│   - Scenarios                   │
│   - Scores & Results            │
└─────────────────────────────────┘
```

## API Endpoints Required

### 1. Get Scenario

**Endpoint:** `GET /api/scenario?scenario=1`

**Parameters:**
- `scenario` (int, 1-5) - Scenario number

**Response:**
```json
{
  "id": 1,
  "type": "email",
  "title": "Mandatory Password Update Required",
  "description": "You receive an email from it.support@company-internal.com",
  "content": "Our IT department requires all employees to update...",
  "sender": "it.support@company-internal.com",
  "answers": [
    {
      "id": 1,
      "text": "Open the link and update password",
      "correct": false
    },
    {
      "id": 2,
      "text": "Contact IT directly to verify",
      "correct": true
    },
    {
      "id": 3,
      "text": "Report as spam",
      "correct": false
    }
  ],
  "explanation": "This is a phishing email. Real IT departments never ask for passwords via email...",
  "redFlags": [
    "Suspicious link",
    "Urgent tone",
    "Request for credentials"
  ],
  "tips": [
    "Never click links in unsolicited emails",
    "Contact IT directly",
    "Check sender email carefully"
  ]
}
```

### 2. Submit Answer

**Endpoint:** `POST /api/answer`

**Request Body:**
```json
{
  "scenario_id": 1,
  "answer": 2
}
```

**Response:**
```json
{
  "correct": true,
  "explanation": "This is a phishing email. Be careful with unsolicited emails...",
  "score_gained": 1,
  "tips": [
    "Always verify through official channels",
    "Check sender email carefully",
    "Never click suspicious links"
  ]
}
```

### 3. Get User Score

**Endpoint:** `GET /api/score/{userId}`

**Parameters:**
- `userId` (string) - User ID or username

**Response:**
```json
{
  "user_id": "user123",
  "total_scenarios": 5,
  "correct_answers": 3,
  "accuracy": 60,
  "awareness_level": "Developing",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 4. Get Leaderboard

**Endpoint:** `GET /api/leaderboard`

**Query Parameters:**
- `limit` (int, optional) - Number of results (default: 10)
- `period` (string, optional) - "daily", "weekly", "monthly", "all"

**Response:**
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "user_id": "sara123",
      "name": "Sara",
      "score": 9,
      "accuracy": 90,
      "awareness_level": "Advanced"
    },
    {
      "rank": 2,
      "user_id": "ahmad456",
      "name": "Ahmad",
      "score": 8,
      "accuracy": 80,
      "awareness_level": "Advanced"
    }
  ]
}
```

### 5. Save Session (Optional)

**Endpoint:** `POST /api/session`

**Request Body:**
```json
{
  "user_id": "user123",
  "name": "John Doe",
  "email": "john@example.com",
  "start_time": "2024-01-15T10:00:00Z",
  "answers": [
    {
      "scenario": 1,
      "answer": 2,
      "correct": true
    }
  ],
  "final_score": 3,
  "accuracy": 60
}
```

**Response:**
```json
{
  "success": true,
  "user_id": "user123",
  "session_id": "session_abc123"
}
```

## Flask Implementation Example

### 1. Basic Setup

```python
from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Mock database
SCENARIOS = [
    {
        'id': 1,
        'type': 'email',
        'title': 'Mandatory Password Update Required',
        'description': 'You receive an email from it.support@company-internal.com',
        'content': 'Our IT department requires all employees to update...',
        'sender': 'it.support@company-internal.com',
        'answers': [
            {'id': 1, 'text': 'Open the link and update password', 'correct': False},
            {'id': 2, 'text': 'Contact IT directly to verify', 'correct': True},
            {'id': 3, 'text': 'Report as spam', 'correct': False}
        ],
        'explanation': 'This is a phishing email...',
        'redFlags': ['Suspicious link', 'Urgent tone', 'Request for credentials'],
        'tips': ['Never click links in unsolicited emails', 'Contact IT directly']
    },
    # Add more scenarios...
]

@app.route('/api/scenario')
def get_scenario():
    scenario_num = request.args.get('scenario', 1, type=int)
    
    # Validate scenario number
    if scenario_num < 1 or scenario_num > len(SCENARIOS):
        return jsonify({'error': 'Invalid scenario number'}), 400
    
    scenario = SCENARIOS[scenario_num - 1]
    return jsonify(scenario)

@app.route('/api/answer', methods=['POST'])
def submit_answer():
    data = request.get_json()
    scenario_id = data.get('scenario_id')
    answer_id = data.get('answer')
    
    # Find scenario
    scenario = next((s for s in SCENARIOS if s['id'] == scenario_id), None)
    if not scenario:
        return jsonify({'error': 'Scenario not found'}), 404
    
    # Find answer
    answer = next((a for a in scenario['answers'] if a['id'] == answer_id), None)
    if not answer:
        return jsonify({'error': 'Answer not found'}), 400
    
    # Return feedback
    return jsonify({
        'correct': answer['correct'],
        'explanation': scenario['explanation'],
        'score_gained': 1 if answer['correct'] else 0,
        'tips': scenario['tips']
    })

@app.route('/api/score/<user_id>')
def get_score(user_id):
    # This would query your database
    # For now, return mock data
    return jsonify({
        'user_id': user_id,
        'total_scenarios': 5,
        'correct_answers': 3,
        'accuracy': 60,
        'awareness_level': 'Developing',
        'timestamp': '2024-01-15T10:30:00Z'
    })

@app.route('/api/leaderboard')
def get_leaderboard():
    limit = request.args.get('limit', 10, type=int)
    
    # Mock leaderboard data
    leaderboard = [
        {'rank': 1, 'name': 'Sara', 'score': 9, 'awareness_level': 'Advanced'},
        {'rank': 2, 'name': 'Ahmad', 'score': 8, 'awareness_level': 'Advanced'},
        {'rank': 3, 'name': 'Layla', 'score': 8, 'awareness_level': 'Advanced'},
        {'rank': 4, 'name': 'Omar', 'score': 7, 'awareness_level': 'Intermediate'},
        {'rank': 5, 'name': 'Fatima', 'score': 7, 'awareness_level': 'Intermediate'}
    ]
    
    return jsonify({'leaderboard': leaderboard[:limit]})

@app.route('/api/session', methods=['POST'])
def save_session():
    data = request.get_json()
    # Save to database
    return jsonify({
        'success': True,
        'user_id': data.get('user_id'),
        'session_id': 'session_abc123'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

### 2. Database Schema

```sql
-- Users table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table
CREATE TABLE sessions (
    session_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    total_scenarios INT DEFAULT 5,
    correct_answers INT DEFAULT 0,
    accuracy DECIMAL(5,2),
    awareness_level VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Answers table
CREATE TABLE answers (
    answer_id INT PRIMARY KEY AUTO_INCREMENT,
    session_id INT NOT NULL,
    scenario_id INT NOT NULL,
    answer_selected INT,
    is_correct BOOLEAN,
    FOREIGN KEY (session_id) REFERENCES sessions(session_id)
);

-- Scenarios table
CREATE TABLE scenarios (
    scenario_id INT PRIMARY KEY AUTO_INCREMENT,
    scenario_type VARCHAR(50),
    title VARCHAR(200),
    description TEXT,
    content TEXT,
    sender VARCHAR(100),
    explanation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scenario answers table
CREATE TABLE scenario_answers (
    answer_id INT PRIMARY KEY AUTO_INCREMENT,
    scenario_id INT NOT NULL,
    answer_text VARCHAR(300),
    is_correct BOOLEAN,
    FOREIGN KEY (scenario_id) REFERENCES scenarios(scenario_id)
);
```

## Frontend Integration

### Update API URL

In `js/api.js`, change:

```javascript
const API = new APIManager('http://your-server.com/api');
// Or for local development:
const API = new APIManager('http://localhost:5000/api');
```

### CORS Configuration (Flask)

```python
from flask_cors import CORS

app = Flask(__name__)

# Allow requests from frontend
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "https://your-domain.com"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})
```

## Error Handling

### Frontend Error Handling (Already Implemented)

```javascript
// In api.js - request() method
try {
  // Make request
} catch (error) {
  if (error.name === 'AbortError') {
    throw new Error('Request timeout');
  }
  // Return mock data as fallback
  return this.getMockScenario();
}
```

### Backend Error Responses

```python
@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad request'}), 400

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Server error'}), 500
```

## Security Considerations

### 1. CORS Security

```python
# Specific origins only
CORS(app, origins=["https://yourdomain.com"])

# Not this (allows all):
CORS(app)
```

### 2. Input Validation

```python
@app.route('/api/answer', methods=['POST'])
def submit_answer():
    data = request.get_json()
    
    # Validate input
    if not all(k in data for k in ['scenario_id', 'answer']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    if not isinstance(data['scenario_id'], int):
        return jsonify({'error': 'Invalid scenario_id'}), 400
    
    # Process...
```

### 3. Rate Limiting

```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

@app.route('/api/answer', methods=['POST'])
@limiter.limit("10 per minute")
def submit_answer():
    # ...
```

### 4. Authentication (Optional)

```python
from flask_jwt_extended import JWTManager, create_access_token, jwt_required

jwt = JWTManager(app)

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

@app.route('/api/scenario')
@jwt_required()
def get_scenario():
    # Protected route
    pass
```

## Testing APIs

### Using cURL

```bash
# Get scenario
curl http://localhost:5000/api/scenario?scenario=1

# Submit answer
curl -X POST http://localhost:5000/api/answer \
  -H "Content-Type: application/json" \
  -d '{"scenario_id": 1, "answer": 2}'

# Get score
curl http://localhost:5000/api/score/user123

# Get leaderboard
curl http://localhost:5000/api/leaderboard
```

### Using Postman

1. Create a new collection
2. Add requests for each endpoint
3. Set headers: `Content-Type: application/json`
4. Test with different parameters

## Performance Optimization

### Caching

```python
from flask_caching import Cache

cache = Cache(app, config={'CACHE_TYPE': 'simple'})

@app.route('/api/leaderboard')
@cache.cached(timeout=300)  # Cache for 5 minutes
def get_leaderboard():
    # ...
```

### Database Connection Pooling

```python
from sqlalchemy import create_engine

engine = create_engine(
    'mysql+pymysql://user:password@localhost/db',
    pool_size=10,
    max_overflow=20
)
```

### Pagination for Leaderboard

```python
@app.route('/api/leaderboard')
def get_leaderboard():
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 10, type=int)
    
    offset = (page - 1) * limit
    
    leaderboard = db.query(User).offset(offset).limit(limit).all()
    
    return jsonify({
        'leaderboard': leaderboard,
        'page': page,
        'limit': limit,
        'total': db.query(User).count()
    })
```

## Deployment

### Using Gunicorn

```bash
# Install
pip install gunicorn

# Run
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Using Docker

```dockerfile
FROM python:3.9

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

### Environment Variables

```python
import os

FLASK_ENV = os.getenv('FLASK_ENV', 'development')
DATABASE_URL = os.getenv('DATABASE_URL')
JWT_SECRET = os.getenv('JWT_SECRET')
CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*')
```

## API Documentation (Swagger)

```python
from flasgger import Swagger

swagger = Swagger(app)

@app.route('/api/scenario')
def get_scenario():
    """
    Get a scenario
    ---
    parameters:
      - name: scenario
        in: query
        type: integer
        required: true
    responses:
      200:
        description: Scenario data
    """
    # ...
```

## Troubleshooting

### CORS Errors

```
Access to XMLHttpRequest blocked by CORS policy
```

Solution: Enable CORS in Flask

```python
CORS(app)
```

### Timeout Errors

Solution: Increase timeout in frontend

```javascript
const API = new APIManager('url');
API.timeout = 15000; // 15 seconds
```

### 404 Errors

Solution: Check endpoint URLs match

Frontend: `/api/scenario`
Backend: `@app.route('/api/scenario')`

## Next Steps

1. **Implement backend** using provided Flask code
2. **Update API URL** in frontend `js/api.js`
3. **Test endpoints** with Postman/cURL
4. **Add database** integration
5. **Deploy** to production server
6. **Monitor** API performance

---

For questions or issues with backend integration, refer to Flask documentation: https://flask.palletsprojects.com/

Happy coding! 🚀
