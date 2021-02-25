

# Create your models here.
from django.db import models

class tw_tweet(models.Model):
    parent_tweet_id = models.IntegerField(default=None, null=True)
    name = models.CharField( max_length=100)
    text = models.CharField(max_length=250)
    image_path = models.CharField(max_length=250,null=True)
    create_at = models.DateTimeField('created at')

    def  __str__(self):
        return self.name

class tw_comment(models.Model):
    name = models.CharField(max_length=100)
    comment = models.CharField(max_length=250)
    create_at = models.DateTimeField(max_length=100)