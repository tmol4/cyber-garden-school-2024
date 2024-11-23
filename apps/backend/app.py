import uuid
import requests
from random import randrange

from flask import Flask, request, make_response, session
from flask_cors import CORS, cross_origin

from apps.backend import util
from db import DB
from events import events

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.secret_key = str(uuid.uuid4())

dev = "http://localhost:5000"


def get_random_event():
    events_list = list(events.values())
    randindex = randrange(0, len(events_list))
    return events_list[randindex]


@app.route('/event', methods=['POST'])
@cross_origin()
def get_data():
    data = request.get_json()
    print(f"recieved data: {data}")

    user_id = request.cookies.get('user_id')
    if not user_id:
        return "No user"

    db = DB("db.db")
    user = db.get_user(user_id)
    print(f"user: {user.to_json()}")

    if not data:
        event = get_random_event()
        print(f"returned event: {event.to_json()}")

        db.add_event_to_user_history(_id=user_id, event_id=event._id)
        db.close_db()
        return event.to_json()

    anwser_id = data.get('answer_id')

    event = util.get_latest_event_from_history(user.history)
    answer = event.answers.get(anwser_id)

    db.add_answer_to_user_history(_id=user_id, answer_id=answer._id)

    print(f"answer: {answer.to_json()}")

    event = get_random_event()

    print(f"returned event: {event.to_json()}")

    db.add_event_to_user_history(_id=user_id, event_id=event._id)
    db.close_db()

    return event.to_json()


@app.route("/create_user", methods=['POST'])
@cross_origin()
def create_user():
    user_id = request.cookies.get('user_id')
    if user_id:
        return f"user already created: {user_id}"

    user_id = str(uuid.uuid4())

    db = DB("db.db")
    db.create_user(_id=user_id, money=15000)
    db.close_db()

    response = make_response(f"Created user: {user_id}")

    # Сохранение user_id в cookie
    response.set_cookie('user_id', user_id, httponly=True, max_age=3600)  # Max age - 1 час

    return response


# @app.route("/set_user_id", methods=['POST'])
# @cross_origin()
# def set_user_id():
#     user_id = request.cookies.get('user_id')
#     if user_id:
#         return f"user_id already set: {user_id}"
#
#     user_id = str(uuid.uuid4())
#
#     response = make_response(f"set_cookies user_id: {user_id}")
#
#     # Сохранение user_id в cookie
#     response.set_cookie('user_id', user_id, httponly=True, max_age=3600)  # Max age - 1 час
#
#     return response


@app.route('/get_user_id', methods=['GET'])
def get_user_id():
    user_id = request.cookies.get('user_id')
    if not user_id:
        return 'No user_id', 400

    return user_id


@app.route('/delete_user_id', methods=['POST'])
def delete_cookie():
    user_id = request.cookies.get('user_id')
    if not user_id:
        return 'No user_id', 400

    response = make_response("Cookie deleted successfully")
    response.set_cookie('user_id', '', expires=0)
    return response


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)

