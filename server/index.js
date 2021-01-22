const express = require('express');
const routes = require('./api');
const mongoose = require('mongoose');
const volleyball = require('volleyball');
const cors = require('cors');
const middlewares = require('./middlewares');

const app = express();

require('dotenv').config();

app.use(volleyball);
app.use(cors({
    origin: process.env.FRONT_END_HOST,
}))

mongoose.connect(
    process.env.DATABASE_CONNECTION, 
    {  useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true, 
        useFindAndModify: false 
    }
)
mongoose.Promise = global.Promise;

app.use(express.json());

app.use('/api', routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(process.env.PORT, function(){
    console.log('now listening for requests');
});
