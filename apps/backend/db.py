import sqlite3

conn = sqlite3.connect('db1.db')

cursor = conn.cursor()


cursor.execute('''CREATE TABLE users
             	(id INTEGER PRIMARY KEY, money INTEGER, chance_bad INTEGER, credit INTEGER)''')
#
# cursor.execute('''CREATE TABLE events
#             	(id INTEGER PRIMARY KEY, description TEXT, list_answers_id TEXT )''')
#
#
# cursor.execute('''CREATE TABLE answers
#             	(id INTEGER PRIMARY KEY, answ_text TEXT, list_events_id  TEXT, minus_money INTEGER )''')

print(cursor.execute('''SELECT * FROM users''').fetchall())

conn.commit()
conn.close()
