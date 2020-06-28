from flask import Flask
from flask_mysqldb import MySQL
import json
from flask import request
import datetime

app = Flask(__name__)
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = "Hiaman@1234"
app.config["MYSQL_DB"] = "food_del"

mysql = MySQL(app)

@app.route("/", methods=["GET"])
def home():
    
    cur = mysql.connection.cursor()
    cur.execute('''SELECT name FROM restaurant GROUP BY name;''')

    data = cur.fetchall()

    rows = []
    for row in data:
        rows += [row]

    return {"data": rows, "error": False}

@app.route("/res/<res_name>", methods=["POST"])
def restaurant(res_name):

    cur = mysql.connection.cursor()
    cur.execute('''SELECT r.name, r.est, r.contact, r.rating, d.name, d.des, d.price, d.photo, r.id, d.id FROM restaurant as r JOIN dish_rest as d_r ON d_r.res_id = r.id JOIN dish as d ON d_r.dish_id = d.id WHERE r.name = "%s";'''%(res_name))

    data = cur.fetchall()

    row = []

    for i in data:
        row.append(i)

    return {"data": row, "error": False}

@app.route("/register", methods=["POST"])
def register():
    typ = request.json["typ"]
    f_name = request.json["f_name"]
    l_name = request.json["l_name"]
    email = request.json["email"]
    password = request.json["password"]
    city = request.json["city"]

    cur = mysql.connection.cursor()
    cur.execute('''INSERT INTO %s(f_name, l_name, email, password, city) VALUES("%s", "%s", "%s", "%s", "%s")'''%(typ, f_name, l_name, email, password, city))

    mysql.connection.commit()
    cur.close()

    return {"message": "User Registered", "error":False}

@app.route("/login", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]
    typ= request.json["typ"]

    cur = mysql.connection.cursor()
    cur.execute('''SELECT u.f_name, u.l_name, u.city, u.id FROM %s as u WHERE email = "%s" AND password = "%s";'''%(typ, email, password))

    data = cur.fetchall()
    res = []
    
    for k in data:
        res.append(k)

    if len(res) < 1:
        return {"message": "Wrong details!", "error": False, "data":[]}
    else:
        if typ == "user":
            return {"data": res, "message": "logged in!", "error": False, "kind":"user"}
        else:
            return {"data": res, "message": "logged in!", "error": False, "kind":"owner"}


@app.route("/insert_order", methods=["POST"])
def insert_order():
    dish_id = request.json["dish_id"]
    res_id = request.json["res_id"]
    user_id = request.json["user_id"]

    current_time = datetime.datetime.now()
    tym = "%s:%s:%s"%(current_time.hour, current_time.minute, current_time.second)

    cur = mysql.connection.cursor()
    cur.execute('''INSERT INTO orders(tym, dish_id, res_id, user_id) VALUES ("%s", %s, %s, %s)'''%(tym, dish_id, res_id, user_id))

    mysql.connection.commit()
    cur.close()

    return "Data added to orders"

@app.route("/get_order", methods=["POST"])
def get_order():
    user_id = request.json["user_id"]
    
    cur = mysql.connection.cursor()
    cur.execute('''SELECT r.name, d.name, d.price, o.id, o.status FROM restaurant as r JOIN orders as o ON o.res_id = r.id JOIN dish as d ON d.id = o.dish_id WHERE o.user_id = %s;'''%(user_id))
    
    result = cur.fetchall()
    data = []

    for i in result:
        data.append(i)

    return {"data": data, "error":False}

@app.route("/remove_item", methods=["POST"])
def remove_item():
    order_id = request.json["id"]

    cur = mysql.connection.cursor()
    cur.execute('''DELETE FROM orders WHERE id = %s;'''%(order_id))

    mysql.connection.commit()
    cur.close()

    return {"message": "DATA is deleted!"}

@app.route("/onway", methods=["POST"])
def onWay():
    ids = request.json["ids"]

    cur = mysql.connection.cursor()

    for i in ids:
        cur.execute('''UPDATE orders SET status = 1 WHERE id = %s;'''%(i))

    mysql.connection.commit()
    cur.close()

    return {"message": "Dishes Ordered!"}


@app.route("/find_rest", methods=["POST"])
def find_rest():
    owner_id = request.json["owner_id"]

    cur = mysql.connection.cursor()
    cur.execute('''SELECT r.id , o.id, r.name, r.contact, r.rating FROM owner as o JOIN owner_res as o_r ON o.id = o_r.owner_id JOIN restaurant as r ON r.id = o_r.res_id WHERE o.id = %s;'''%(owner_id))

    result = cur.fetchall()
    data = []

    for i in result:
        data.append(i)

    return {"data": data, "error":False}

@app.route("/order_track", methods=["POST"])
def order_track():
    res_id = request.json['res_id']
    owner_id = request.json["owner_id"]

    cur = mysql.connection.cursor()
    cur.execute('''SELECT o.id, d.name, d.price, u.f_name, r.id, ow.id FROM dish as d JOIN orders as o ON d.id = o.dish_id JOIN restaurant as r ON r.id = o.res_id JOIN owner_res as o_r ON o_r.res_id = r.id JOIN owner as ow ON ow.id = o_r.owner_id JOIN user as u ON u.id = o.user_id WHERE ow.id=%s AND o.status = 1 AND r.id = %s;'''%(owner_id, res_id))

    result = cur.fetchall()
    data = []

    for i in result:
        data.append(i)

    return {"data": data, "error":False}

@app.route("/complete_order", methods=["POST"])
def complete_order():
    order_id = request.json["order_id"]

    cur = mysql.connection.cursor()
    cur.execute('''UPDATE orders SET status = 2 WHERE id = %s;'''%(order_id))

    mysql.connection.commit()
    cur.close()

    return {"message": "Dishes Ordered Completed!"}

@app.route("/add_rest", methods=["POST"])
def add_rest():
    name = request.json["name"]
    est = request.json["est"]
    contact = request.json["contact"]
    rating = request.json["rating"]
    owner_id = request.json["owner_id"]

    cur = mysql.connection.cursor()
    cur.execute('''INSERT INTO restaurant (name, est, contact, rating) VALUES("%s", "%s", %s, %s)'''%(name, est, contact, rating))

    mysql.connection.commit()
    cur.close()

    cur = mysql.connection.cursor()
    cur.execute('''SELECT id FROM restaurant;''')

    result = cur.fetchall()
    ind = 1

    for i in result:
        ind = int(i[0])

    cur = mysql.connection.cursor()
    cur.execute('''INSERT INTO owner_res (owner_id, res_id) VALUES("%s", "%s")'''%(owner_id, ind))

    mysql.connection.commit()
    cur.close()

    return "Data added!"

    



    