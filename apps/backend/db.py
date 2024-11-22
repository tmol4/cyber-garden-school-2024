import sqlite3
from classes import User


class DB:
    conn = None
    cursor = None


def connect_db():
    DB.conn = sqlite3.connect('db.db')
    DB.cursor = DB.conn.cursor()


def close_dp():
    DB.conn.close()

# cursor.execute('''CREATE TABLE users
#                (id INTEGER PRIMARY KEY, money INTEGER, chance_bad INTEGER, list_chosen_answers INTEGER)''')
#
# cursor.execute('''CREATE TABLE events
#               (id INTEGER PRIMARY KEY, description TEXT, list_answers_id TEXT )''')
#
# cursor.execute('''CREATE TABLE answers
#               (id INTEGER PRIMARY KEY, answ_text TEXT, list_events_id  TEXT, minus_money INTEGER )''')


# cursor.execute('''INSERT INTO users (money) VALUES (35000)''')

# data = cursor.execute('''SELECT * FROM users''')
#
# print(data.fetchall())
#
# conn.commit()
# conn.close()


def get_user(_id: int) -> User:
    user = DB.cursor.execute(f'''SELECT * FROM users WHERE id={_id}''')
    return User(user.fetchone())

