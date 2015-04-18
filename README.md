#LOLURF

## URL
https://lolurf-phwu-1.c9.io

 I will try to ensure the above link is always up. 
 Due to issues deploying to Heroku, using C9 
 as a temp solution.
 
## How to Use
THIS CODE WILL NOT RUN STRAIGHT FROM A PULL. Some necessary steps:
1. Configure config.js (setup db, api key -- I have setup read access to my db in the config if you want to just put in your own api key (skip 3 if so))

2. Install node dependencies (npm install)

3. Run utils to insert data into your db


4. Start backend (node server)

5. Go to the bans, dashboard, players controllers found within their respective dir in ./public and find the HTTP GET to Riot's API. You need to substitute your key. Did not have enough time to externalize config properties for frontend. Sorry!

6. Go to localhost:port

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

