from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/data', methods=['GET'])
def get_data():
    # Получение параметров из запроса (опционально)
    name = request.args.get('name')  # Получение параметра 'name' из URL (например, /api/data?name=John)
    data = request.get_json().get("data")

    if data:
        return jsonify(data)

    # Обработка запроса и подготовка ответа
    if name:
        response = {'message': f'Привет, {name}!', 'data': {'some': 'data'}}
    else:
        response = {'message': 'Привет от Flask!'}

    return jsonify(response)  # Отправка JSON-ответа


if __name__ == '__main__':
    app.run(debug=True)

