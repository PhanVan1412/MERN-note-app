import React, { useState } from 'react';
import { Grid, Card, CardContent } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { useParams, useLoaderData } from 'react-router-dom';

export default function NoteList() {
  const { noteId } = useParams();
  const [noteActive, setNoteActive] = useState(noteId);
  const { data } = useLoaderData();
  console.log('check note list data in line 10', data);
  const folder = {
    notes: [
      {
        id: '1',
        note: 'this is note 1',
      },
    ],
  };
  return (
    <Grid container height="100%">
      <Grid item xs={4}>
        {folder.notes.map(({ note, id }) => {
          return (
            <Link
              to={`note/${id}`}
              key={`note-item-${id}`}
              style={{ textDecoration: 'none' }}
              onClick={() => setNoteActive(id)}
            >
              <Card sx={{ mb: '5px', backgroundColor: noteActive === id ? 'rgb(255, 211, 140)' : 'none' }}>
                <CardContent sx={{ '$last-child': { pb: '10px', padding: '10px' } }}>
                  <div
                    style={{ fontSize: 14, fontWeight: 'bold' }}
                    dangerouslySetInnerHTML={{ __html: `${note.substring(0, 30) || 'Emty'}` }}
                  ></div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
