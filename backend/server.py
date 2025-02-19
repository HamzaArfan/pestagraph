from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Store your API token securely (consider using environment variables)
API_TOKEN = "6653420429:jJSmds3a"
API_URL = "https://leakosintapi.com/"

@app.route('/api/profile', methods=['POST'])
def get_profile():
    try:
        # Get the phone number from the request
        data = request.json
        phone_number = data.get('phone_number')
        
        if not phone_number:
            return jsonify({'error': 'Phone number is required'}), 400
        
        # Make the request to the external API
        response = requests.post(
            API_URL,
            json={
                'token': API_TOKEN,
                'request': phone_number,
                'limit': 100,
                'lang': 'en'
            }
        )
        
        # Check if the request was successful
        response.raise_for_status()
        
        return jsonify(response.json())
    
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'API request failed: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)