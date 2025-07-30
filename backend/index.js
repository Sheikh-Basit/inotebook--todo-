require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

const app = express();
// Database function run
connectToMongo();

app.use(cors());
// the purpose for using this middilware (express.json()) for using the body content useing APIs
app.use(express.json());

// Handle Routes
app.use('/auth', require('./routes/auth'))
app.use('/note', require('./routes/note'))


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})

