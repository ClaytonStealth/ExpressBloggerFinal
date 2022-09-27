const validateBlogData = (blogInfo) => {



    if (blogInfo.title === undefined || typeof (blogInfo.title) !== "string" || blogInfo.title.length > 30) {

        return {
            isValid: false,
            message: "title is required and must be a string and be less than 30 characters"
        }
    }


    if (blogInfo.text === undefined || typeof (blogInfo.text) !== "string") {


        return {
            isValid: false,
            message: "text is required and must be a string and be less than 40 characters"
        }
    }

    if (blogInfo.author === undefined || typeof (blogInfo.author) !== "string") {


        return {
            isValid: false,
            message: "author is required and must be a string and be less than 40 characters"
        }
    }

    if (
        blogInfo.category === undefined ||
        Array.isArray(blogInfo.category) === false ||
        blogInfo.category.length < 1
    ) {
        return {
            isValid: false,
            message: "Category must exist, must be an array, and must have items within it"
        }
    }

    if (blogInfo.category.length > 10) {
        return {
            isValid: false,
            message: "Category cannot have more than 10 items"
        }
    }

    const nonStringCategory = blogInfo.category.filter((category) => {


        if (typeof (category) !== 'string') {

            return true
        } else {

            return false
        }
    })


    if (nonStringCategory.length > 0) {
        return {
            isValid: false,
            message: "categories must be strings ONLY"
        }
    }

    const validCategories = [
        "Lorem",
        "ipsum",
        "dolor",
        "sit",
        "amet"
    ]

    let isArrayValid = true

    blogInfo.category.forEach((blogCategory) => {
        if (validCategories.includes(blogCategory) === false) {
            isArrayValid = false;
        }
    })

    if (isArrayValid === false) {
        return {
            isValid: false,
            message: "items in category must be one of the following: Lorem,ipsum,dolor,sit,amet"

        }
    }

    return {
        isValid: true
    }

}


module.exports = {
    validateBlogData
}