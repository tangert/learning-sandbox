import datetime as dt
from database import db

from flask_login import UserMixin
from flask_bcrypt import generate_password_hash, check_password_hash
from peewee import *


class BaseModel(Model):
    class Meta:
        database = db


# Place UserMixin before parent class
class User(UserMixin, BaseModel):
    username = CharField(unique=True)
    email = CharField(unique=True)
    password = CharField(max_length=100)
    joined_at = DateTimeField(default=dt.datetime.now)
    bio = TextField()
    is_admin = BooleanField(default=False)

    class Meta:
        # ordering characteristic
        order_by = ['-joined_at']

    @classmethod
    def create_user(cls, username, email, password, admin=False):
        try:
            # cls refers back to the class
            cls.create(
                username=username,
                email=email,
                password=generate_password_hash(password),
                is_admin=admin)

        except IntegrityError:
            print("Already exists")


class Grab(BaseModel):
    # basic info
    name = CharField()
    description = CharField()
    original_price = IntegerField()
    discount = IntegerField()
    discount_quantity = IntegerField()
    does_expire = BooleanField()
    image_link = CharField()

    # time sensitive info
    post_time = DateTimeField(default=dt.datetime.now)
    expiration_time = DateTimeField()

    # location sensitive info
    address = CharField()
    latitude = IntegerField()
    longitude = IntegerField()
    radius = IntegerField()

    class Meta:
        order_by = ['-radius']

    @classmethod
    def create_grab(cls, name, description, original_price, discount, discount_quantity, expiration_time, latitude,
                    longitude, radius):
        try:
            cls.create(
                name=name,
                description=description,
                original_price=original_price,
                discount=discount,
                discount_quantity=discount_quantity,
                expiration_time=expiration_time,
                latitude=latitude,
                longitude=longitude,
                radius=radius
            )

        except IntegrityError:
            print("Already exists")


class Relationship(BaseModel):
    from_user = ForeignKeyField(User, related_name='relationships')
    to_user = ForeignKeyField(User, related_name='related_to')

    class Meta:
        indexes = [
            (('from_user', 'to_user'), True)
        ]


def initialize():
    db.connect()
    db.create_tables([User, Relationship, Grab], safe=True)
    db.close()
