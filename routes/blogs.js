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

module.exports = router;
// try {} catch () {}