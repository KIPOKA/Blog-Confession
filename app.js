const express = require('express');
const { title } = require('process');
const morgan = require('morgan');


//express app
const app= express();
//register view engine
app.set('view engine', 'ejs');



app.listen(3000);

//create a middleware

app.use(morgan('dev'));


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