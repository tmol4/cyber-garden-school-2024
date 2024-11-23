import sqlite3
from classes import User

HISTORY_EVENT_SEP = ";"
HISTORY_ANSWER_SEP = ","

class DB:
    name = None
    conn = None
    cursor = None

    def __init__(self, name="db.db"):
        self.connect_db(name)

    def connect_db(self, name="db.db"):
        self.name = name
        self.conn = sqlite3.connect(name)
        self.cursor = self.conn.cursor()

    def close_db(self):
        self.conn.close()

    def create_user(self, _id, money, history=""):
        self.cursor.execute('''INSERT INTO users (id, money, history) VALUES (?, ?, ?)''', (_id, money, history))
        self.conn.commit()

    def get_user(self, _id) -> User:
        user = self.cursor.execute('''SELECT * FROM users WHERE id = ?''', (_id,))
        return User(user.fetchone())

    def get_user_history(self, _id):
        history = self.cursor.execute('''SELECT history FROM users where id = ?''', (_id,))
        return history.fetchone()[0]

    def set_user_history(self, _id, history,):
        self.cursor.execute('''UPDATE users SET history = ? WHERE id = ?''', (history, _id))
        self.conn.commit()

    def add_event_to_user_history(self, _id, event_id):
        prev_history = self.get_user_history(_id)

        if not prev_history:
            new_history = event_id
        else:
            new_history = prev_history + HISTORY_EVENT_SEP + event_id

        self.set_user_history(_id, new_history)

    def add_answer_to_user_history(self, _id, answer_id):
        prev_history = self.get_user_history(_id)

        if not prev_history:
            new_history = answer_id
        else:
            new_history = f"{prev_history}{HISTORY_ANSWER_SEP}{answer_id}"

        self.set_user_history(_id, new_history)

# cursor.execute('''INSERT INTO users (money) VALUES (35000)''')

# data = cursor.execute('''SELECT * FROM users''')
#
# print(data.fetchall())
#
# conn.commit()
# conn.close()

if __name__ == '__main__':
    db = DB("db.db")

    db.cursor.execute('''CREATE TABLE users
                    (id TEXT, money INTEGER, history TEXT)''')
    db.conn.commit()

    db.close_db()
