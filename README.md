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

 


