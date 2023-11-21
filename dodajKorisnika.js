const fs = require('fs');

// Učitaj postojeće korisnike
const dataPath = 'baza.json';
const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Novi korisnik
const newUserData = {
    "id": 3,
    "name": "Novi Korisnik",
    "username": "noviuser",
    "email": "novi@korisnik.com",
    "address": {
        "street": "Neka ulica",
        "suite": "Stan 123",
        "city": "Neki grad",
        "zipcode": "12345",
        "geo": {
            "lat": "12.3456",
            "lng": "-23.4567"
        }
    },
    "phone": "123-456-7890",
    "website": "novikorisnik.com",
    "company": {
        "name": "Nova Kompanija",
        "catchPhrase": "Nova catch fraza",
        "bs": "Nova poslovna strategija"
    }
};

// Dodaj novog korisnika
users.push(newUserData);

// Ažuriraj JSON datoteku
fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));

console.log('Novi korisnik dodat u bazu.');
