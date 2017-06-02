from flask import Flask, g, render_template, flash, redirect, url_for
from flask_login import LoginManager

import forms
import models
from database import db

DEBUG = True
PORT = 8000
HOST = '0.0.0.0'

app = Flask(__name__)
app.secret_key = 'ufygetguyihufg8479oiuyg678909876rftvgh'

# login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


@login_manager.user_loader
def load_user(userid):
    try:
        # user exists
        return models.User.get(models.User.id == userid)
    except models.DoesNotExist:
        return None


@app.before_request
def before():
    """Connect to the database before each request"""
    g.db = db
    g.db.connect()


@app.after_request
def after(response):
    """Close db after request"""
    g.db.close()
    return response


# routes from mobile app
@app.route('/register', methods=['GET, POST'])
def register():
    form = forms.RegisterForm()
    # detects of form is submitted
    if form.validate_on_submit():
        flash("you registered!", "Success")

        models.User.create_user(
            username=form.username.data,
            email=form.email.data,
            password=form.password.data,
        )

        # redirects to index
        return redirect(url_for('index'))
    return render_template('register.html', form=form)


@app.route('/')
def index():
    return "hello world"


if __name__ == '__main__':
    models.initialize()

    models.User.create_user(
        username="tyler",
        email='tyler@angert.com',
        password='wowowow',
        admin=True)

    app.run(debug=DEBUG, host=HOST, port=PORT)
