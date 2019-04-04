import {validateEmail, validatePassword} from './AuthLogic'

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

// SPENCER'S LOGIC 

// describe('Valid Event Name', () => {

//     test('Please enter a event name', () => {
//         let result = validatePassword('');
//         expect(result).toEqual({ "bool": false, "message": "Please enter a event name" });
//     })
//     test('Event name cannot include special characters', () => {
//         let result = validatePassword('$');
//         expect(result).toEqual({ "bool": false, "message": "Event name cannot include special characters" });
//     })
    
// })

