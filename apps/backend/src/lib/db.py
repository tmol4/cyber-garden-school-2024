import sqlite3
from lib.classes import User

HISTORY_EVENT_SEP = ";"
HISTORY_ANSWER_SEP = ","

class DB:
    name: str = None
    conn: sqlite3.Connection = None
    cursor: sqlite3.Cursor = None

    def __init__(self, name: str):
        self.name = name

    def connect(self):
        self.conn = sqlite3.connect(self.name)
        self.cursor = self.conn.cursor()

    def close_db(self):
        self.conn.close()

    def create_user(self, _id, money, credit=0, history=""):
        self.cursor.execute('''INSERT INTO users (id, money, credit, history) VALUES (?, ?, ?, ?)''', (_id, money, credit, history))
        self.conn.commit()

    def get_user(self, _id) -> User:
        user = self.cursor.execute('''SELECT * FROM users WHERE id = ?''', (_id,))
        return User(user.fetchone())

    def delete_user(self, _id):
        self.cursor.execute('''DELETE FROM users WHERE id = ?''', (_id,))
        self.conn.commit()

    def get_user_history(self, _id):
        history = self.cursor.execute('''SELECT history FROM users where id = ?''', (_id,))
        return history.fetchone()[0]

    def set_user_history(self, _id, history):
        self.cursor.execute('''UPDATE users SET history = ? WHERE id = ?''', (history, _id))
        self.conn.commit()

    def set_user_money(self, _id, money):
        self.cursor.execute('''UPDATE users SET money = ? WHERE id = ?''', (money, _id))
        self.conn.commit()

    def set_user_credit(self, _id, credit):
        self.cursor.execute('''UPDATE users SET credit = ? WHERE id = ?''', (credit, _id))
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
