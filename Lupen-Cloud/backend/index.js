// Lupen-Cloud Backend Entry Point
// This file will initialize the Express server and core backup logic.

// Lupen-Cloud Backend Entry Point
// This file will initialize the Express server and core backup logic.

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;


// Local cloud adapter and backup manager
const LocalAdapter = require('./localAdapter');
const BackupManager = require('./backupManager');
const path = require('path');

// Directory to watch for backup (change this as needed)
const WATCH_DIR = path.join(__dirname, 'watched_folder');
const BACKUP_DIR = path.join(__dirname, 'backups');

// Ensure watched_folder exists
const fs = require('fs');
fs.mkdirSync(WATCH_DIR, { recursive: true });


// Initialize local adapter and backup manager
const localAdapter = new LocalAdapter(BACKUP_DIR);
const backupManager = new BackupManager(WATCH_DIR, localAdapter);

backupManager.start();

// Download route for backup files using query param (Express 5 compatible)
app.get('/api/download', (req, res) => {
  const BACKUP_DIR = path.join(__dirname, 'backups');
  const relPath = req.query.file;
  if (!relPath) return res.status(400).send('No file specified');
  const absPath = path.join(BACKUP_DIR, relPath);
  if (!absPath.startsWith(BACKUP_DIR)) {
    return res.status(400).send('Invalid path');
  }
  if (!fs.existsSync(absPath)) {
    return res.status(404).send('File not found');
  }
  res.download(absPath, path.basename(relPath));
});

// File API routes (list and download backup files)
const filesApi = require('./filesApi');
app.use('/api', filesApi);

app.listen(PORT, () => {
  console.log(`Lupen-Cloud backend running on port ${PORT}`);
});
