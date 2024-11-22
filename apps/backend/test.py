import db

if __name__ == '__main__':
    db.connect_db()

    user = db.get_user(_id=1)
    print(user.money)

    db.close_db()
