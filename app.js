const printer = require('pdf-to-printer');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let isPrinting = false;

app.post('/print', (req, res) => {
    
    if (isPrinting) {
        return res.status(429).send('Printer is busy, please try again later');
    }

    isPrinting = true;

    const filePath = req.body.filePath;
    const absolutePath =filePath;

    exec(`lp "${absolutePath}"`, (error, stdout, stderr) => {
        isPrinting = false;

        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Failed to print');
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).send('Failed to print');
        }
        console.log(`Printed: ${stdout}`);
        res.status(200).send('Printed successfully');
    });
});
