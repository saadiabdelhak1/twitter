
from django.urls import path

# tweets/urls.py
from . import views

urlpatterns = [

    path('', views.home, name='home'),
    path('post-tweet', views.postTweet, name='post-tweet' ),
    path('process_form', views.postTweetSave, name='process_form' ),
    path('post-details/<int:tweet_id>/', views.postDetails, name='post-details' ),
    path('replySave/<int:tweet_id>/', views.replySave, name='replySave' ),
    path('reply/<int:tweet_id>/', views.reply, name='reply' )
    
]