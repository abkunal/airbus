# Air-buzz
Airbus's CMS which can be used by Airbus ground crew to upload flight data.

Hosted Application Link - http://abkunal-airbus.s3-website-us-east-1.amazonaws.com/

## Hosted API Links
1. Newsfeed API (GET) - https://l4ukon2x0i.execute-api.us-east-1.amazonaws.com/prod/newsfeed
2. Add Flights API (POST) - https://l4ukon2x0i.execute-api.us-east-1.amazonaws.com/prod/add-flight
3. Search Flights (GET) - https://l4ukon2x0i.execute-api.us-east-1.amazonaws.com/prod/search-flights

## Features
  1. User can see the news feed on the homepage.
  2. Infinite loading is implemented to allow user to view more stories on the page as he/she scrolls down.
  3. User can add a new flight to the database based on different aircrafts (A320, A330 and A350).
  4. Validation has been implemented to prevent duplicate flights at the same time.
  5. User can search for flights based on different parameters like MSN, Flight No, Source or Destination Airport and flight take off timings.

# Tech Stack

## Frontend
1. Made over React.
2. Styling has been done using custom styling + Material UI for forms.
3. For Request handling we are using browser's native Fetch API.

## Backend
1. API made in Nodejs and running as Lambda function on AWS.
2. MySQL server hosted on Amazon RDS (Relational Database Service) is used as the database.
3. When a request is made the lambda function, the function makes the database query to fetch or save data.
4. Serverless framework is used to manage the three lambda functions (newsfeed.js, addFlight.js and searchFlights.js).

