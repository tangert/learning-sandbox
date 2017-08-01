from pymongo import MongoClient
from random import *
import sys
import csv

client = MongoClient('mongodb://localhost:27017/')
db = client['BaneAndOx']

def insertContent():
    posts = []
    with open('../data/tweets.csv', 'rb') as f:
        next(f)
        reader = csv.reader(f)
        for row in reader:
            post = { "content": row[0], "sentiment": int(row[1]) }
            posts.append(post)

	db.tweet_content.insert_many(posts)

def insertUsernames():
    handles = []
    with open('../data/usernames.csv', 'rb') as f:
        next(f)
        reader = csv.reader(f)
        for row in reader:
            post = { "id": int(row[0]), "handle": row[1] }
            handles.append(post)

    db.tweet_handles.insert_many(handles)

def clearDB():
	for col in db.collection_names():
		db[col].delete_many({})

if __name__ == '__main__':
    db.tweet_handles.delete_many({})
    insertUsernames()
