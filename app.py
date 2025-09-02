from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

genai.configure(api_key="AIzaSyDxTeRjrAGkNXRn5G7zhTumOd24X2Y9k3s")

@app.route('/melhorar-texto', methods=['POST'])
def melhorar_texto():
    dados = request.get_json()
    texto = dados.get('texto', '')

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(f"Melhore e organize este relatório de serviço:\n\n{texto}")
        return jsonify({ 'textoMelhorado': response.text })
    except Exception as e:
        return jsonify({ 'erro': str(e) }), 500

@app.route('/')
def home():
    return "✅ Backend Flask com Gemini está online!"

if __name__ == '__main__':
    app.run()