from flask import Flask, request, make_response, session, jsonify
import uuid
from flask_cors import CORS, cross_origin
from random import randrange
from events import events

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def get_random_event():
    events_list = list(events.values())
    randindex = randrange(0, len(events_list))
    return events_list[randindex]


@app.route('/event', methods=['POST'])
@cross_origin()
def get_data():
    data = request.get_json()
    print(data)

    if not data:
        event_json = get_random_event().to_json()
        print(event_json)
        return event_json


@app.route('/start_test')
def start_test():
    # Используем session для сохранения уникального ID
    if 'user_id' not in session:
        session['user_id'] = str(uuid.uuid4())

    response = make_response("Тест начат!")

    # Сохранение user_id в cookie
    response.set_cookie('user_id', session['user_id'], httponly=True, max_age=3600)  # Max age - 1 час
    return response


if __name__ == '__main__':
    app.run(debug=True)

