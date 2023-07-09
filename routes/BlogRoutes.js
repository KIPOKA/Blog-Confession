//require express
const express = require('express');

const Blog = require('../models/blog');

//create a new express router
const router = express.Router();




router.get('/all-blogs', (req, res)=>{
    Blog.find()
        .then((result)=>{
            res.send(result);
        })
        .catch((err) =>{
            console.log(err);
        });

})
router.get('/single-blog', (req, res)=>{
    Blog.findById('64aa799996b97f331156c7d2')
        .then((result)=>{
            res.send(result);
        })
        .catch((err) =>{
            console.log(err);
        });

}) 

//Post request or to create a new blog
router.post('/blogs', (req, res) =>{
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=>{
            res.redirect('/blogs');
    })
    .catch((err) =>{
        console.log(err);
    });

})

//display a blog with a partiular id
router.get('/blogs/:id', (req, res) => {
    const id = req.params.id;

    if (id === 'create') {
        // Handle the special case of ID being "create"
        // Add your custom logic here
        res.render('create', { title: 'Create a new confession' });
        return;
    }

    Blog.findById(id)
        .then(result => {
            if (result) {
                res.render('details', { blog: result, title: 'Blog Details' });
            } else {
                res.status(404).render('404', { title: 'Blog not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).render('error', { title: 'Internal Server Error' });
        });
});


//delete a blog
router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    if (id === 'create') {
        // Handle the special case of deleting a blog with ID "create"
        // Add your custom logic here
        res.render('create', { title: 'Create a new confession' });
        return;
    }

    Blog.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                res.json({ redirect: '/blogs' });
            } else {
                res.status(404).json({ error: 'Blog not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});




//blog routes 
router.get('/blogs', (req, res) =>{
    Blog.find().sort({createAt: -1})
    .then((result)=>{
        res.render('index',{title:'AllConfessions', blogs : result});
    })
    .catch((err) =>{
        console.log(err);
    });
});

module.exports = router;