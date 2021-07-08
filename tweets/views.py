from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from .models import tw_tweet, tw_comment
import cgi
import os
import sys
from datetime import datetime
from django.urls import reverse

# Create your views here.


def home(request):

    def get_reply_count(tweetid):
        count = tw_tweet.objects.filter(
            parent_tweet_id=tweetid).count()
        return count

    all_tweets = tw_tweet.objects.all().order_by("-create_at")

    for tweet in all_tweets:
        tweet.count = get_reply_count(tweet.id)

    context = {
        "all_tweets": all_tweets
    }

    return render(request, 'home.html', context)


def postTweet(request):

    return render(request, 'post-tweet.html')


def postTweetSave(request):

    fileitem = request.FILES.get('post_image', None)
    title = request.POST['name']
    discreption = request.POST['text']
    dateTime = datetime.now()

    if fileitem:
        with open('static/tweets/userimage/' + str(fileitem), 'wb+') as destination:
            for chunk in fileitem.chunks():
                destination.write(chunk)
                imageurl = 'tweets/userimage/' + str(fileitem)
    else:
        imageurl = None
        usrmsg = 'No file was uploaded'

    try:

        new_tweet = tw_tweet(

            name=title,
            text=discreption,
            create_at=dateTime,
            image_path=imageurl
        )
        new_tweet.save()

        return redirect('home')

    except:
        print("The Error is occured")


def postDetails(request, tweet_id):
    
    all_tweets = tw_tweet.objects.filter(id=tweet_id)
    all_replies = tw_tweet.objects.filter(parent_tweet_id=tweet_id)

    context = {
        "all_replies": all_replies,
        "tweet_id": tweet_id,
        "all_tweets": all_tweets
    }

    return render(request, 'post-details.html', context)


def reply(request, tweet_id):

    context = {
        'tweet_id': tweet_id
    }
    return render(request, 'reply.html', context)


def replySave(request, tweet_id):

    title = request.POST['name']
    discreption = request.POST['text']
    dateTime = datetime.now()

    try:
        new_tweet = tw_tweet(
            parent_tweet_id=tweet_id,
            name=title,
            text=discreption,
            create_at=dateTime

        )
        new_tweet.save()

        return HttpResponseRedirect(reverse('post-details', kwargs={"tweet_id": tweet_id}))

    except:
        return print("The Error is occured")
