from flask import Flask, request, jsonify
from random import randrange
from events import events
from flask_cors import CORS, cross_origin

app = Flask(__name__)

cors = CORS(app)
app.config["CORS_HEADERS"] = 'Content-Type'
def get_random_event():
    randindex = randrange(0, len(events))
    return events[randindex]


@app.route('/event', methods=['POST'])
@cross_origin()
def get_data():
    data = request.get_json()
    print(data)
    if not data:
        a = get_random_event().to_json()
        print(a)
        return a


if __name__ == '__main__':
    app.run(debug=True)

