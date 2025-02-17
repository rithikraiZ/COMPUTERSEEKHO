import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

const colors = {
  primary: '#1A1A1D',
  secondary: '#3B1C32',
  accent: '#6A1E55',
  light: '#F2F2F2',
  white: '#FFFFFF'
};

const AlbumComponent = () => {
  const [albums, setAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [newAlbum, setNewAlbum] = useState({
    albumName: '',
    albumDescription: ''
  });

  const fetchAlbums = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/album/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched albums:', data);
      setAlbums(data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const deleteAlbum = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/album/delete/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setAlbums(albums.filter(album => album.albumId !== id));
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };
  

  const addAlbum = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/album/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAlbum)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAlbums([...albums, data]);
      setNewAlbum({
        albumName: '',
        albumDescription: ''
      });
      setOpen(false);
      fetchAlbums();
    } catch (error) {
      console.error('Error adding album:', error);
    }
  };

  const updateAlbum = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/album/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...selectedAlbum,
          albumName: newAlbum.albumName,
          albumDescription: newAlbum.albumDescription
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAlbums(albums.map(album => (album.albumId === data.albumId ? data : album)));
      setNewAlbum({
        albumName: '',
        albumDescription: ''
      });
      setOpen(false);
      setEditMode(false);
      setSelectedAlbum(null);
      fetchAlbums();
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };

  const handleEditClick = (album) => {
    setSelectedAlbum(album);
    setNewAlbum({
      albumName: album.albumName,
      albumDescription: album.albumDescription
    });
    setEditMode(true);
    setOpen(true);
  };

  const handleViewClick = (album) => {
    setSelectedAlbum(album);
    setViewMode(true);
    setOpen(true);
  };

  const filteredAlbums = Array.isArray(albums) ? albums.filter(album =>
    album.albumName && album.albumName.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  console.log('Filtered albums:', filteredAlbums);

  return (
    <Box sx={{ padding: '20px', backgroundColor: colors.light, borderRadius: '8px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4" sx={{ color: colors.primary }}>
          Album Master
        </Typography>
        <TextField
          label="Search by Album Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: '300px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" sx={{ backgroundColor: colors.accent, color: colors.white }} onClick={() => setOpen(true)}>
          {editMode ? 'Update Album' : 'Add Album'}
        </Button>
      </Box>

      <List>
        {filteredAlbums.length === 0 ? (
          <Typography variant="body1" sx={{ color: colors.primary }}>
            No albums found.
          </Typography>
        ) : (
          filteredAlbums.map(album => (
            <ListItem key={album.albumId} sx={{ backgroundColor: colors.white, borderRadius: '8px', marginBottom: '10px' }}>
              <ListItemText
                primary={album.albumName}
                secondary={album.albumDescription}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleViewClick(album)}>
                  <Button variant="contained" sx={{ backgroundColor: colors.accent, color: colors.white, marginRight: '10px' }}>
                    View
                  </Button>
                </IconButton>
                <IconButton edge="end" onClick={() => handleEditClick(album)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => deleteAlbum(album.albumId)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        )}
      </List>

      <Dialog open={open} onClose={() => { setOpen(false); setEditMode(false); setViewMode(false); setSelectedAlbum(null); }}>
        <DialogTitle>{editMode ? 'Update Album' : viewMode ? 'Album Details' : 'Add New Album'}</DialogTitle>
        <DialogContent>
          {viewMode ? (
            <>
              <Typography variant="h6">Album Name: {selectedAlbum?.albumName}</Typography>
              <Typography variant="body1">Album Description: {selectedAlbum?.albumDescription}</Typography>
            </>
          ) : (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Album Name"
                type="text"
                fullWidth
                value={newAlbum.albumName}
                onChange={(e) => setNewAlbum({ ...newAlbum, albumName: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Album Description"
                type="text"
                fullWidth
                value={newAlbum.albumDescription}
                onChange={(e) => setNewAlbum({ ...newAlbum, albumDescription: e.target.value })}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false); setEditMode(false); setViewMode(false); setSelectedAlbum(null); }}>
            Close
          </Button>
          {!viewMode && (
            <Button onClick={editMode ? updateAlbum : addAlbum} sx={{ backgroundColor: colors.accent, color: colors.white }}>
              {editMode ? 'Update' : 'Add'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlbumComponent;
