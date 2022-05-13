const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const tankRouter = require('./routers/tank')
const history = require('connect-history-api-fallback');
const cors = require('cors')

const app = express()

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(userRouter)
app.use(tankRouter) 

if(process.env.NODE_ENV === 'production') {
    app.use(history());
    app.use(express.static(__dirname + '/public/'));
    app.get('/', function(req, res) {
     res.sendFile(__dirname+'/public/index.html');
    })
}

module.exports = app