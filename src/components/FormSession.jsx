
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormSession({ form, set, addSession }) {
    const handleClose = () => {
        set(!form);
    };
    const initialFormState = { id: null, name: ""};
    const [user, setUser] = useState(initialFormState);
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };
    return (
        <div>

            <Dialog open={form} onClose={handleClose}>
                <DialogTitle>Tambah Session</DialogTitle>
                <DialogContent>
                    <form
                        onSubmit={event => {
                            event.preventDefault();
                            if (!user.name ) return;
                            addSession(user);
                            setUser(initialFormState);
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
