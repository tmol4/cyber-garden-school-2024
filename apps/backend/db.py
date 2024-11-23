import sqlite3
from classes import User


class DB:
    name = None
    conn = None
    cursor = None
    HISTORY_SEP = ":"

    def __init__(self, name):
        self.connect_db(name)

    def connect_db(self, name):
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
