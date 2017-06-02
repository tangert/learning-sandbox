from flask_wtf import Form
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Regexp, ValidationError, Email, Length, EqualTo

from models import User


def name_exists(form, field):
    if User.select().where(User.username == field.data).exists():
        raise ValidationError('User exists already')


def email_exists(form, field):
    if User.select().where(User.email == field.data).exists():
        raise ValidationError('Email exists already')


class RegisterForm(Form):
    # form validation
    # pass in an array of validators
    username = StringField(
        'Username',
        validators=[
            DataRequired(),
            Regexp(
                r'^[a-zA-Z0-9_]+$',
                message="Username should be one word: letters, numbers, and underscores only"),
            name_exists
        ])

    email = StringField(
        'Email',
        validators=[
            DataRequired(),
            Email(),
            email_exists
        ])

    password = PasswordField(
        'Password',
        validators=[
            DataRequired(),
            Length(min=5),
            EqualTo('password2', message='passwords must match')
        ])

    password2 = PasswordField(
        'Confirm Password',
        validators=[
            DataRequired()]
    )
