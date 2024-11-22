import sqlite3
from classes import User


class DB:
    conn = None
    cursor = None
    HISTORY_SEP = ":"


def connect_db():
    DB.conn = sqlite3.connect('db.db')
    DB.cursor = DB.conn.cursor()


def close_db():
    DB.conn.close()


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


# if __name__ == '__main__':
#     connect_db()
#
#     DB.cursor.execute('''CREATE TABLE users
#                    (id INTEGER PRIMARY KEY, money INTEGER, history TEXT)''')
#     DB.conn.commit()
#
#     close_db()
