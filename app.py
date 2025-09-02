from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

genai.configure(api_key="AIzaSyDxTeRjrAGkNXRn5G7zhTumOd24X2Y9k3s")

@app.route('/melhorar-texto', methods=['POST'])
def melhorar_texto():
    try:
        dados = request.get_json()
        texto = dados.get('texto', '')

        if not texto:
            return jsonify({ 'erro': 'Texto vazio ou ausente.' }), 400

        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(f"Melhore e organize este relatório de serviço:\n\n{texto}")

        return jsonify({ 'textoMelhorado': response.text })

    except Exception as e:
        print("Erro interno:", str(e))  # Isso aparece nos logs do Render
        return jsonify({ 'erro': str(e) }), 500

@app.route('/')
def home():
    return "✅ Backend Flask com Gemini está online!"