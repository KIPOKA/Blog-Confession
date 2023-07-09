//require express
const express = require('express');
const blogController = require('../controllers/BlogController');



//create a new express router
const router = express.Router(); 
//Post request or to create a new blog
router.post('/blogs', blogController.blog_create_post) 
//display a blog with a partiular id
router.get('/blogs/:id', blogController.blog_details); 
//delete a blog
router.delete('/blogs/:id', blogController.blog_delete_post);
router.get('/create', blogController.blog_create_get)
 //blog routes 
router.get('/blogs', blogController.blog_index);
module.exports = router;