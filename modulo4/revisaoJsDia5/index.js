const objTest = { id: 2, name: "astrodev", email: "astrodev@gmail.com" } 

const valid = (obj) => {

    let error = []

    Object.keys(obj).forEach((property) => {

        if (objTest[property] === undefined) {
            error.push(property)
            
        }
    })

    if (error.length === 0) {
        
        return {
            isError: false,
            errors: error
        }
    }
    else {
        return {

            isError: true,
            errors: error
        }
    }

}

console.log(valid(objTest))


// Object.keys(objTest).forEach((prop) => {
//     console.log(prop + objTest[prop])
//     if (objTest[prop] === undefined) {
//         error.push(prop)
//     }
// })

// console.log(error)