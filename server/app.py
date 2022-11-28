#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Flask, request, session, jsonify
import pymysql.cursors
import bcrypt
import re
from flask_cors import CORS
from datetime import datetime
import pandas as pd
import numpy as np
from os import listdir
from os.path import isfile, join, isdir
import glob
import os
from bs4 import BeautifulSoup
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
import random
#Threshold setting
threshold_1 = 3
threshold_2 = 5

# Preprocessed data
frame = pd.read_csv("./data/problem.csv")
content = pd.read_csv("./data/content.csv")
frame = frame.merge(content, how="left", on="Title")

# Model Training for Array
frame_array = frame.loc[frame['Array']==1].reset_index(drop=True)
column_trans = ColumnTransformer(
                [('categories', OneHotEncoder(dtype='int'),
                                 ['Difficulty']),
                ('tfidf', TfidfVectorizer(), 'problem')],
                remainder='drop', verbose_feature_names_out=False)
frame_arr = frame_array[["Id","Title","Difficulty","problem", "Frequency"]]
column_trans.fit(frame_arr)
column_trans.get_feature_names_out()
X = column_trans.transform(frame_arr).toarray()
model_array = KMeans(n_clusters=3, init='k-means++', max_iter=200, n_init=10)
model_array.fit(X)
labels=model_array.labels_
frame_array["cluster"] = labels 
#print(frame_array)

df_name = {"Array":frame_array}

now = datetime.now()

connection = \
    pymysql.connect(host='database-1.czxn7uvkflod.us-west-2.rds.amazonaws.com'
                    , user='admin', password='SJSUSJSU7',
                    database='Masters_Project',
                    cursorclass=pymysql.cursors.DictCursor)
cursor = connection.cursor()

app = Flask(__name__)
CORS(app)
app.secret_key = 'yoursecretkey'


def recommend_problem(ds, uid, score):
    while(True):
        ds_df = df_name[ds]
        flag = 0
        if(score>=threshold_1 and score<threshold_2):
            temp_df = ds_df[ds_df["cluster"]==1].reset_index(drop=True)
        elif(score>=threshold_2):
            temp_df = ds_df[ds_df["cluster"]==2].reset_index(drop=True)
        else:
            temp_df = ds_df[ds_df["cluster"]==0].reset_index(drop=True)
        qid = random.choice(temp_df["Id"].tolist())
        cursor.execute('Select * from questions_solved where userId = % s',(uid, ))
        result = cursor.fetchall()
        for r in result:
            if(r["questionId"]==qid):
                flag =1 
        if(flag==0):
            return temp_df[temp_df["Id"]==qid]["Content"].iloc[0]

@app.route('/')         
@app.route('/get_problems', methods=['GET', 'POST'])
def get_problems():
    sql = 'Select * from Problems'
    # with connection.cursor() as cursor: 
    connection.ping()        
    cursor.execute(sql)
    # cursor.execute(sql)
    result = cursor.fetchall()
    print("problem list :")
    print(result)
    return jsonify(result)


@app.route('/get_problem_by_title', methods=['GET', 'POST'])
def get_problem_by_title():
    request_data = request.get_json()
    if request.method == 'POST' and 'title' in request_data:
        title = request_data['title']
        connection.ping()    
        cursor.execute('SELECT * FROM Problems WHERE Title = % s',
                       (title, ))
        result = cursor.fetchone()
        return result
    return None


@app.route('/login', methods=['GET', 'POST'])
def login():
    msg = ""
    request_data = request.get_json()
    if request.method == "POST":
        if "username" in request_data and "password" in request_data:
            username = request_data["username"]
            password = request_data["password"]
            # hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            cursor.execute(
                "SELECT * FROM users WHERE username = % s AND password = % s",
                (username, password),
            )
            account = cursor.fetchone()
            if account:
                session["loggedin"] = True
                session["id"] = account["id"]
                session["username"] = account["username"]
                msg = {"message":"Valid Login", "userId":account["id"]}
            else:
                msg = {"message":"Invalid Login"}
    return msg

@app.route('/register', methods =['GET', 'POST'])
def register():
    msg = ""
    request_data = request.get_json()
    if request.method == "POST":
        print(request.method)
        if 'username' in request_data and 'password' in request_data and 'email' in request_data :
            print(request_data)
            username = request_data['username']
            password = request_data['password']
            email = request_data['email']
            cursor.execute('SELECT * FROM users WHERE username = % s', (username, ))
            account = cursor.fetchone()
            cursor.execute('SELECT count(id) FROM Masters_Project.users')
            usersCount = cursor.fetchone()
            userId = usersCount["count(id)"] + 100000
            if account:
                msg = 'Account already exists !'
            elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
                msg = 'Invalid email address !'
            elif not re.match(r'[A-Za-z0-9]+', username):
                msg = 'Username must contain only characters and numbers !'
            elif not username or not password or not email:
                msg = 'Please fill out the form !'
            else:
                cursor.execute('INSERT INTO users VALUES (% s, % s, % s, % s, % s)', (userId, username, password, email, now))
                connection.commit()
                msg = 'You have successfully registered !'
        elif request.method == 'POST':
            msg = 'Please fill out the form !'
        return msg
    msg = 'NO RESPONSE'
    print("no response")
    return msg

@app.route('/getProblemByDataStructure', methods=['GET', 'POST'])
def getProblemByDataStructure():
    result = []
    request_data = request.get_json()
    if request.method == 'POST' or request.method == 'GET':
        if 'requestedDataStructure' in request_data:
            requestedDataStructure = \
                request_data['requestedDataStructure']
            result = frame[frame['Tags'] == requestedDataStructure]

    return jsonify(result)

@app.route('/get_next_problem', methods=['GET', 'POST'])
def get_next_problem():
    request_data = request.get_json()
    uid = request_data["userId"]
    ds = request_data["dataStructure"]
    cursor.execute("SELECT * FROM user_score WHERE userId = % s AND ds = % s",(uid, ds))
    userScore = cursor.fetchone()
    if(userScore):
        user_score = userScore["score"]
    else:
        user_score = 0
        cursor.execute('INSERT INTO user_score VALUES (% s, % s, % s)', (uid, ds, 0))
        connection.commit()
    content = recommend_problem(ds,uid, user_score)
    return {"Content":content}

@app.route('/get_data_structures', methods=['GET', 'POST'])
def get_data_structure():
    ds = ["Array", "Tree", "String", "Hash Table", "DFS"]
    return ds

@app.route('/increment_score', methods=['GET', 'POST'])
def increment_user_score():
    request_data = request.get_json()
    uid = request_data["userId"]
    qtitle = request_data["Title"]
    ds = request_data["dataStructure"]
    temp_df = df_name[ds]
    flag = 0
    q_difficulty = temp_df[temp_df["Title"]==qtitle]["Difficulty"].iloc[0]
    q_id = temp_df[temp_df["Title"]==qtitle]["Id"].iloc[0]
    cursor.execute('INSERT INTO questions_solved VALUES (% s, % s)', (uid, q_id))
    cursor.execute("SELECT * FROM user_score WHERE userId = % s AND ds = % s",(uid, ds))
    userScore = cursor.fetchone()
    if(userScore):
        user_score = userScore["score"]
    else:
        user_score = 0
        flag = 1
    if(q_difficulty=='Easy'):
        user_score += 10
    elif(q_difficulty=='Medium'):
        user_score += 20
    else:
        user_score += 30
    if(flag==1):
        cursor.execute('INSERT INTO user_score VALUES (% s, % s, % s)', (uid, ds, user_score))
        connection.commit()
    else:
        cursor.execute("UPDATE user_score set score= % s  where userId= % s and ds=% s",(user_score, uid, ds))
        connection.commit()
    return "Increment Success"

@app.route('/decrement_score', methods=['GET', 'POST'])
def decrement_user_score():
    request_data = request.get_json()
    uid = request_data["userId"]
    qtitle = request_data["Title"]
    ds = request_data["dataStructure"]
    temp_df = df_name[ds]
    flag = 0
    q_difficulty = temp_df[temp_df["Title"]==qtitle]["Difficulty"].iloc[0]
    cursor.execute("SELECT * FROM user_score WHERE userId = % s AND ds = % s",(uid, ds))
    userScore = cursor.fetchone()
    if(userScore):
        user_score = userScore["score"]
    else:
        user_score = 0
        flag = 1
    if(q_difficulty=='Easy'):
        user_score -= 5
    elif(q_difficulty=='Medium'):
        user_score -= 15
    else:
        user_score -= 25
    if(user_score<0):
        user_score = 0
    if(flag==1):
        cursor.execute('INSERT INTO user_score VALUES (% s, % s, % s)', (uid, ds, user_score))
        connection.commit()
    else:
        cursor.execute("UPDATE user_score set score= % s  where userId= % s and ds=% s",(user_score, uid, ds))
        connection.commit()
    return "Decrement Success"

if __name__ == '__main__':
    app.run(debug=True)
