export const preloader = () => {
    document.getElementById("successMessage").innerHTML = "processing..."
}
export const preloaderCheckout = () => {
    document.getElementById("checkout").innerHTML = "Checkout..."
}
export const preloaderCheckouts = () => {
    document.getElementById("checkouts").innerHTML = "Checkout..."
}
export const success = (message, redirect, successMessage) => {
    document.getElementById("successMessage").innerHTML = successMessage
    document.getElementById("successMessage").style.backgroundColor = "orange"
    document.getElementById("successMessage").style.color = "black"
    document.getElementById("infoMessage").style.display = 'block'
    document.getElementById("infoMessage").style.color = "#ff8a00"
    document.getElementById("infoMessage").style.backgroundColor = '#ffb85c3c'
    document.getElementById("infoMessage").innerText = message
    setTimeout(() => {
        document.getElementById("infoMessage").style.display = 'none'
    }, 2000);
    setTimeout(() => {
        window.location.pathname = redirect
    }, 2000);
}
export const success1 = (message, successMessage) => {
    document.getElementById("successMessage").innerHTML = successMessage
    document.getElementById("successMessage").style.backgroundColor = "orange"
    document.getElementById("successMessage").style.color = "black"
    document.getElementById("infoMessage").style.display = 'block'
    document.getElementById("infoMessage").style.color = "#ff8a00"
    document.getElementById("infoMessage").style.backgroundColor = '#ffb85c3c'
    document.getElementById("infoMessage").innerText = message
    setTimeout(() => {
        document.getElementById("infoMessage").style.display = 'none'
    }, 4000);
}
export const fail = (error) => {
    document.getElementById("successMessage").innerHTML = "Something went wrong"
    document.getElementById("successMessage").style.backgroundColor = "red"
    document.getElementById("successMessage").style.color = "white"
    document.getElementById("errorMessage").innerText = error
    document.getElementById("errorMessage").style.display = 'block'
    document.getElementById("errorMessage").style.color = "red"
    document.getElementById("errorMessage").style.backgroundColor = '#ff353535'
    setTimeout(() => {
        document.getElementById("errorMessage").style.display = 'none'
    }, 6000);
    setTimeout(() => {
        document.getElementById("successMessage").innerHTML = "Unsuccessful"
    }, 2000);
}
export const catch_errors = (error) => {
    if (error.response) {
        if (error.response.status === 403) {
            console.log(error.response.data.message);
            fail(error.response.data.message)
        } else if (error.response.status === 500) {
            console.log(error.response.data.message);
            fail(error.response.data.message)
        } else if (error.response.status === 404) {
            console.log(error.response.data.message);
            fail(error.response.data.message)
        }
        // The request was made and the server responded with a status code
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        fail(error.response.data.message)
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        fail(error.response.data.message)
        console.log('Error', error.message);
    }
}