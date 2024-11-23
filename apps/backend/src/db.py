from lib.db import DB

if __name__ == '__main__':
    db = DB("db.db")

    db.cursor.execute('''CREATE TABLE users
                    (id TEXT, money INTEGER, history TEXT)''')
    db.conn.commit()

    db.close_db()
