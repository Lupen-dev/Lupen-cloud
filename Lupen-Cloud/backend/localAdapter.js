// Local Cloud Adapter
// Implements the CloudAdapter interface for local backup storage.

const fs = require('fs');
const path = require('path');
const CloudAdapter = require('./cloudAdapter');

class LocalAdapter extends CloudAdapter {
  constructor(baseDir) {
    super();
    this.baseDir = baseDir;
  }

  // Upload (copy) file to local backup directory
  async upload(filePath, destPath) {
    const dest = path.join(this.baseDir, destPath);
    await fs.promises.mkdir(path.dirname(dest), { recursive: true });
    await fs.promises.copyFile(filePath, dest);
  }

  // Download (copy) file from backup to destination
  async download(cloudPath, destPath) {
    const src = path.join(this.baseDir, cloudPath);
    await fs.promises.copyFile(src, destPath);
  }

  // List files in backup directory
  async list(cloudDir = '') {
    const dir = path.join(this.baseDir, cloudDir);
    const walk = async (dirPath) => {
      let results = [];
      const list = await fs.promises.readdir(dirPath, { withFileTypes: true });
      for (const file of list) {
        const filePath = path.join(dirPath, file.name);
        if (file.isDirectory()) {
          results = results.concat(await walk(filePath));
        } else {
          results.push(path.relative(this.baseDir, filePath));
        }
      }
      return results;
    };
    return walk(dir);
  }
}

module.exports = LocalAdapter;
