from flask import Flask, render_template, jsonify
import sqlite3

app = Flask(__name__)

DATABASE = 'data_science_platform.db'

# 假定的数据项，实际开发中这可能是数据库查询的结果
def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # This enables column access by name: row['column_name']
    return conn

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/data')
def get_data():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM data_items')  # Replace 'your_data_table' with your table name
    data_items = cur.fetchall()
    # Convert query to dictionary
    data_dicts = [dict(row) for row in data_items]
    conn.close()
    return jsonify(data_dicts)

if __name__ == '__main__':
    app.run(debug=True)
