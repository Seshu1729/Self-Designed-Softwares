from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models
import json

# Create your models here.
class question(models.Model):
    question_description = models.CharField(max_length=256)
    display_options = models.CharField(max_length=256)
    correct_option = models.IntegerField()

    def set_display_options(self,data):
        self.display_options = json.dumps(data)

    def get_display_options(self):
        return json.loads(self.display_options)

class user(models.Model):
    user_details = models.ForeignKey(User)
    is_active = models.BooleanField(default=1)

class game(models.Model):
    game_id = models.IntegerField(primary_key=True)
    is_active = models.BooleanField(default=1)

class quiz_game(models.Model):
    game_link = models.ForeignKey(game)
    question_link = models.ForeignKey(question)
    question_lock = models.IntegerField(default=-1)

class report(models.Model):
    table_id = models.IntegerField()
    game_id = models.ForeignKey(game)
    points_gained = models.IntegerField(default=0)