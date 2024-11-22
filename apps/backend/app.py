from flask import Flask, request, jsonify
from random import randrange
from events import events

app = Flask(__name__)


def get_random_event():
    randindex = randrange(0, len(events))
    return events[randindex]


@app.route('/event', methods=['POST'])
def get_data():
    data = request.get_json()
    print(data)

    if not data:
        return get_random_event().to_json()


if __name__ == '__main__':
    app.run(debug=True)

