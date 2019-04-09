# TV Friend Finder
Objective: This full-stack site will take in results from your users' surveys, then compare their answers with those from other users. The app will then display the name and picture of the user with the best overall match.

## Overview
Welcome to TV Fiend Finder! A simple web app aiming to share my love of TV with the world and helping those fans find each other. In my free time, I'm convincing friends and coworkers to give some of my favorite shows a try. As a devoted TV fan, I curated the recommended shows, questions, and show scores.

The app has three main pages. 

1. Homepage: 
Here users will find an introduction some minor links that only exist on the homepage. Those include a link to my Github and 2 API urls that will return data from the database.

2. Survey: 
Here users can fill out a form based on the type of show they are in the mood to watch. The form will require users to provide their names and a URL to a photo or social media page. All dropdowns default to a "1 (Strongly Disagree)" selection if left untouched.

The user's answers are compared with the scores defined for shows in the database. The show with the most similar score is determined to be the best match will be displayed on screen. Details presented about the show are fetched from the OMDB database.

Below show details, the user will see if there are any past app users that matched with the same show.

3. Friends: 
Here users will be able to skip taking the survey to find other users that matched with one of my show recommendations. I wanted a way to keep users from having to take the survey multiple times just to find a community around one of these shows.


## Tech Used
Front End:
* Bootstraps
* JQuery

Back End:
* OMDB API
* Node.js 
* Express server
* Dependencies noted in package.json
 -   "axios": "^0.18.0",
 -   "dotenv": "^7.0.0",
 -   "express": "^4.16.4",
 -   "mysql": "^2.16.0",
 -   "path": "^0.12.7"

Database: 
* mySQL

Deployment:
* Heroku 

## Future Development
* The next step would definitely include aspects to foster a sense of community. Here are a few of the ideas that fell out of time and scope restraints for the initial build.
 - Install login/user authentication
 - Validate/encourage users to provide their social media contact

* Create new shows. Perhaps an admin page to allow new shows to be added from the front end.

* The URL validation for the survey form could to be stronger.
