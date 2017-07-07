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
            post = { "content": row[0], "sentiment": row[1] }
            posts.append(post)

	db.tweet_content.insert_many(posts)

def clearDB():
	for col in db.collection_names():
		db[col].delete_many({})

if __name__ == '__main__':
    db.tweet_content.delete_many({})
    insertContent()
