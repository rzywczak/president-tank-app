# president-tank-app
Application allows you to register / log in and manage tanks (add, edit and delete).

## How to run an application locally
1. First download app or gitclone then in server and client folder type: 'npm i'
2. Client folder - create an .env file in the root folder and add 
'VITE_APP_API_URL=http://localhost:5000/api'
3. Server folder - create a dev.env file in the config folder and add 
'PORT=5000'
'MONGODB_URL= link to mongodb connection'
'JWT_SECRET=secretkey'
4. In the client folder in the terminal type: 'npm run dev'
5. In the server folder in the terminal type 'npm run dev'
