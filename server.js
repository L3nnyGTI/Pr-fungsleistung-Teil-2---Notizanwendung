const express = require('express');
const nano = require('nano')('http://admin:1234@127.0.0.1:5984'); // Verbinden Sie sich mit der CouchDB-Instanz
const app = express();
const dbName = 'notes'; // Der Name der CouchDB-Datenbank
const db = nano.db.use(dbName);
const cors = require('cors');

app.use(express.json());
app.use(cors());

//Notizen

// Erstellen einer neuen Notiz
app.post('/notes', async (req, res) => {
    const newNote = { ...req.body, type: 'note' }; // Setzt den Typ auf 'note'
    try {
        const result = await db.insert(newNote);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Abrufen aller Notizen
app.get('/notes', async (req, res) => {
    try {
        // Hier verwenden wir eine Mango Query, um nur Dokumente vom Typ 'note' zu erhalten
        const result = await db.find({
            selector: { type: 'note' }
        });
        // Im Ergebnis von find() werden die Dokumente unter result.docs zurückgegeben
        res.status(200).send(result.docs);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).send(error.toString());
    }
});

// Aktualisieren einer Notiz
app.put('/notes/:id', async (req, res) => {
    try {
        const existingDoc = await db.get(req.params.id);
        const updatedNote = { ...existingDoc, ...req.body, type: 'note' };
        const result = await db.insert(updatedNote);
        res.status(200).send(result);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).send(error.toString());
    }
});

// Löschen einer Notiz
app.delete('/notes/:id', async (req, res) => {
    try {
        const existingDoc = await db.get(req.params.id);
        const result = await db.destroy(existingDoc._id, existingDoc._rev);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Tag-Funktionalitäten

app.get('/tags', async (req, res) => {
    try {
        const result = await db.find({
            selector: { type: 'tag' }
        });
        res.status(200).send(result.docs);
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).send(error.toString());
    }
});
app.post('/tags', async (req, res) => {
    try {
        const result = await db.insert({ ...req.body, type: 'tag' });
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.put('/tags/:id', async (req, res) => {
    try {
        const existingTag = await db.get(req.params.id);
        const updatedTag = { ...existingTag, ...req.body };
        const result = await db.insert(updatedTag);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.delete('/tags/:id', async (req, res) => {
    try {
        const existingTag = await db.get(req.params.id);
        const result = await db.destroy(existingTag._id, existingTag._rev);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

//Tag-Funktionalität: anheften

app.put('/notes/:noteId/tags/:tagId', async (req, res) => {
    try {
        const note = await db.get(req.params.noteId);
        const tagId = req.params.tagId;
        const updatedNote = { ...note, tags: [...(note.tags || []), tagId] };
        const result = await db.insert(updatedNote);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.delete('/notes/:noteId/tags/:tagId', async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const tagId = req.params.tagId;
        const note = await db.get(noteId);

        // Entfernen des Tags aus der Notiz, falls vorhanden
        const updatedTags = note.tags ? note.tags.filter(t => t !== tagId) : [];

        // Aktualisieren der Notiz mit den neuen Tags
        const updatedNote = { ...note, tags: updatedTags };
        const result = await db.insert(updatedNote);

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});