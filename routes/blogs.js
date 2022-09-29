const {
    uuid
} = require('uuidv4');
var express = require('express');
var router = express.Router();

const {
    db
} = require("../mongo")
var {
    validateBlogInfo
} = require("../validation/blogs")

router.get('/get-one-example', async (req, res, next) => {
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
        console.log(err)
        res.json({
            success: false,
            error: err.toString()
        })
    }
});

router.get('/get-one/:id', async (req, res, next) => {
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
        console.log(err)
        res.json({
            success: false,
            error: err.toString()
        })
    }
});

router.post('/create-one', async (req, res, next) => {
    try {
        const title = req.body.title
        const text = req.body.text
        const author = req.body.author
        const email = req.body.email
        const categories = req.body.categories
        const starRating = req.body.starRating
        const id = uuid()


        blogInfo = {
            title,
            text,
            author,
            email,
            categories,
            starRating,
            id: id,
            createdAt: new Date(),
            lastModified: new Date()
        }
        const blogInfoCheck = validateBlogInfo(blogInfo)
        if (blogInfoCheck.isValid === false) {
            res.json({
                success: false,
                message: blogInfoCheck.message
            })
            return;
        }

        const blogPost = await db().collection("posts").insertOne(blogInfo)
        res.json({
            success: true,
            post: blogPost
        })
    } catch (err) {
        //In the catch block, we always want to do 2 things: console.log the error and respond with an error object
        console.log(err)
        res.json({
            success: false,
            error: err.toString()
        })
    }
});

router.put('/update-one/:id', async (req, res, next) => {
    try {
        const blogId = req.params.id
        const title = req.body.title
        const text = req.body.text
        const author = req.body.author
        const email = req.body.email
        const categories = req.body.categories
        const starRating = req.body.starRating
        const lastModified = new Date()
        const blogInfo = {
            // title,
            // text,
            // author,
            // email,
            // categories,
            // starRating,
            lastModified: new Date()
        }
        if (starRating !== undefined) {
            if (starRating >= 1 && starRating <= 10) {
                blogInfo.starRating = starRating
            }
        }
        if (email !== undefined) {
            if (email.includes("@") === true) {
                blogInfo.email = email
            }
        }
        if (title !== undefined) {
            if (typeof (title) === "string" && title.length < 30) {
                blogInfo.title = title
            }
        }
        if (text !== undefined) {
            if (typeof (text) === "string") {
                blogInfo.text = text
            }
        }
        if (author !== undefined) {
            if (typeof (author) === "string") {
                blogInfo.author = author
            }
        }
        if (categories !== undefined && Array.isArray(categories) === true && categories.length > 0) {
            const invalidCat = categories.filter((category) => {
                if (typeof (category) !== "string") {
                    return true;
                } else {
                    return false;
                }
            })
            if (invalidCat.length === 0) {
                blogInfo.categories = categories
            }

        }

        const blogPost = await db().collection("posts").update({
            id: blogId
        }, {
            $set: blogInfo
        })
        res.json({
            success: true,
            updateFields: blogInfo
        })
    } catch (err) {
        //In the catch block, we always want to do 2 things: console.log the error and respond with an error object
        console.log(err)
        res.json({
            success: false,
            error: err.toString()
        })
    }
});

router.delete('/delete-one/:id', async (req, res, next) => {
    try {
        const blogId = req.params.id

        const blogPost = await db().collection("posts").deleteOne({
            id: blogId
        })
        res.json({
            success: true
        })
    } catch (err) {
        //In the catch block, we always want to do 2 things: console.log the error and respond with an error object
        console.log(err)
        res.json({
            success: false,
            error: err.toString()
        })
    }
});

module.exports = router;
// try {} catch () {}