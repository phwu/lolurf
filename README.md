**Found a bug while deploying to Heroku. Since I did not run this on my local (I had a cloud dev space), I did not catch this bug till now. See issues for more details. Please be patient, I need to fix the frontend (partials not loading). I believe the backend is OK.**


#LOLURF

## Backend
REST backend established using Express and Node. Used utility classes to feed data into the application's db from Riot's API and dissected URF game data into respectful collections. This allowed me to utilize the data more easily when I created routes for them. For example: to see number of baron kills against all teams, the route would be /teamStats/baronKills . ONLY GET type routes implemented!!! I did not feel comfortable with the idea of the data being updated (why should it be?) so no POST/PUT/DELETE. This could be something easily implemented with Express though if you would like!

This part of the web app is testable as-is. You do not need a Riot API key as it is using application's db and I have supplied a READ-ONLY login/pw. All you need to do is install dependencies and run **node server** .

ps - I may have forgot to include Jade as a dependency (but it is one) so you will need to add that in the package.json then run npm install to update the node_modules.

## Frontend
Links to several pages, including overall dashboard that supplies statistical information based on the data loaded into the application's db. This include top bans and their percentage, overview of team stats from games played (e.g. total dragon kills), and overview of player stats from games played (e.g. most played champ, max penta kills in a game, etc.). 

Currently frontend will not display properly due to partials not routing correctly via Angular. This is something I am trying to fix. I may need to remove partials and implment static pages (which is OK since the pages do not use similiar layouts). Will try to fix by Wednsday but currently on vacation x(

## URL
https://lolurf-phwu-1.c9.io

 I will try to ensure the above link is always up but I have noticed C9 will kill the box every couple days. 
 Due to issues deploying to Heroku, using C9 
 as a temp solution.
 
## How to Use
THIS CODE WILL NOT RUN STRAIGHT FROM A PULL. Some necessary steps:

1. Configure config.js (setup db, api key -- I have setup read access to my db in the config if you want to just put in your own api key (skip 3 if so))

2. Install node dependencies (npm install)

3. Run utils to insert data into your db

4. Start backend (node server)

5. Go to the bans, dashboard, players controllers found within their respective dir in ./public and find the HTTP GET to Riot's API. You need to substitute your key. Did not have enough time to externalize config properties for frontend. Sorry!

6. Go to localhost:port (default is 3000 unless otherwise specified in PROCESS_ENV_PORT)

You should not need to install bower components as I mainly used cdns.

## Technologies
* MEAN
* Mongoose
* Bootstrap
* C9 (dev on the go)

## Future Enhancements
* More content
* Explaination on how to read the tables
* Document api (see /ap/routes for now)
* Graphics (pics and graphs)
* Proper debugging / tests

## Known Issues
* Slow load on heavy data pages
* Champ Naming is a function w/i controller right now, want to create a service
* Correct dynamic route syntax to properly return 404 instead of 200 for "empty" res
* Bad comments on commits due to testing Heroku deployment

