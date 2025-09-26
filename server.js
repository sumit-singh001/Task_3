const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' }
];


let nextId = 4;


app.get('/books', (req, res) => {
    res.json({
        success: true,
        data: books,
        count: books.length
    });
});


app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    
    if (!book) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }
    
    res.json({
        success: true,
        data: book
    });
});


app.post('/books', (req, res) => {
    const { title, author } = req.body;
    
    
    if (!title || !author) {
        return res.status(400).json({
            success: false,
            message: 'Title and author are required'
        });
    }
    
    const newBook = {
        id: nextId++,
        title,
        author
    };
    
    books.push(newBook);
    
    res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: newBook
    });
});


app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;
    
    const bookIndex = books.findIndex(b => b.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }
    
    
    if (!title || !author) {
        return res.status(400).json({
            success: false,
            message: 'Title and author are required'
        });
    }
    
    
    books[bookIndex] = {
        id,
        title,
        author
    };
    
    res.json({
        success: true,
        message: 'Book updated successfully',
        data: books[bookIndex]
    });
});


app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }
    
    const deletedBook = books.splice(bookIndex, 1)[0];
    
    res.json({
        success: true,
        message: 'Book deleted successfully',
        data: deletedBook
    });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});


app.listen(PORT, () => {
    console.log(`Book API server running on http://localhost:${PORT}`);
});
