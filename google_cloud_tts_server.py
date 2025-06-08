#!/usr/bin/env python3
"""
🤖 J.A.R.V.I.S Google Cloud TTS Server
=====================================
High-quality text-to-speech using Google Cloud TTS API with service account authentication
"""

import os
import tempfile
import uuid
import json
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import requests
import base64
from google.oauth2 import service_account
from google.auth.transport.requests import Request

app = Flask(__name__)
CORS(app)

# Load service account credentials
CREDENTIALS_FILE = "jarvis-tts-credentials.json"

def get_access_token():
    """Get access token using service account credentials"""
    try:
        with open(CREDENTIALS_FILE, 'r') as f:
            credentials_info = json.load(f)
        
        credentials = service_account.Credentials.from_service_account_info(
            credentials_info,
            scopes=['https://www.googleapis.com/auth/cloud-platform']
        )
        
        # Refresh token to get access token
        credentials.refresh(Request())
        return credentials.token
    except Exception as e:
        print(f"❌ Error getting access token: {e}")
        return None

def speak_with_google_tts(text, voice_name="en-US-Neural2-J"):
    """Generate speech using Google Cloud TTS API with service account"""
    try:
        access_token = get_access_token()
        if not access_token:
            return None
        
        url = "https://texttospeech.googleapis.com/v1/text:synthesize"
        
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "input": {"text": text},
            "voice": {
                "languageCode": "en-US",
                "name": voice_name
            },
            "audioConfig": {
                "audioEncoding": "MP3",
                "speakingRate": 1.0,
                "pitch": 0.0,
                "volumeGainDb": 0.0
            }
        }
        
        print(f"🔄 Generating Google TTS: '{text[:50]}{'...' if len(text) > 50 else ''}'")
        
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            audio_content = base64.b64decode(result['audioContent'])
            
            # Save to temporary file
            temp_file = tempfile.NamedTemporaryFile(
                delete=False, 
                suffix='.mp3',
                dir=tempfile.gettempdir()
            )
            temp_file.write(audio_content)
            temp_file.close()
            
            print(f"✅ Google TTS generated: {temp_file.name}")
            return temp_file.name
        else:
            print(f"❌ Google TTS API Error: {response.status_code}")
            print(f"Response: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ Google TTS Error: {e}")
        return None

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    try:
        token = get_access_token()
        if token:
            return jsonify({
                "status": "healthy",
                "service": "Google Cloud TTS",
                "authentication": "✅ Service Account Working"
            }), 200
        else:
            return jsonify({
                "status": "error",
                "service": "Google Cloud TTS", 
                "authentication": "❌ Service Account Failed"
            }), 503
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 503

@app.route('/speak', methods=['POST'])
def speak():
    """Convert text to speech using Google TTS"""
    try:
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({"error": "Missing 'text' field"}), 400
        
        text = data['text']
        voice = data.get('voice', 'en-US-Neural2-J')  # Default to high-quality neural voice
        
        audio_file = speak_with_google_tts(text, voice)
        
        if audio_file and os.path.exists(audio_file):
            def cleanup():
                try:
                    os.unlink(audio_file)
                except:
                    pass
            
            return send_file(
                audio_file,
                mimetype='audio/mpeg',
                as_attachment=False,
                download_name='speech.mp3'
            )
        else:
            return jsonify({"error": "Failed to generate speech"}), 503
            
    except Exception as e:
        print(f"❌ Error in /speak endpoint: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/voices', methods=['GET'])
def get_voices():
    """List available Google TTS voices"""
    try:
        access_token = get_access_token()
        if not access_token:
            return jsonify({"error": "Authentication failed"}), 503
        
        url = "https://texttospeech.googleapis.com/v1/voices"
        headers = {"Authorization": f"Bearer {access_token}"}
        
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            voices = response.json()
            # Filter for English neural voices
            english_voices = [
                voice for voice in voices.get('voices', [])
                if 'en-US' in voice.get('languageCodes', []) 
                and 'Neural' in voice.get('name', '')
            ]
            return jsonify({"voices": english_voices})
        else:
            return jsonify({"error": "Failed to fetch voices"}), 503
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/test', methods=['GET'])
def test():
    """Test Google TTS functionality"""
    try:
        test_text = "Hello! This is a test of Google Cloud Text-to-Speech with high-quality neural voices."
        audio_file = speak_with_google_tts(test_text)
        
        if audio_file and os.path.exists(audio_file):
            def cleanup():
                try:
                    os.unlink(audio_file)
                except:
                    pass
            
            return send_file(
                audio_file,
                mimetype='audio/mpeg',
                as_attachment=False,
                download_name='test.mp3'
            )
        else:
            return jsonify({"error": "Failed to generate test speech"}), 503
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🚀 Starting J.A.R.V.I.S Google Cloud TTS Server...")
    print("📋 Requirements:")
    print("   1. Install dependencies: pip install flask flask-cors google-auth requests")
    print("   2. Place your Google Cloud service account JSON file as 'jarvis-tts-credentials.json'")
    print("   3. Enable Cloud Text-to-Speech API in your Google Cloud project")
    print("   4. Test with: curl http://localhost:5050/health")
    print("🌟 Server starting on http://localhost:5050")
    
    app.run(host='0.0.0.0', port=5050, debug=True) 