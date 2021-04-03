const express = require('express');

const bodyParser= require('body-parser');

const bcrypt = require('bcrypt-nodejs');

const app = express();

const cors = require('cors');

const knex = require('knex'); //dtabase;

const register =  require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const PORT = process.env.PORT || 3000;


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smart-face'
  }
});



app.use(bodyParser.json());
app.use(cors())





app.listen(PORT, () => {
    console.log(`this app is running ${ PORT }`);
})
app.post('/signin', (req,res) => { signin.handlesignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister (req, res, db, bcrypt) })
app.get('/profile/:id', (req,res) => { profile.handleProfile (req, res, db) })
app.put('/image', (req, res) => { image.handleImage (req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall (req, res)})

//bcrypt.hash("bacon", null,)



/*

/ --> res = this is working

/signin --> POST = success/fail
/register --> POST = suser
/profile/:userId --> GET = user
/image --> PUT  --> user



*/