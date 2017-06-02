from collections import OrderedDict
import datetime as dt
import sys

from peewee import *

db = SqliteDatabase('diary.db')

# MySQL
# pw.MySQLDatabase("mydb",
# host="mydb.crhauek3cxfw.us-west-2.rds.amazonaws.com",
# port=3306, user="user",
# passwd="password")

class BaseModel(Model):
    class Meta:
        database = db


class Entry(BaseModel):
    content = TextField()
    timestamp = DateTimeField(default=dt.datetime.now)


def initialize(database):
    database.connect()
    database.create_tables([Entry], safe=True)


def show_menu():
    choice = None
    while choice != 'q':
        print('Enter q to quit.')
        for key, value in menu.items():
            print('{}) {}'.format(key, value.__doc__))

        # gets user input, lowercase, gets rid of spaces
        choice = raw_input('Action: ').lower().strip()

        if choice in menu:
            # performs the given function in the menu
            menu[choice]()


def add_entry():
    """Add an entry."""
    # captures everything until an EOF sequence (end of file)
    print("Enter what you want. Press ctrl+d when finished.")
    data = sys.stdin.read().strip()
    if data:
        # if input is anything other than n
        if raw_input('Save entry? [Y/N]').lower() != 'n':
            Entry.create(content=data)
            print("Saved an entry successfully!")


def view_entries():
    """View entries."""


def delete_entry(entry):
    """Delete an entry."""


menu = OrderedDict([
    ('a', add_entry),
    ('v', view_entries),
])

if __name__ == '__main__':
    initialize(db)
    show_menu()