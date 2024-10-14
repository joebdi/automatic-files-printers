const printer = require('pdf-to-printer');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/print', async (req, res) => {

    const filePath = req.body.filePath;
    console.log(filePath);
    
    try {
        await printer.print(filePath);
        res.status(200).send('Printed successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to print');
    }
});

app.listen(3000, () => {
    console.log('Print server running on port 3000');
});
