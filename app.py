from flask import Flask, render_template, jsonify, request
import sqlite3
import base64
import pandas as pd


app = Flask(__name__)

DATABASE = 'pandas.db'



# 建立与sqlite数据库的连接
def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row# This enables column access by name: row['column_name']
    return conn

#将数据库行转换成字典
def row_to_dict(row):
    row_dict = {}
    for key, value in dict(row).items():
        if isinstance(value, bytes):
            # 正确地将字节类型的数据转换为 Base64 编码的字符串
            row_dict[key] = base64.b64encode(value).decode('utf-8')
        else:
            row_dict[key] = value
    return row_dict


#路由处理函数处理对/api/pandas 的 GET 请求。
@app.route('/api/pandas')
def get_pandas():
    page = request.args.get('page', 1, type=int)
    per_page = 8
    name_query = request.args.get('name')
    conn = get_db_connection()
    query = "SELECT * FROM pandas_info"
    params = []
    if name_query:
        query += f" WHERE name LIKE ?"
        params.append(f"%{name_query}%")

    query += " LIMIT ? OFFSET ?"
    params.extend([per_page, (page - 1) * per_page])

    pandas = conn.execute(query,params).fetchall()
    conn.close()

    pandas_data = [row_to_dict(row) for row in pandas]
    return jsonify(pandas_data)

#根据特定的条件从数据库中检索信息，结果以字典的形式返回
def get_panda_info(panda_id=None, name=None):
    conn = sqlite3.connect('pandas.db')
    query = "SELECT * FROM pandas_info"
    conditions = []
    if panda_id:
        conditions.append(f"id={panda_id}")
    if name:
        conditions.append(f"name LIKE '%{name}%'")
    if conditions:
        query += " WHERE " + " AND ".join(conditions)
    df = pd.read_sql_query(query, conn)
    conn.close()
    return df.to_dict(orient='records')

#返回主页的HTML内容
@app.route('/')
def index():
    return render_template('index.html')

#用于展示大熊猫的详细信息
@app.route('/panda/<int:panda_id>')
def panda_details(panda_id):
    conn = get_db_connection()
    panda_detail = conn.execute('SELECT * FROM pandas_detail_info WHERE id = ?', (panda_id,)).fetchone()
    conn.close()
    if panda_detail is None:
        return render_template('error.html', message='Panda not found'), 404
    else:
        return render_template('detail.html', panda=row_to_dict(panda_detail))



if __name__ == '__main__':
    app.run(debug=True)