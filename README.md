__mod14 SBA__
__Notes and Bookmarks API__ 

Adding to the Notes-API project:) 

This is a secure RESTful API for managing personal notes and bookmarks with user authentication.

It is built with node.js, express, mongodb, and JWT authenication.   

This API features standard email/password authentication and GitHub OAuth integration.


(NOTE: All credentials shown in this README file are test/example data for testing)

----------------------------------------------------------------------

__Features__
* User authentication - JWT based authentication with email/password registration and GitHub OAuth;
* Notes Management - create, read, update, and delete personal notes;
* bookmarks managment - save and organize web bookmarkes with tags;
* user specific access - users can only access their own notes and bookmarks;
* security - password hashing, JWT tokens, and authorization middleware;
* github integration: OAuth authentication with GitHub accounts.

  __Tech Stack__
  * backend: node.js and express.js;
  * database: mongoDB with mongoose ODM;
  * authentication: JWT, passport.js (Github OAuth);
  * security: bcrypt for password hashing;
  * environment: dotenv for dealing with environment variables
  
__new project structure:__ 

<img width="152" height="395" alt="image" src="https://github.com/user-attachments/assets/16176ab6-06bf-4147-9cb6-52655763c21f" />

-----------------------------------------------

__Install and set up__
* clone and install dependencies: `git clone <repo-url>`, `cd note-api`, `npm install`
  
  dev dependencies to install:
  * `npm install express mongoose dotenv cors bcryptjs jsonwebtoken passport passport-github2`
  * `npm install --save-dev nodemon`


 __MongoDB Setup__
 
* create a mongoDB atlas account or use local mongoDB
  
* create a new database called notesapi
  
* update the MONGO_URI in your .env file



__GitHub OAuth Setup__

* go to Github settings -> developer settings -> OAuth Apps
  
  
* create a new OAuth app with:
  
  
         * application name: Notes API

         * homepasge URI/URL: http://localhost: 3000
  
         * callback URI/URL; http://localhost:3000/api/users/auth/github/callback
  
         * copy client ID an client secret to your .env file


__Environment Configuration__

* get the Github client Id, secret, etc from the dev settings in Github
  
* create an .env file in the root directory: `env`  has this in it: 

  `MONGO_URI=your_mongodb_connection_string

  JWT_SECRET=your_jwt_secret

  GITHUB_CLIENT_ID=your_github_client_id

  GITHUB_CLIENT_SECRET=your_github_client_secret

  GITHUB_CALLBACK_URL=http://localhost:3000/api/users/auth/github/callback`
    
    -----------------------------------------------------------------------------

__Start Server__

npm run dev

server runs on http://localhost:3000




__API Endpoints__ to test

__Authentication Endpoints__

_USER endpoints_

_*Register New User* endpoint test_

POST   http://localhost:3000/api/users/register

-In Postman -- create new HTTP request--select POST and use the endpoint above: 

content-type: application/json 

-click "body" -- click "raw" - select "JSON"

-in body type:


{ 
  "username": "Space-Kitten",
  
 
 "email": "spacedoutcat@cat.com",
 
 
 "password": "huntandplay2"
 
 }

<img width="1280" height="764" alt="image (5)" src="https://github.com/user-attachments/assets/512d9c37-aa98-4618-885b-5c848dc45af5" />


---------------------------------------------------------------------

__*Login User* endpoint test__

-In Postman--click "New HTTP Request"

*POST  /api/users/login

 -endpoint to test: http://localhost:3000/api/users/login
 
-content-type:application/json

 -click "body" -- click "raw" --- select "JSON"  -- then type in the body:

{

  "email": "spacedoutcat@cat.com",
  
  
  "password":"huntandplay2"
  
}


<img width="1280" height="764" alt="image (6)" src="https://github.com/user-attachments/assets/164b7829-a5ac-4f68-9b73-ad9a8ed8eb4c" />


--------------------------------------------------------------------------


__*GitHub OAuth (browser-based)*__


*OAuth is meant for testing the "login with Github" buttons--not direct API testing--


--To Test GitHub OAuth Flow: 


*GET  /api/users/auth/github   (redirects to Github)


-open browser --- paste `http://localhost:3000/api/users/auth/github`

-redirects to GitHub login

-login with your Github account

-you have authorized the app

-GitHub sends you back to your callback URL



GET  /api/users/auth/github/callback  (Github callback URL)

`http://localhost:3000/api/users/auth/github/callback?code=XXXXXXXXXXXXXX`

-Your server creates a JWT token and returns it

`{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...[truncated]",
  
  "user": {
  
    "_id": "507f1f77bcf86cd799439011",
    
    "username": "testuser",
    
    "email": "test@example.com",
    
    "githubId": "12345678"
    
  }
  
}`





---------------------------------------------------------------------------------------------
  __*Notes endpoints*__
  
  -All note endpoints require JWT authentication via an authorization header-

   __Create New Note Endpoint Test__

   
  *in Postman--new HTTP request---select "POST" for new post request---then put in the endpoint desired to create a new note:
  
  *POST  http://localhost:3000/api/notes/
  
  *authorization: bearer <jwt_token>
  
  -Click on "Authorization"---then select type --"Bearer Token"---then put in the token from the user created earlier

    
  *content-type: application/json
  
  -Click on "Body" ---then select "JSON" in dropdown--then type in the body section
  
  (creating note for user Space-Kitten)

  
  {
  
    "title": "Exploring the woods",
    
    "content": "Lots of woods near my house--perfect for playing and hunting."
    
  }


 -Click "Send"---then look in the body --"Raw" to see status if created successfully "201 Created" and the title and content now associated with the user and user's id"
 
<img width="1280" height="764" alt="image (7)" src="https://github.com/user-attachments/assets/15993296-59b5-4cb4-93b1-4201e89e8885" />


  ----------------------------------------------------------------
  
 __Update Note Endpoint Test__
  
  *PUT  /api/notes/:noteId
  
  -http://localhost:3000/api/notes/6883b069e1baaa193a65d2f2

  
  *authorization: bearer <jwt token>
  
  *content-type: application/json
  
  (updating a note for user Space-kitten(6883afc0e1baaa19a65d2f0) with associated note from before 6883b069e1baaa193a65d2f2)
  
  {
  
   "title": "Exiting the woods",
   
   "content": "Nevermind the woods are full of stray dogs"
   
   }
  
  

-------------------------------------------------------------------------------------

 __Get All User Notes Endpoint Test__

   *GET  /api/notes
   
   -In Postman --- create new HTTP Request---select "GET" --- put this endpoint in:
   
   http://localhost:3000/api/notes

   *authorization: bearer <jwt_token>
   
    -click Authorization ---in Type ---select Bearer token ----in Token  put the user's  (whose notes you want) token
    
    -Click Send
    
    -If successful will return in the body: Status: 200 OK  and in Raw: all the notes associated with that particular user

   <img width="1280" height="764" alt="image" src="https://github.com/user-attachments/assets/12be4241-e2a3-406b-8f08-63497471c9a6" />


----------------------------------------------------------------------


   __Delete Note Endpoint Test__
   
   DELETE  /api/notes/:noteId
   
   http://localhost:3000/api/notes/6883b069e1baaa193a65d2f2
   
   find note by its id:6883b069e1baaa193a65d2f2 and Delete it
   
   ensure the user associated with the note has her/his token in the authorization:
   
   authorization: bearer <jwt token>
   
   clik "send"
   
   and in body response get "200 OK" status and the object 
   
   {"message":"Note deleted"}



  --------------------------------------------------------

  __Bookmark Endpoints__
  
  All bookmark endpoints require JWT authenication via the authorization header

   -Create New Bookmark-
   
   (in postman--- new HTTP request)
   
  *POST  http://localhost:3000/api/bookmarks/
  
  *use the token from user and add to the Authorization field--choose type and in dropdown select--Bearer token---paste token in the empty token field
  
  content-type: application/json
  
  *click on the "Body" option---then click "raw" button---drop down select JSON--then in the body field type:
  
  
  
   {
     "title": "Cat-World",
    
    "url": "https://cat-world.com/",
    
    "description": "All about Cats",

    }

    *add a few book marks with same user
    
    *add a few book marks for another user



  __Get all User Boookmarks__
  
  (in postman--- new HTTP request)
  
  GET  /api/bookmarks
  
  authorization: bearer <jwt token>



    __Update Bookmark__
    
     (in postman--- new HTTP request)
     
    PUT  /api/bookmarks/:bookmarkId
    
    authorization: bearer <jwt token>
    
    content-type: application/json


    {
    
      "title": "Cat-World Site Favs",
      
      "description": "Cat-World website favorites toys",
      
      "tags": ["updated", "catlover", "best cat site ever"]

      }




    __Delete Bookmark__
    
    (same as notes above)
     (in postman--- new HTTP request)
     
    DELETE  /api/bookmarks/:bookmarkId
    
    Authorization: bearer <jwt token>

    --------------------------------------------
    
  __Data Models__
  
  _User Model_
  
  {
   username: String (required, unique),
   
   email: String (required, unique, validated),
   
   password: String (hashed, required if no githubId),
   
   githubId: String (unique, for OAuth users),
   
   createdAt: Date.now
   
   }


   _Note Model_
   
   {
   
    title: String (required),
    
    content: String (required),
    
    createdAt: Date.now,
    
    user: ObjectId (reference to User, required)
    
    }


    _Bookmark Model_
    
    {
    
      title: String (required),
      
      url: String (required),
      
      description: String (optional),
      
      tags:[String] (array of tags),
      
      createdAt: Date.now,
      
      user: ObjectId(reference to User,required)
      
    }

    --------------------------------------------------

    __Authentication & Security__

    _JWT Token Authentication_
    
    * all protected routes require a valid JWT token.
    
    * token must be included in the Authorization header as a Bearer <token>.
    
    * tokens expire after 2 hrs.
    
    * users can only access their own resources
    

    _Password Security_
    
    * passwords are hashed using bcrypt with 10 salt rounds
    
    * min passwords length: 5 characters.
    
    * password validation occurs on user registration and login

    _Authorization_
    * users can only view, edit, and delete their own notes and bookmarks
    * all routes check the resource ownership before allowing any operations.
    * returns a `403 Forbidden` for unauthorized access attempts.

    -------------------------------------------------------------------------
    
  __Testing with Postman__
  
  * authentication flow
  * 
    - register user or Login user to get JWT token
      
    - copy the token from the successful response.
      
    - add authorization header to all requests after: authorization: Bearer <token>.
   
      
  * testing notes
    
    - create notes with POST /api/notes
      
    - retrieve all  notes with GET /api/notes
      
    - update specific note with PUT /api/notes/:id
      
    - delete note with DELETE /api/notes/:id


  * testing bookmarks
    
    - create bookmarks with POST  /api/bookmarks
      
    - retrieve all bookmarks with GET /api/bookmarks
      
    - update specific bookmark with PUT /api/bookmarks/:id
      
    - delete bookmark with DELETE /api/bookmarks/:id


  * security testing
    
    - test accessing endpoints without the Authorization header ( this is supposed to return 401)
      
    - test accessing another user's resources (this is supposed to return 403)
      
    - test with invalid/expired tokens (this is supposed to return 401)
      
   
__Sample data for testing__

*Sample Note
{

 "title": "Life is Good",
 
 "content": "Life is good if you are in the present moment"

 }


 *Sample bookmark
 
 {
 
  "title": "How to Write",
  
  "url": "[wikihow - Write ](https://www.wikihow.com/Write),
  
  "description": "learn how to write--more then a hobby",
  
  "tags": ["learn", "write", "wikihow", "self-help"]
  
  }

-------------------------------------------------------------

__Error Handling__
_Common HTTP Status Codes_

* 200 - Success
* 201 - created ...successful POST requests
* 400 - bad request --validation errors and or missing fields.
* 401 - unauthorized --missing/invalid token.
* 403 - forbidden -- accessing another user's resources.
* 404 - not found-- resource does  not exist.
* 500 - internal server error

_Example error responses_
* 401 - unauthorized
   {
     "message": "User must be logged on to do this."
  }

*403 - forbidden 
{
  "message": "user is not authorized to update this note."

}

*404 not found
{
  "message": "no note found by this id"
}


  ------------------------------------------------------------------------------

  __Development Scripts__
  
  `npm run dev` -- starts the development server with nodemon

  _Dependencies_
  *Production dependencies
  - Express: web framework
  - Mongoose: MongoDB ODM
  - bcrypt: Password hashing and salting
  - jsonwebtoken: JWT token handling
  - passport: Authentication middleware
  - passport-github2: github OAuth technique
  - dotenv: environment variable management

  *Development Dependencies
  - nodemon: development server with automatic reload

----------------------------------------------------------------------------------------

__Security Practices Implemented__

* password hashing: all passwords aer hashed using bcrypt
* JWT tokens: stateless authenication with timed expiration
* input validation: mongoose schema validation.
* authorization checks: ownership verification of resources.
* environment variables: secret or sensitive data stored in .env file
* CORS considerations: configured for API use
------------------------------------------------------------------------------------    

__References:__

* __Backend Framework:__ Express.js - Web framework for Node.js [Express Documentation](https://expressjs.com/)

 
* __Database:__ MongoDB - NoSQL document database [MongoDB Documentation](https://docs.mongodb.com/), -MongoDB object modeling for Node.js - [Mongoose Documentation](https://mongoosejs.com/docs/)


* __Authentication & Security:__
  
  -bcrypt - password hashing library  [bcrypt npm package](https://www.npmjs.com/package/bcrypt)
  
  -jsonwebtoken - JWT implementation for Node.js   [JWT Documentation](https://jwt.io/)
  
  -passport - authentication [Passport Documentation](http://www.passportjs.org/)
  
  -passport-github2 - GitHub OAuth 2.0 strategy [passport-github2 npm](https://www.npmjs.com/package/passport-github2)


* __Middleware & Configuration:__

  -cors - cross-origin resource sharing middleware [CORS Documentation](https://www.npmjs.com/package/cors)
  
  -dotenv - environment variable management [dotenv Documentation](https://www.npmjs.com/package/dotenv)


* __Development Tools:__

 -nodemon - development server with auto-restart [nodemon Documentation](https://nodemon.io/)



 __External Services__

 * __Database Hosting:__
 
  - MongoDB Atlas - cloud MongoDB hosting service [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)


 * __OAuth Provider__: 
 
  -GitHub OAuth Apps - OAuth 2.0 authentication [GitHub OAuth Documentation](https://docs.github.com/en/apps/oauth-apps)


__Learning Resources__

* __RESTful api design:__ [REST API Design Guide](https://restfulapi.net/) , [HTTP Status Codes](https://httpstatuses.com/)

* __MongoDB & Mongoose:__ [Mongoose Schema Guide](https://mongoosejs.com/docs/guide.html) , [MongoDB CRUD Operations](https://docs.mongodb.com/manual/crud/)

* __Password Security:__ [bcrypt Explained](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/) , [Password Hashing Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)


__Testing Tools__

* __Postman:__ API testing platform: [Postman Documentation](https://learning.postman.com/)


__API Standards__

* RESTful APIs: arhitectural style for web services.

* JSON: data interchange format.

* HTTP methods: POST, GET, PUT, DELETE

* HTTP status codes: 200, 201, 400, 401 , 403 , 404 , 500

--------------------------------------------------------------------------------------------------
__Acknowledgements:__ Thank you to my instructors: Colton Wright and Abraham Tavarez and my fellow classmates in 2025-RT-23 cohort for helping me with this project -- your guidance
is invaluable. 
           
 
  

  


--------------------------------------------------------------------------------------------------------------




mod 14 lab 2 -
__Notes API__

A secure RESTful API for managing personal notes with user authentication and authorization. Users can only access and manage their own notes.

_Features_
*User registration and authenication
*JWT-based authorization
*Full Create Read Update Delete--operations for notes
*User-specific note access (security)
*Input validation and error handling

_Install_
*Clone the repo
`git clone <repo-url>`
`cd notes-api`

*install dependencies 
npm i express dotenv mongoose jsonwebtoken bcrypt nodemon

*create set up env variables---create a `.env` file in root directory:
`MONO_URI=your_mongodb_connection_string`
`JWT_SECRET=your_jwt_secret_key`
`PORT=3000`

*start server
`npm run dev`

----------------------------------------------------------------------------

_API Endpoints_
User Authenication
method: POST
endpoint: /api/users/register
description: create a new user account
auth required: no

method: POST
endpoint: /api/users/login
desciption: login user and get JWT token
auth requried: no


========================================================
Notes(all require authenication)
method: GET
endpoint: /api/notes
desciption: get all user's notes
auth required: Yes

method: GET
endpoint: /api/notes/:id 
description: get specific note (if it is owned)
auth required: Yes

method: POST
endpoint: /api/notes
description: create a new note
auth required: yes

method: PUT
endpoint: /api/notes/:id 
description: update note (if owned)
auth required: yes

method: DELETE
endpoint: /api/notes/:id 
description: delete note (if owner)
auth required: yes 

------------------------------------

User Schema

{
   username: String (required, unique),
   
   email: String (required, unique),
   
   password: String (required, hashed)
   
}


Note Schema

{
  title: String (required),
  
  content: String (required),
  
  user: ObjectId (required, references User),
  
  createdAt: Date (default: now)
  
}

--------------------------------------------------

_Authentication_
This API uses JWT(JSON Web Tokens) for authentication. 
Include the token in the Authorization header: in postman 
`authorization: Bearer your_jwt_token_here`  The simple one "space" between `Bearer` and `your_jwt_token_here` is extremely important to have

-----------------------------
_Example_
"Register a User"
new HTTP request in Postman---choose `POST` and with localhost:3000 or similar use this endpoint: `/api/users/register` then choose content type: `application` then `body` then `raw` thenin dropdown that first says
"text" choose instead `JSON`--then in the empty body area type:  

`{

    "username": "johndoe",
    
    "email": "john@example.com",
    
    "password": "password123"
    
}

this should give back something like this:

{

  "token": "eyJhbGc10JIUzINiIsInR5cCI6kpXVJ9--etc"
  
  "user": 
  
  
  {
  
    "username": "johndoe",
    
    "email": "john@example.com",
    
    "_id": "..."
    
}
}

--------------------------------------------
"Login User"
short hand version
POST  /api/users/login
content-type: application/json

{

  "email": "john@example.com",
  
  "passoword": "password123"
  
}

---------------------------------------
"Create a Note (Authenticated)"
POST  /api/notes
Content-type: application/json
authorization: bearer your_jwt_token_here

{

  "title": "My First Note",
  
  "content": "This is the content of my first note."
  
}

--------------------------------------------------------------------

"Get ALL user's Notes"
GET /api/notes
authorization: Bearer your_jwt_token_here

---------------------------------------------------------------

"Update a Note"
PUT  /api/notes/note_id_here
content-type: application/json
authorization: Bearer your_jwt_token_here

{

  "title": "Updated note title",
  
  "content": "updated note content"
  
}

-----------------------------------------------------------------
"Delete a Note"
DELETE  /api/notes/note_id_here
authorization: Bearer your_jwt_token_here

-----------------------------------------------
_Security Features_

 "authorization rules"
 
 *users can only view, edit, and delete their own notes"; * attempting to access another user's notes returns `403 Forbidden`; * all endpoints require valid JWT authentication; * passwords are hashed using bcrypt


"error responses"

*`401 unauthorized` - missing or invalid JWT token; * `403 forbidden` - user not authorized to access the resource; *`404 no found` - note does not exist; `400 bad request` - validation errors

-------------------------------------------------------------------------------------------------------------------------------------------------------
__Project Structure__

<img width="145" height="324" alt="image" src="https://github.com/user-attachments/assets/af225e62-0eab-40a2-b2d4-bed081f0d1b4" />

-------------------------------------------------------------------------------------------------------------------------------------------------------------

__Tech Used__

*Node.js --runtime environment

*Express.js - web framework

*MongoDB - database

*Mongoose - MongoDB object modeling

*JWT - authentication tokens

*bcrypt - password hashing --- salting too

*dotenv - environment variable management

-------------------------------------------

_Testing Workflow_
1. Register 2 different users to test authorization
2. login and save JWT tokens for each user
3. create notes with each user's token
4. verify isolation - user A cannot access user B's notes
5. test CRUD operations with correct or proper authorization
6. test error cases--invalid tokens, unauthorized access, etc.

-----------------------------------------------------------------------

_Error Handling_
The API includes:
* 200 - success (GET,PUT)
* 201 - created (POST)
* 400 - bad request (validation errors)
* 401 - unauthorized (authentication required)
* 403 - forbidden (not authorized for this resource) 
* 404 - resource not found
* 500 - internal server error

______________________________________________________________







 


