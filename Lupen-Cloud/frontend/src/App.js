// Main App Component
// Google Drive-like UI for Lupen-Cloud

import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import FileList from './FileList';

function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box textAlign="center">
        <Typography variant="h3" gutterBottom>Lupen-Cloud</Typography>
        <Typography variant="subtitle1" gutterBottom>
          Secure, resumable, and fast cloud backup up to 3TB!
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 4 }}>
          Upload File
        </Button>
      </Box>
      <Box sx={{ mt: 6 }}>
        <FileList />
      </Box>
    </Container>
  );
}

export default App;
