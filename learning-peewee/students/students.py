from peewee import *

# make a database
# we will use sqlite
db = SqliteDatabase('students.db')

class BaseModel(Model):
	class Meta:
		database = db


class Student(BaseModel):
	# attributes

	# var char in SQL
	username = CharField(max_length=255, unique=True)
	points = IntegerField(default=0)


students = [
{'username': 'tyler',
'points': 4858},
{'username': 'woo',
'points':3333},
{'username':'lucas',
'points':212345}
]

def add_students():
	for student in students:
		try:
			Student.create(username=student['username'],
							points=student['points'])
		except IntegrityError:
			student_record = Student.get(username=student['username'])
			student_record.points = student['points']
			student_record.save()

def top_student():
	# gets top student by descending order
	# .get() gets first record in sort
	student = Student.select().order_by(Student.points.desc()).get()
	return student

if __name__ == '__main__':
	db.connect()
	db.create_tables([Student],safe=True)

	add_students()
	print("Top student is: {0.username}.".format(top_student()))

	# queries

	# .create()
	# .select()
	# .save()
	# .get()
	# .delete_instance()