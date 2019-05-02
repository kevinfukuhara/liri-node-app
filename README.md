# liri-node-app

##Project Description:
Liri is a node applicaiton that uses command-line to query and return informaiton regarding:
    - Concerts for Artists in Bands in Town Databse
    - Movies in OMDB Database
    - Music in Spotify
    - Whatever the developer would like to show their audience (in the random.txt file)

###Below is a link to view a demo of the project:
[Google Drive Link](https://drive.google.com/file/d/1SIaaT6xLkK6Kqw1aE6r6d85f8ynPQLQo/preview)

##Purpose of this project: 
Liri was our first dive into Node.js. This is important because it shows how we can utilize javascript on a server.
Liri also really helped exercise our experience with APIs and organizing them when there are numerous APi services within one app. 

##How to get started:
1. You'll need 'Node.js' and 'npm' installed on your machine
2. In the folder where the Liri.js file is located, install the following node packagkes using npm:
    a. node-spotify-api
    b. fs
    c. axios
    d. dotenv
    e. moment
3. Acquire yourself a Spotify ID and Spotify Secret for API usage
4. Put those into a .env file with:
    ```
    # Spotify API keys
    SPOTIFY_ID=*S_ID*
    SPOTIFY_SECRET=*S_SEC*
    ```
5. Create .gitignore file with: 
    ```
    node_modules
    .DS_Store
    .env
    ```
6. Create a keys.js file with the below pasted in:
    ```
    console.log('this is loaded');

    exports.spotify = {
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    };
    ```
With all those steps complete, you should be ready to run my liri-app!

##Where you can find help:
If you are stuck witht his project, it is useful to ustilize Google whenever you are unsure - 
    a. node-spotify-api
    b. fs
    c. axios
    d. dotenv
    e. moment
    f. Spotify Web SPI Documentation

Many of these Google searches will return useful code from Stackoverflow that may be useful too - what others used to implement the queries and ingest the data.


##Authors and Maintainers of this code: 
- Kevin Fukuhara

