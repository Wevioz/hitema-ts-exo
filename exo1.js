"use strict";
exports.__esModule = true;
exports.logPerson = exports.users = void 0;
exports.users = [
    {
        name: 'Alain',
        age: 25,
        occupation: 'Boulanger',
        compentences: ['js', 'node']
    },
    {
        name: 'Béatrice',
        age: 23,
        occupation: 'Astronaute',
        adresse: {
            rue: '75 rue de Paris',
            cp: 75000,
            ville: 'Paris'
        }
    },
];
function logPerson(user) {
    console.log(" - " + user.name + ", " + user.age);
}
exports.logPerson = logPerson;
