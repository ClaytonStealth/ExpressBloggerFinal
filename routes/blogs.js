const {
    uuid
} = require('uuidv4');
var express = require('express');
var router = express.Router();

const {
    db
} = require("../mongo")

router.get('/get-one-example', async function (req, res, next) {
    try {
        const blogPost = await db().collection("posts").findOne({
            id: {
                $exists: true
            }
        })
        res.json({
            success: true,
            post: blogPost
        })
    } catch (err) {
        //In the catch block, we always want to do 2 things: console.log the error and respond with an error object
        console.log(err.name)
        res.json({
            success: false,
            error: err.toString()
        })
    }
});

router.get('/get-one/:id', async function (req, res, next) {
    try {
        const blogId = req.params.id

        const blogPost = await db().collection("posts").findOne({
            id: blogId
        })
        res.json({
            success: true,
            post: blogPost
        })
    } catch (err) {
        //In the catch block, we always want to do 2 things: console.log the error and respond with an error object
        console.log(err.name)
        res.json({
            success: false,
            error: err.toString()
        })
    }
});

router.post('/create-one', async function (req, res, next) {
    try {
        const title = req.body.title
        const text = req.body.text
        const author = req.body.author
        const email = req.body.email
        const categories = req.body.categories
        const starRating = req.body.starRating
        const id = uuid()

        blogData = {
            title,
            text,
            author,
            email,
            categories,
            starRating,
            createdAt: new Date(),
            lastModified: new Date(),
            id: id
        }
        const blogPost = await db().collection("posts").insert({
            blogData
        })
        res.json({
            success: true,
            post: blogPost
        })
    } catch (err) {
        //In the catch block, we always want to do 2 things: console.log the error and respond with an error object
        console.log(err.name)
        res.json({
            success: false,
            error: err.toString()
        })
    }
});

module.exports = router;
// try {} catch () {}