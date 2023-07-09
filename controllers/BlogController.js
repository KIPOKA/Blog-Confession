//blog-index, blog-details, blog-create_post, blog-delete
const Blog = require('../models/blog');


const blog_index =(req, res) =>{
    Blog.find().sort({createAt: -1})
    .then((result)=>{
        res.render('blogs/index',{title:'All Confessions', blogs : result});
    })
    .catch((err) =>{
        console.log(err);
    });
}

const blog_details=(req, res) =>{
    const id = req.params.id;

    if (id === 'create') {
        // Handle the special case of ID being "create"
        // Add your custom logic here
        res.render('blogs/create', { title: 'Create a new confession' });
        return;
    }

    Blog.findById(id)
        .then(result => {
            if (result) {
                res.render('blogs/details', { blog: result, title: 'Blog Details' });
            } else {
                res.status(404).render('404', { title: 'Blog not found' });
            }
        })
        .catch(err => { 
            res.status(404).render('404', { title: 'Blog not found' });
        });
}
const blog_create_get=(req, res) =>{
    res.render('blogs/create', {title:"Create a new confession"});
}

const blog_create_post=(req, res) =>{
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=>{
            res.redirect('/blogs');
    })
    .catch((err) =>{
        console.log(err);
    });
}
const blog_delete_post=(req, res) =>{
    const id = req.params.id;
    
    if (id === 'create') {
        // Handle the special case of deleting a blog with ID "create"
        // Add your custom logic here
        res.render('blogs/create', { title: 'Create a new confession' });
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
}

module.exports= {
    blog_index, 
    blog_details, 
    blog_create_get, 
    blog_create_post, 
    blog_delete_post
}