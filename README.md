__Notes API_ 
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
