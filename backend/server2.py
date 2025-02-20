from flask import Flask, jsonify
from flask_cors import CORS
import http.client
import ssl
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/company/<domain>', methods=['GET'])
def get_company_data(domain):
    try:
        context = ssl._create_unverified_context()
        conn = http.client.HTTPSConnection("b2b-company-data-enrichment1.p.rapidapi.com", context=context)
        
        headers = {
            'x-rapidapi-key': "Izk7uHBUVcmshQqKrqmko9WywG6Fp12gmsajsnDzGBPAODILlb",
            'x-rapidapi-host': "b2b-company-data-enrichment1.p.rapidapi.com"
        }
        
        conn.request("GET", f"/companies/enrich?domain={domain}", headers=headers)
        
        res = conn.getresponse()
        data = json.loads(res.read().decode("utf-8"))
        
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)