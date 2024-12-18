import uuid

from flask import Flask, request, make_response, Response, g, jsonify
from flask_cors import CORS, cross_origin

from lib.classes import Event, User
from lib.utils import get_latest_event_from_history, return_last_data, make_analytic_text_from_history, make_on_event_json_response
from lib.db import DB
from lib.events import events

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': 'http://localhost:5173'}})

app.config['CORS_HEADERS'] = 'Content-Type'

app.secret_key = str(uuid.uuid4())


def get_db() -> DB:
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = DB("db.db")
        db.connect()
    return db



@app.after_request
def apply_caching(response: Response):
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Content-Security-Policy'] = 'upgrade-insecure-requests'
    return response


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close_db()


@app.route('/event', methods=['POST'])
@cross_origin(origins=["*"])
def get_data():
    data = request.get_json()
    print(f"recieved data: {data}")

    user_id = request.cookies.get('user_id')
    if not user_id:
        return "No user"

    db = get_db()
    user = db.get_user(user_id)

    print(f"user: {user.to_json()}")

    if not data:
        return make_on_event_json_response(db, user_id)

    anwser_id = data.get('clickedId')

    event = get_latest_event_from_history(user.history)
    answer = event.answers.get(anwser_id)

    user.credit += answer.credit

    db.set_user_money(_id=user_id, money=user.money + answer.delta_money - round(user.credit * 0.1))
    db.set_user_credit(_id=user_id, credit=round(user.credit * 0.9) if user.credit >= 100 else 0)

    db.add_answer_to_user_history(_id=user_id, answer_id=answer._id)

    print(f"answer: {answer.to_json()}")

    return make_on_event_json_response(db, user_id)


@app.route("/create_user", methods=['POST'])
@cross_origin(origins=["*"])
def create_user():
    user_id = request.cookies.get('user_id')
    db = get_db()

    if not user_id:
        user_id = str(uuid.uuid4())
        db.create_user(_id=user_id, money=15000)

    user = db.get_user(user_id)

    data = return_last_data(user)
    response = make_response(jsonify(data))

    # Сохранение user_id в cookie
    response.set_cookie('user_id', user_id, max_age=3600)  # Max age - 1 час
    return response


@app.route('/get_user_id', methods=['GET'])
@cross_origin(origins=["*"])
def get_user_id():
    user_id = request.cookies.get('user_id')
    if not user_id:
        return 'No user_id', 400
    return user_id


@app.route('/delete_user_id', methods=['POST'])
@cross_origin(origins=["*"])
def delete_cookie():
    user_id = request.cookies.get('user_id')
    if not user_id:
        return 'No user_id', 400

    db = get_db()
    db.delete_user(_id=user_id)

    response = make_response("Cookie deleted successfully")
    response.set_cookie('user_id', '', expires=0)
    return response


@app.route('/session', methods=['GET', 'POST', 'DELETE'])
@cross_origin(origins=["*"])
def session():
    user_id = request.cookies.get('session_id')
    if request.method == 'GET':
        if not user_id:
            return 'Session not found', 404
        return {
            'state': 'intro'
        }
    if request.method == 'POST':
        if user_id:
            response = make_response(f'User already created: {user_id}')
            return response
        user_id = str(uuid.uuid4())
        response = make_response(f'Created user: {user_id}')

        db = get_db()
        db.create_user(_id=user_id, money=15000)

        response.set_cookie('session_id', user_id, max_age=60*60)
        return response
    if request.method == 'DELETE':
        if not user_id:
            return 'No user_id', 400
        response = make_response('Cookie deleted successfully')
        response.set_cookie('user_id', '', expires=0)
        return response


@app.route("/analytic", methods=['GET'])
def get_analytic():
    user_id = request.cookies.get('user_id')
    if not user_id:
        return "No user"

    db = get_db()
    user = db.get_user(user_id)

    text = make_analytic_text_from_history(user.history)

    return {"analytic": text}
