// File Watcher and Backup Logic
// Watches a local folder and backs up changed files using the provided cloud adapter.

const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');

class BackupManager {
  constructor(watchDir, cloudAdapter) {
    this.watchDir = watchDir;
    this.cloudAdapter = cloudAdapter;
    this.watcher = null;
  }

  // Start watching the directory for changes
  start() {
    this.watcher = chokidar.watch(this.watchDir, {
      ignored: /(^|[\\/])\../, // ignore dotfiles
      persistent: true,
      ignoreInitial: false,
      depth: 99
    });

    this.watcher
      .on('add', filePath => this.backupFile(filePath))
      .on('change', filePath => this.backupFile(filePath));
  }

  // Backup a single file
  async backupFile(filePath) {
    const relPath = path.relative(this.watchDir, filePath);
    try {
      await this.cloudAdapter.upload(filePath, relPath);
      console.log(`[Backup] ${relPath} backed up successfully.`);
    } catch (err) {
      console.error(`[Backup] Failed to backup ${relPath}:`, err);
    }
  }
}

module.exports = BackupManager;
