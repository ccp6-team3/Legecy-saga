<p align="center">
  <img alt="saga" width="400px" src="./frontend/src/sagaLarge.svg" />
</p>

# <div align="center">A platform for reviewing your favorite movies and shows</div>

# Introduction  
[saga](https://saga-hpnk.onrender.com/) is an application designed to give users one location to find popular movies and tv shows and leave their own reviews. Our application uses data from TMDB to provide details about past and upcoming movies and shows. We hope you enjoy using saga.  
<br>
[saga](https://saga-hpnk.onrender.com/) uses javascript with react and react-bootstrap to render responsive UI/UX and runs a node.js server and a postgresql database.  

# Features
* Uses TMDB api to ensure only the latest data is displayed
* Displays most popular movies and shows on the homepage
* Filters through movies and shows by genre, ratings, and other filters
* Displays upcoming films and release dates
* Finds data pertaining to ratings and reviews of the movies and shows
* Allows users to add their own reviews to the existing review collections.
* Provides a safe mode switch which only shows movies that are not marked with adult content

# Getting Started  
### ‼️ Things you will need:
* Install [postgresql](https://www.postgresql.org/)
* Get api key from [TMDB](https://www.themoviedb.org/documentation/api)

### Setup
Begin by running the following command in the root folder to install depencies  
```js
npm install
```  
Next, create a postgresql database  
```js
psql
CREATE DATABASE <db_name>
```  
After your database is created and running, run the following commands to create database and add seed data  
```js
npm run migrate:latest
npm run seed:data
```  
To start the server, run the following command  
```js
npm start
```  
Next run the following commands to change directory to ```./frontend``` and install npm dependencies for react  
```js
cd frontend
npm install
```  
Finally, to start the react app run the following command in ```./frontend```  
```js
npm start
```  
# How to set up knexfile.js  
```knexfile.js``` can be find at the following path from the root folder: ```./backend/db```  

You will need to set up a ```.local.env``` file in the root folder which contains the following variables:  
```
API_KEY_TMDB=<your_api_key>
DB_USER=<your_db_username>
DB_NAME=<your_db_name>
DB_PASSWORD=<your_db_password>
NODE_ENV=development
```  
You will also want to add your ```.local.env``` to the ```.gitignore``` file in the root folder to avoid your sensitive data from being pushed to github 😱

# Contributors 🛠
Feel free to check out our github pages and see what other projects we have worked on! 😎
<table>
  <tr>
    <td align="center"><a href="https://github.com/brian-walvoord"><img src="https://avatars.githubusercontent.com/u/84251599?v=4" width="200px;" alt=""/><br /><sub><b>Brian Walvoord</b></sub></a></td>
    <td align="center"><a href="https://github.com/Takahiro9-Murakami9"><img src="https://avatars.githubusercontent.com/u/92550379?v=4" width="200px;" alt=""/><br /><sub><b>Yousef</b></sub></a></td>
    <td align="center"><a href="https://github.com/YJK-7"><img src="https://avatars.githubusercontent.com/u/92072255?v=4" width="200px;" alt=""/><br /><sub><b>Yoon Ju</b></sub></a></td>
    <td align="center"><a href="https://github.com/calss0t"><img src="https://avatars.githubusercontent.com/u/107403548?v=4" width="200px;" alt=""/><br /><sub><b>Pol Texido</b></sub></a></td>
    <td align="center"><a href="https://github.com/yukicodes"><img src="https://avatars.githubusercontent.com/u/99167495?v=4" width="200px;" alt=""/><br /><sub><b>Yuki Kamoshita</b></sub></a></td>
  </tr>
</table>
