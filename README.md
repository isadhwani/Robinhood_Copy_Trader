# Project Echo
![image](https://github.com/user-attachments/assets/914c2697-9b30-4779-a38e-346baab4a966)

## Problem Statment
People want crypto exposure, but they don't know what and how to buy! 

## What is Echo?
Echo is a one click solution for users to connect their Robinhood account and instantly trade based on either an algorithm, crypto influencer, or celebrity. Echo plans to make buying and selling the right crypto easy everyday for everyday investors.

## Run instructions:
### Backend API Platform:
Our backend is managed with `Poetry` and requires `Python 3.12` to run. After meeting these requirements, navigate into the `backend` directory, activate the virtual enviroment, install required packages and run the API. 

`cd backend`  
`poetry shell`  
`poetry install`  
`./run.sh`   


### Frontend:
Our frontend is written with Typescript and Next.js and is managed with NPM. The default port is `3000` and we require Node version `>v22.4.1` and Next version `>14.2.5`. To locally run, navigate to `frontend/echo`, install the required packages, build the project, and run it localy.

`cd frontend/echo`  
`npm run build`  
`npm start`  
