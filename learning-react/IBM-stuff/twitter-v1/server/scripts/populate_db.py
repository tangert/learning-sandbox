from pymongo import MongoClient
from random import *
import sys

client = MongoClient('mongodb://localhost:27017/')
db = client['BaneAndOx']

# individual methods
def insertHandles(size):
	posts = []
	for i in range(0,size):
		post = {
			"handle": 'user{}'.format(i)
		}
		posts.append(post)

	db.tweet_handles.insert_many(posts)

def insertContent(size):
	posts = []
	for i in range(0,size):
		post = {
			"content": 'post{}'.format(i),
			"sentiment": randint(0,100)
		}
		posts.append(post)

	db.tweet_content.insert_many(posts)


def insertImages(size):
	posts = []
	for i in range(0,size):
		post = {
			"link": 'image{}'.format(i)
		}
		posts.append(post)

	db.images.insert_many(posts)

# Collective
def insertTweets(size):
	insertHandles(size)
	insertContent(size)
	insertImages(size)

def clearDB():
	for col in db.collection_names():
		db[col].delete_many({})

if __name__ == '__main__':
	if sys.argv[1] == 'clear':
		clearDB()
	else:
		clearDB()
		insertTweets(int(sys.argv[1]))
