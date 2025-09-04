// FileList component: Lists all backup files with download links
// Uses the backend API to fetch file list

import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Link, CircularProgress, Typography } from '@mui/material';

function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/files')
      .then(res => res.json())
      .then(data => {
        setFiles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (!files.length) return <Typography sx={{ mt: 4 }}>No backup files found.</Typography>;

  return (
    <List>
      {files.map(file => (
        <ListItem key={file.name} divider>
          <ListItemText primary={file.name} />
          <Link href={file.url} target="_blank" rel="noopener" underline="hover">
            Download
          </Link>
        </ListItem>
      ))}
    </List>
  );
}

export default FileList;
