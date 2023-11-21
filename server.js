const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const dataPath = 'baza.json';

app.use(express.json());

// Prikaz podataka iz baze JSON datoteke
app.get('/api/items', (req, res) => {
   fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
         console.error(err);
         res.status(500).json({ error: 'Internal Server Error' });
         return;
      }

      const users = JSON.parse(data);
      res.json(users);
   });
});

//dodavanje korisnika u bazu
app.post('/api/items', (req, res) => {
   fs.readFile(dataPath, 'utf8', (readErr, data) => {
      if (readErr) {
         console.error(readErr);
         res.status(500).json({ error: 'Internal Server Error' });
         return;
      }

      const users = JSON.parse(data);

      const newUser = req.body;
      users.push(newUser);

      fs.writeFile(dataPath, JSON.stringify(users, null, 2), (writeErr) => {
         if (writeErr) {
            console.error(writeErr);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
         }

         res.json({ message: 'User added successfully', newUser });
      });
   });
});

//brisanje korisnika
app.delete('/api/items/:id', (req, res) => {
   const userIdToDelete = parseInt(req.params.id);

   fs.readFile(dataPath, 'utf8', (readErr, data) => {
      if (readErr) {
         console.error(readErr);
         res.status(500).json({ error: 'Internal Server Error' });
         return;
      }

      let users = JSON.parse(data);

      const userIndexToDelete = users.findIndex(user => user.id === userIdToDelete);

      if (userIndexToDelete === -1) {
         res.status(404).json({ error: 'User not found' });
         return;
      }

      const deletedUser = users.splice(userIndexToDelete, 1)[0];

      fs.writeFile(dataPath, JSON.stringify(users, null, 2), (writeErr) => {
         if (writeErr) {
            console.error(writeErr);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
         }

         res.json({ message: 'User deleted successfully', deletedUser });
      });
   });
});