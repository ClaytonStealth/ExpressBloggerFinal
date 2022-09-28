const validateBlogInfo = (blogInfo) => {


    //checking the title to see if undefined || a string || less than 30 characters in length
    if (blogInfo.title === undefined || typeof (blogInfo.title) !== "string" || blogInfo.title.length > 30) {

        return {
            isValid: false,
            message: "title is required and must be a string and be less than 30 characters"
        }
    }


    if (blogInfo.text === undefined || typeof (blogInfo.text) !== "string") {


        return {
            isValid: false,
            message: "text is required and must be a string"
        }
    }
    if (blogInfo.email !== undefined) {
        if (typeof (blogInfo.email) !== "string") {
            return {
                isValid: false,
                message: "Email must be a string"
            }
        }
        if (blogInfo.email.includes("@") === false) {
            return {
                isValid: false,
                message: "email must contain @ to be valid"

            }
        }
    }
    //seeing inf blogInfo.email includes @ if thats false. return false


    if (blogInfo.author === undefined || typeof (blogInfo.author) !== "string") {


        return {
            isValid: false,
            message: "author is required and must be a string"
        }
    }
    if (blogInfo.starRating !== undefined) {
        if (blogInfo.starRating < 1 || blogInfo.starRating > 10) {
            return {
                isValid: false,
                message: "starRating must be between 1 and 10"
            }
        }
    }
    //checking bloginfo categories if undefined|| is not an array||length is less than 1 (0)
    // console.log(blogInfo.categories === undefined)
    // console.log(Array.isArray(blogInfo.categories) === false)

    if (blogInfo.categories === undefined ||
        Array.isArray(blogInfo.categories) === false ||
        blogInfo.categories.length < 1) {
        return {
            isValid: false,
            message: "Category must exist, must be an array, and must have items within it"
        }
    }
    //filtering categories to look for strings. and putting it into nonStringCategories
    const nonStringCategories = blogInfo.categories.filter((categories) => {
        if (typeof (categories) !== 'string') {

            return true

        } else {

            return false
        }
    })

    if (nonStringCategories.length > 0) {
        return {
            isValid: false,
            message: "categories must be strings ONLY"
        }
    }


    return {
        isValid: true
    }

}


module.exports = {
    validateBlogInfo
}