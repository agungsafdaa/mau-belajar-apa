
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormLesson({addSession,  form, set,parentObject}) {
    const handleClose = () => {
        set(!form);
    };
    const initialFormState = { id: null, name: "" };
    const [user, setUser] = useState(initialFormState);
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };



 
    return (
        <div>

            <Dialog open={form} onClose={handleClose}>
                <DialogTitle>Tambah Lesson</DialogTitle>
                <DialogContent>
                    <form
                        onSubmit={event => {
                            event.preventDefault();
                          
                                addSession(user)
                             
                        }}
                    >

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="session"
                            name="name"
                            value={user.name || ''}
                            onChange={handleInputChange}
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <label> tanggal</label>
                         <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                           
                            name="date"
                            value={user.date || ''}
                            onChange={handleInputChange}
                            type="date"
                            fullWidth
                            variant="standard"
                        />
                        <label> durasi</label>

                          <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name="time"
                            value={user.time || ''}
                            onChange={handleInputChange}
                            type="time"
                            fullWidth
                            variant="standard"
                        />
                        <Button type="submit">Tambah Session</Button>
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>

                </DialogActions>
            </Dialog>
        </div >
    );
}
