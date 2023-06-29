const express = require('express');
const { title } = require('process');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Confession = require('./models/confession');

 
//express app
const app= express();
//register view engine
app.set('view engine', 'ejs');

console.log("Before connection");
//connectt to mongoDB
const dbURI ='mongodb+srv://Test:Test@1234@cluster-confession.j2cgo9o.mongodb.net/confession?retryWrites=true&w=majority';
// const dbURI = 'mongodb+srv://Test%3ATest%401234@cluster-confession.j2cgo9o.mongodb.net/confession?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) =>console.log(err));

console.log("After connection");

//create a middleware

app.use(morgan('dev'));

//mongoose and mongo sendbox routes
app.get('/add-confession', (req, res)=>{
    const confession = new Confession({
        title: 'New confession',
        snippet: 'about the new confession',
        body: "Desciption of the new confession"
    })

    confession.save()
    .then((result)=>{
            res.send(result);
    })
    .catch((err) =>{
        console.log(err);
    });
    
})


//middleware of static files which cannot be show on the browser
app.use(express.static('public'));
//listening for request home
app.get('/', (req, res) =>{
    const blogs=[
        {title: "Break up", snippet:'Long distance'}, 
        {title: "Cheating ", snippet:'Long distance end up in cheating'},
        {title: "Congolese man ", snippet:'Give money instead of Love'}];
            res.render('index', {title:"Home", blogs});
});
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