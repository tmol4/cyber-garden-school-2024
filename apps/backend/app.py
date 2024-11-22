from flask import Flask, request, jsonify

app = Flask(__name__)


sobytie = {
    "data": 10
}

@app.route('/data', methods=['GET'])
def get_data():
    data = request.get_json().get("data")

    if data:
        return sobytie


if __name__ == '__main__':
    app.run(debug=True)

