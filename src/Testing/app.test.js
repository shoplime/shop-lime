import {validateEmail, validatePassword, handleReset, validatePayment} from './AuthLogic'

describe('Valid emails', () => {

    test('Should be true', () => {
        let result = validateEmail('m.a@yahoo.com');
        expect(result).toBeTruthy();
    })
    test('Should be false', () => {
        let result = validateEmail('michael');
        expect(result).toBeFalsy();
    })
    test('Should be false', () => {
        let result = validateEmail('joe@gmail');
        expect(result).toBeFalsy();
    })
})

describe('Valid Password', () => {

    test('Please enter a password', () => {
        let result = validatePassword('');
        expect(result).toEqual({ "bool": false, "message": "Please enter a password" });
    })
    test('Password length needs to be at least 7 characters', () => {
        let result = validatePassword('$');
        expect(result).toEqual({ "bool": false, "message": "Password length needs to be at least 7 characters" });
    })
    
})

describe('Handle Reset', () => {
    
    test('Should be true', () => {
        let result = handleReset(3);
        expect(result).toBeTruthy();
    })
    test('Should be false', () => {
        let result = handleReset(0);
        expect(result).toBeFalsy();
    })
})

describe('Valid Payment', () => {
    
    test('Should be true', () => {
        let result = validatePayment('4242424242424242');
        expect(result).toBeTruthy();
    })
    test('Should be false', () => {
        let result = validatePayment('mynumber');
        expect(result).toBeFalsy();
    })
    test('Should be false', () => {
        let result = validatePayment(1234567890);
        expect(result).toBeFalsy();
    })
})
