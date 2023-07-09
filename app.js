const express = require('express');
const { title } = require('process');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/BlogRoutes')

 
//express app
const app= express();
//register view engine
app.set('view engine', 'ejs');

console.log("Before connection");
//connectt to mongoDB 
const dbURI = 'mongodb+srv://netninja:test1234@cluster-confession.j2cgo9o.mongodb.net/nodetuts?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => app.listen(3000))
        .catch((err) =>console.log(err));

console.log("After connection");

//create a middleware 
//middleware of static files which cannot be show on the browser
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));

//mongoose and mongo sendbox routes
app.use( blogRoutes);
//listening for request home
app.get('/', (req, res) =>{
    res.redirect('/blogs');
    
});
//mongoose and mongo sendbox routes

//listening for request about
app.get('/about', (req, res) =>{
    res.render('about', {title:"About"});
});

  
//redirects
app.get('/blogs/create', (req, res) =>{
    res.render('create', {title:"Create a new confession"});
});

//handle 404 page
app.use((req, res)=>{
    res.status(404).render('404', {title:"404"});

})

