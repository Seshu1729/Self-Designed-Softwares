import click, sys, os, MySQLdb, openpyxl

from django.core.wsgi import get_wsgi_application
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "second_round.settings")
application = get_wsgi_application()

from buzzer_round.models import *
from django.contrib.auth.models import User

username = "seshu"
password = "seshu"
database_name = "second_round"

def xl(ws,r,c):
    return str(ws.cell(row=r,column=c).value)

@click.group()
def main():
    pass

@main.command('create_database', short_help='to create requried database')
def create_database():
    '''command that create the database of questions and users'''
    connection = MySQLdb.connect('localhost', username, password, '')
    cur = connection.cursor()
    sql_command = "CREATE DATABASE %s" % database_name
    try:
        cur.execute(sql_command)
        print "DATABASE CREATED SUCCUSSFULLY"

    except MySQLdb.Error,e:
        print "Error %d: %s" % (e.args[0],e.args[1])
        sys.exit(1)

    os.system("python manage.py makemigrations")
    os.system("python manage.py migrate")

@main.command('drop_database', short_help='to drop database')
def drop_database():
    '''command that drop the database of questions and users'''
    connection = MySQLdb.connect('localhost', username, password, '')
    cur = connection.cursor()
    sql_command = "DROP DATABASE %s" % database_name
    try:
        cur.execute(sql_command)
        print "DROP DATABASE SUCCUSSFULLY"

    except MySQLdb.Error,e:
        print "Error %d: %s" % (e.args[0],e.args[1])
        sys.exit(1)

@main.command('clear_database', short_help='to clear to database')
def clear_database():
    '''command to clear the database'''
    report.objects.all().delete()
    game.objects.all().delete()
    quiz_game.objects.all().delete()
    print "DATABASE CLEARED SUCCUSSFULLY"

@main.command('upload_questions', short_help='to populate question to database')
@click.argument('db_name')
@click.argument('sheet_name')
@click.argument('row_count')
def upload_questions(db_name,sheet_name,row_count):
    '''command that populate questions to database'''
    try:
        db_address = "db/" + db_name + ".xlsx"
        ws = openpyxl.load_workbook(db_address)[sheet_name]
    except IOError:
        print "FILE NOT EXISTS"
        return -1

    for i in xrange(1, int(row_count) + 1):

        try:
            #get requried data
            question_description = xl(ws,i,1)
            display_options = [xl(ws,i,2),xl(ws,i,3),xl(ws,i,4),xl(ws,i,5)]
            correct_option = xl(ws,i,6)

            #save new question
            question_obj = question(question_description=question_description,correct_option=correct_option)
            question_obj.set_display_options(display_options)
            question_obj.save()
        except:
            pass

    print "QUESTIONS DATABASE POPULATED SUCCUSSFULLY"

@main.command('upload_users', short_help='to populate user to database')
def upload_users():
    '''command that populate users to database'''
    try:
        ws = openpyxl.load_workbook("Db/BUZZDB.xlsx")["USERS"]
    except IOError:
        print "I/O ERROR.\nPLEASE CHECK NECESSARY FILES."
        return -1

    #cnt = ws.max_row
    cnt = 5
    for i in xrange(1, cnt + 1):
        #create new user
        username = xl(ws,i,1)
        password = xl(ws,i,2)
        user_obj = User.objects.create_user(username=username,password=password)
        user_obj.save()

        #create user table link
        obj = user(user_details=user_obj)
        obj.save()
    print "USERS DATABASE POPULATED SUCCUSSFULLY"

if __name__ == '__main__':
    main()
