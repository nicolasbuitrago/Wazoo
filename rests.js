const faker = require('faker');
const rests = require('./features');

const r = [];

rests.features.forEach(element => {
    const p = {
        name: faker.company.companyName(),
        description: faker.company.catchPhrase(),
        phone: faker.phone.phoneNumberFormat(),
        address: faker.address.streetAddress(),
        city:'Barranquilla',
        state:'Atlantico',
        country:'Colombia'
    };
    element.properties = p;
    r.push(element);
});

console.log(r);