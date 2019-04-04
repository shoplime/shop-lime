import {validateEmail, validatePassword, handleReset, validatePayment, validatePrice, validateWordFilter} from './AuthLogic'

describe('Valid emails', () => {

    test('Should be true', () => {
        let result = validateEmail('m.a@yahoo.com');
        expect(result).toBeTruthy();
    })
    test('Should be false if no @', () => {
        let result = validateEmail('michael');
        expect(result).toBeFalsy();
    })
    test('Should be false if no .com, etc', () => {
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

describe('Format Price from Cents', () => {
    test('Should round up to 0 decimal places', () => {
        let result = validatePrice(12365)
        expect(result).toEqual('124')
    })
    test('Should keep at 0 decimal places', () => {
        let result = validatePrice(12300)
        expect(result).toEqual('123')
    })
    test('Should round down 0 decimal places', () => {
        let result = validatePrice(12325)
        expect(result).toEqual('123')
    })
})

describe('Filter Bad Words', () => {
    test('Bad Word Filtered', () => {
        let result = validateWordFilter('ahole')
        expect(result).toEqual('*****')
    })
    test('Good Word Not Filtered', () => {
        let result = validateWordFilter('DevMountain')
        expect(result).toEqual('DevMountain')
    })
    
})
