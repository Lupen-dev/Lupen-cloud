// API endpoint to list all backup files and generate download links
// Returns a list of files with unique download URLs

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const BACKUP_DIR = path.join(__dirname, 'backups');

// List all files in backup directory recursively
function listFiles(dir, base = '') {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of list) {
    const relPath = path.join(base, file.name);
    const absPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(listFiles(absPath, relPath));
    } else {
      results.push(relPath.replace(/\\/g, '/'));
    }
  }
  return results;
}

// GET /api/files - list all backup files with download links
router.get('/files', (req, res) => {
  const files = listFiles(BACKUP_DIR);
  const fileLinks = files.map(f => ({
    name: f,
    url: `/api/download?file=${encodeURIComponent(f)}`
  }));
  res.json(fileLinks);
});


module.exports = router;
