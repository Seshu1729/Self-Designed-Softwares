from django.shortcuts import render
from django.contrib.auth import authenticate,login
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from .models import *
from .utilities import *

#signal requriments
host_addr = "ws://10.42.0.66:8888/ws"
host_addr_sound = "ws://10.42.0.66:6666/ws"

# Create your views here.
def index(request):
    return render(request,template_name="buzzer_round/index.html")

def validation(request):
    #get details
    username = request.POST['username']
    password = request.POST['password']
    table_id = request.POST['table_id']
    game_id = request.POST['game_id']

    #auth user
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponseRedirect('/dashboard/?table_id=%s&game_id=%s'%(table_id,game_id))
    else:
        context_message = {"default_message": "Invalid login. Username and password are not matched."}
        return render(request, template_name="buzzer_round/index.html", context=context_message)

@login_required
def dashboard(request):
    table_id = request.GET["table_id"]
    game_id = request.GET["game_id"]

    if request.user.is_superuser:
        try:
            zingzing(host_addr,'R',2,2)
        	
            game_obj = game.objects.get(game_id=game_id, is_active=1)

            selected_questions_in_quiz_game = quiz_game.objects.filter(game_link=game_obj)
            selected_questions = []
            for selected_question_in_quiz_game in selected_questions_in_quiz_game:
                selected_questions.append(question.objects.get(id=selected_question_in_quiz_game.question_link_id))

            context_message = {"selected_questions": selected_questions, "table_id": table_id, "game_id": game_id}
            return render(request, template_name="buzzer_round/dashboard.html", context=context_message)
        except:
            # create new game
            game_obj = game(game_id=game_id)
            game_obj.save()

            # add new 9 questions
            try:
                selected_questions = question.objects.all().order_by('?')[:9]
            except:
                context_message = {"default_message": "Oops!! Database is not Sufficient. Add Few More Questions."}
                return render(request, template_name="buzzer_round/index.html", context=context_message)

            # create new quiz game
            for selected_question in selected_questions:
                quiz_obj = quiz_game(game_link=game_obj, question_link=selected_question)
                quiz_obj.save()

            context_message = {"selected_questions": selected_questions,"table_id":table_id,"game_id":game_id}
            return render(request, template_name="buzzer_round/dashboard.html", context=context_message)

    else:
        try:
            game_obj = game.objects.get(game_id=game_id, is_active=1)

            try:
                report_obj = report.objects.get(table_id=table_id,game_id=game_obj)
            except:
                report_obj = report(table_id=table_id,game_id=game_obj)
                report_obj.save()

            selected_questions_in_quiz_game = quiz_game.objects.filter(game_link=game_obj)
            selected_questions = []
            for selected_question_in_quiz_game in selected_questions_in_quiz_game:
                selected_questions.append(question.objects.get(id=selected_question_in_quiz_game.question_link_id))

            context_message = {"selected_questions": selected_questions,"table_id":table_id,"game_id":game_id}
            return render(request, template_name="buzzer_round/dashboard.html", context=context_message)
        except:
            context_message = {"default_message": "Oops!! Invalid Game ID. Please Try Again."}
            return render(request, template_name="buzzer_round/index.html", context=context_message)

@login_required
def view_question(request):
    question_link = request.GET["question_link"]
    table_id = request.GET["table_id"]
    game_id = request.GET["game_id"]

    try:
        selected_question = quiz_game.objects.get(question_link=question_link,game_link_id=game_id,question_lock=-2)

        selected_question.question_lock = int(request.user.id)
        selected_question.save()

        zingzing(host_addr_sound,'3',1,2)
        zingzing(host_addr, 'P', table_id, 3)

        selected_question = question.objects.get(id=question_link)
        options = dict(zip(["option1", "option2", "option3", "option4"], selected_question.get_display_options()))

        context_message = {"selected_question": selected_question, "options": options, "question_link": question_link,"table_id":table_id,"game_id": game_id}
        return render(request, template_name="buzzer_round/view_question.html", context=context_message)
    except:
        context_message = {"default_message": "Oops!!. It's Too late!!!"}
        return HttpResponseRedirect('/dashboard/?table_id=%s&game_id=%s' % (table_id, game_id))

@login_required
def unlock_question(request):
    question_link = request.GET["question_link"]
    table_id = request.GET["table_id"]
    game_id = request.GET["game_id"]

    try:
        game_obj = game.objects.filter(game_id=game_id)
        selected_question = quiz_game.objects.get(question_link=question_link, game_link=game_obj, question_lock=-1)

        selected_question.question_lock = -2
        selected_question.save()

        selected_question = question.objects.get(id=selected_question.question_link_id)
        options = dict(zip(["option1", "option2", "option3", "option4"], selected_question.get_display_options()))

        context_message = {"selected_question": selected_question,"options":options,"table_id":table_id,"game_id":game_id}
        return render(request, template_name="buzzer_round/view_question.html", context=context_message)
    except:
        context_message = {"default_message": "Question is Already Unlock. Please Try Other Questions"}
        return HttpResponseRedirect('/dashboard/?table_id=%s&game_id=%s' % (table_id, game_id))

def submit_answer(request):
    question_link = request.GET["question_link"]
    table_id = request.GET["table_id"]
    game_id = request.GET["game_id"]
    value = request.GET["value"]

    question_obj = question.objects.get(id=int(question_link))
    game_obj = game.objects.get(game_id=int(game_id))
    report_obj = report.objects.get(table_id=int(table_id), game_id=game_obj)

    if int(value)==question_obj.correct_option:
        report_obj.points_gained += 10
        zingzing(host_addr_sound,'2',1,2)
        zingzing(host_addr, 'P', table_id, 2)
    else:
        report_obj.points_gained -= 5
        zingzing(host_addr_sound,'1',1,2)
        zingzing(host_addr, 'P', table_id, 1)

    report_obj.save()

    return HttpResponseRedirect('/dashboard/?table_id=%s&game_id=%s' % (table_id, game_id))

def leader_board(request):
    table_id = request.GET["table_id"]
    game_id = request.GET["game_id"]
    game_obj = game.objects.get(game_id=int(game_id))
    report_obj = report.objects.filter(game_id=game_obj).order_by('-points_gained')

    if report_obj[0].points_gained!=0:
        zingzing(host_addr, 'P', report_obj[0].table_id, 2)

    context_message = {"table_id": table_id, "game_id": game_id, "report_list": report_obj}
    return render(request, template_name="buzzer_round/leader_board.html", context=context_message)