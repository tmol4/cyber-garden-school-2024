import sqlite3

conn = sqlite3.connect('db1.db')

cursor = conn.cursor()

cursor.execute('''INSERT INTO users (money) VALUES (35000)''')

data = cursor.execute('''SELECT * FROM users''')

print(data.fetchall())

conn.commit()
conn.close()
