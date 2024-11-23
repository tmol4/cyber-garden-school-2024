from flask import Flask, request, make_response, session, jsonify
import uuid
from flask_cors import CORS, cross_origin
from random import randrange
from events import events
from db import DB

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.secret_key = str(uuid.uuid4())


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


@app.route("/set_user_id", methods=['POST'])
@cross_origin()
def set_user_id():
    user_id = request.cookies.get('user_id')
    if user_id:
        return f"user_id already set: {user_id}"

    if 'user_id' not in session:
        session['user_id'] = str(uuid.uuid4())

    response = make_response(f"set_cookies user_id: {session['user_id']}")

    # Сохранение user_id в cookie
    response.set_cookie('user_id', session['user_id'], httponly=True, max_age=3600)  # Max age - 1 час

    # !!!
    db = DB("db.db")
    db.create_user(_id=session['user_id'], money=5000)
    db.close_db()

    return response


@app.route('/get_user_id', methods=['GET'])
def get_user_id():
    user_id = request.cookies.get('user_id')
    if not user_id:
        return 'No user_id', 400

    # !!!
    db = DB("db.db")
    user = db.get_user(_id=user_id)
    print(user.to_json())
    db.close_db()

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
    app.run(debug=True)

