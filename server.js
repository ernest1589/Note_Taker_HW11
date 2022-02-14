const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const noteid = () => {
    Math.floor((1 + Math.random()) * 0*100000)
    .toString(10)
    .substring(1);
}




app.use(express.json());
app.use(express.urlencoded({  extended: true  }));
app.use(express.statis('public'));


app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = { title, text,
            note_id: noteid()
        }
    }

    fs.readFile('./db/notes.js', (err, data) => {
        if(err) {
            console.error(err);
       } else {
           const jsonData = JSON.parse(data);
           jsonData.push(newNote);

           fs.writeFile('./db/notes.json', JSON.stringify(jsonData, null, 4), (writeErr) => {
               if (writeErr) {
                   console.error(writErr);
              } else {
                  console.log(`${title} note was saved`);
              }
              });
       }
    });
});

app.get('/api/notes', (req, res) => {

    fs.readFile('/db/notes.json', (err, data) => {
        if(err) {
            console.error(err);
        } else {
            return res.send(data);
        }
    });
});


app.listen(PORT, () => {
    console.log(`Application ir running on http://localhost:${PORT}`)
});

