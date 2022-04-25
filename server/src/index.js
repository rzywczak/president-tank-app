const express = require('express')
require('./db/mongoose')
const history = require('connect-history-api-fallback');
const userRouter = require('./routers/user')
const tankRouter = require('./routers/tank')
const cors = require('cors')


const app = express()
const port = process.env.PORT

app.use(cors())
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

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})