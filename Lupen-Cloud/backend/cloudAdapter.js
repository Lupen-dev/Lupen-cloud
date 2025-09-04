// Cloud Adapter Interface
// This file defines the interface for cloud storage adapters.

class CloudAdapter {
  // Upload a file to the cloud
  // filePath: local file path
  // destPath: destination path in cloud
  async upload(filePath, destPath) {
    throw new Error('upload() not implemented');
  }

  // Download a file from the cloud
  async download(cloudPath, destPath) {
    throw new Error('download() not implemented');
  }

  // List files in the cloud
  async list(cloudDir) {
    throw new Error('list() not implemented');
  }
}

module.exports = CloudAdapter;
