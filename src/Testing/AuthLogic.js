module.exports = {
    
    //MIKE'S LOGIC
    validateEmail: (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return expression.test(String(email).toLowerCase())
    },
    validatePassword: (password) => {
        const returnObj = { bool: false, message: ''}
        if (password.length === 0){
            returnObj.message = 'Please enter a password'
            return returnObj
        } else if (password.length >= 100){
            returnObj.message = 'Password length can not exceed 100 characters'
            return returnObj
        } else if (password.length <= 6){
            returnObj.message = 'Password length needs to be at least 7 characters'
            return returnObj
        }  
        returnObj.bool = true
        return returnObj
    },

    // TYLER'S LOGIC

    handleReset: (activeStep) => {
        if (activeStep != 0){
            return true
        }
        else{
            return false
        }
    },

    validatePayment: (number) => {
        if (number.length != 16){
            return false
        }
        else{
            return true
        }
    }
    //JUSTIN'S LOGIC
}
