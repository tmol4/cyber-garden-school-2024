import sqlite3

conn = sqlite3.connect('users.db')

cursor = conn.cursor()

cursor.execute('''CREATE TABLE users
            	(id INTEGER PRIMARY KEY, )''')

cursor.execute('''CREATE TABLE events
            	(id INTEGER PRIMARY KEY, )''')


cursor.execute('''CREATE TABLE answers
            	(id INTEGER PRIMARY KEY, )''')
