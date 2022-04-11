//importing
import express from 'express';
import mongoose from 'mongoose';
import Pusher from 'pusher'
import cors from 'cors';
import Messages from './dbMessages';

//app config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "",
    key: "",
    secret: "",
    cluster: "",
    useTLS: true
});

//middlewares
app.use(express.json())
/*app.use(cors())*/

 //similar functionality is provided by the Cors module
    app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next();
}) //this allows the request to come from any endpoint

//db config
const connection_url = ''
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open', () => {
    console.log('DB connected!')

    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()

    changeStream.on('change', (change) => {
        console.log(change)

        //whenever a change is made in the database, the change is pushed into the frontend
        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.name,
                    message: messageDetails.message
                })
        } else {
            console.log('error triggering pusher')
        }

    })
})

//

//api routes
app.get('/', (req,res)=> res.status(200).send('hello world'))

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req,res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

//listener
app.listen(port, ()=>console.log(`listening on localhost: ${port}`))
