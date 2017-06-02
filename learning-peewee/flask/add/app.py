from flask import Flask
from flask import request
from flask import render_template

app = Flask(__name__)

# request variables
# from a query string

@app.route('/')
def index(name = 'Tyler'):
	# second argument is default value
	fname = request.args.get('fname')
	lname = request.args.get('lname')
	context = {'fname': fname, 'lname':lname}
	
	return render_template('index.html',**context)

@app.route('/add/<int:num1>/<int:num2>')
def add(num1, num2):
	context = {'num1': num1, 'num2': num2}
	return render_template('add.html',**context)

if __name__ == '__main__':
	app.run(debug=True,port=8000,host='0.0.0.0')