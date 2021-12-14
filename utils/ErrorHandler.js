const handleError = (err) => {
    console.log(err.message, err.code);
    const error = {email:'', password:''};

    if(err.code === 11000) {
       return error.email = 'This email is already exist';
    }

    if(message === 'Incorrect email') {
        error.email = 'This email is incorrect';
    }
    if(message === 'Incorrect password') {
        error.password = 'This password is incorrect';
    }

    if(err.message.includes('User validation failed')) {
        Object.values(err.message).forEach(({properties}) => {
            error[properties.path] = properties.message;
        })
    }
    return error;
}

module.exports = { handleError };