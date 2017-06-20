from __future__ import print_function
import tweepy
import json
from pymongo import MongoClient
 
class StreamListener(tweepy.StreamListener):
    def on_connect(self):
        """Called when the connection is made"""
        print("You're connected to the streaming server.")
 
    def on_error(self, status_code):
        """This is called when an error occurs"""
        print('Error: ' + repr(status_code))
        return False
 
    def on_data(self, data):
        """This will be called each time we receive stream data"""
        client = MongoClient('localhost', 27017)
 
        # Use cooldb database
        db = client.BaneAndOx
 
        # Decode JSON
        datajson = json.loads(data)
 
        # We only want to store tweets in Spanish
        if "lang" in datajson and datajson["lang"] == "es":
            # Store tweet info into the cooltweets collection.
            db.cooltweets.insert(datajson)
 
# This is a manually created filed where I stored my OAuth credentials for Twitter.
# Each line is a key-value pair of the form: KEY_NAME:KEY
CREDENTIALS_PATH = '/Users/rubcuevas/coolprof/credentials_twitter.txt'
 
# Path to the list of Spanish stop words.
STOPWORDS_ES_PATH = '/Users/rubcuevas/coolprof/stopwords_ES.txt'
 
CONSUMER_KEY = ""
CONSUMER_SECRET = ""
ACCESS_TOKEN = ""
ACCESS_TOKEN_SECRET = ""
 
# Load credentials
 
with open(CREDENTIALS_PATH) as f:
    for line in f:
        line = line.rstrip('\r\n').split(":")
        if line[0] == "CONSUMER_KEY":
            CONSUMER_KEY = line[1]
        elif line[0] == "CONSUMER_SECRET":
            CONSUMER_SECRET = line[1]
        elif line[0] == "ACCESS_TOKEN":
            ACCESS_TOKEN = line[1]
        elif line[0] == "ACCESS_TOKEN_SECRET":
            ACCESS_TOKEN_SECRET = line[1]
 
#Authenticating
auth1 = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth1.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
 
l = StreamListener(api=tweepy.API(wait_on_rate_limit=True))
streamer = tweepy.Stream(auth=auth1, listener=l)
with open(STOPWORDS_ES_PATH) as f:
    streamer.filter(track=[word.strip().decode('utf-8') for word in f])