import React, { useState } from 'react';
import { List, Card, CardContent, Typography, Box } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

export default function FolderList({ folders }) {
  console.log('check folders list in line 6: ', folders);
  const { folderId } = useParams();
  const [activeFolder, setActiveFolder] = useState(folderId);
  console.log('check params in line 8: ', { folderId });
  return (
    <List
      sx={{ width: '100%', bgcolor: '#7D9D9C', height: '100%', padding: '10px', textAlign: 'left', overflow: 'auto' }}
      subheader={
        <Box>
          <Typography sx={{ fontWeight: 'bold', color: 'white' }}>Folders</Typography>
        </Box>
      }
    >
      {folders.map((folder, id) => {
        return (
          <Link
            key={`folder-item-${id}`}
            to={`folder/${id}`}
            style={{ textDecoration: 'none' }}
            onClick={() => setActiveFolder(id)}
          >
            <Card sx={{ mb: '5px', backgroundColor: activeFolder === id ? 'rgb(255, 211, 140)' : 'none' }}>
              <CardContent sx={{ '&:last-child': { padding: '10px' }, padding: '10px' }}>
                <Typography>{folder.name}</Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </List>
  );
}
