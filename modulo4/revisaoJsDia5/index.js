const objTest = { id: undefined, name: undefined, email: "astrodev@gmail.com" } 

const objTest2 = { id: 2, name: "Samu", email: "astrodev@gmail.com" } 

const objTest3 = { id: 3, name: "Astrodev", email: undefined } 


const valid = (obj) => {

    let error = []

    Object.keys(obj).forEach((property) => {

        if (obj[property] === undefined) {
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

console.log(valid(objTest2))

console.log(valid(objTest3))


// Object.keys(objTest).forEach((prop) => {
//     console.log(prop + objTest[prop])
//     if (objTest[prop] === undefined) {
//         error.push(prop)
//     }
// })

// console.log(error)