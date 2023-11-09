import sqlite3

DATABASE = 'data_science_platform.db'

def init_db():
    with sqlite3.connect(DATABASE) as conn:
        with open('schema.sql') as f:
            conn.executescript(f.read())
    print("Database has been initialized.")

if __name__ == '__main__':
    init_db()
