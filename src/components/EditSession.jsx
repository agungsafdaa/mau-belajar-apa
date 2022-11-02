
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditSession({ form, currentUser, set, updateUser }) {
    const handleClose = () => {
        set(!form);
    };
    const [user, setUser] = useState();

    useEffect(
        () => {
            setUser(currentUser);
        },
        [currentUser]
    );
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };
    return (
        <div>
            {form === false ? '' :
                <>
                    <Dialog open={form} onClose={handleClose}>
                        <DialogTitle>Edit Session</DialogTitle>
                        <DialogContent>
                            <form
                                onSubmit={event => {
                                    event.preventDefault();
                                    updateUser(user.id, user);
                                }}
                            >
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="session"
                                    name="name"
                                    value={user ? user.name  : currentUser.name  || ''}
                                    onChange={handleInputChange}
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                                <Button type="submit">Edit Session</Button>
                            </form>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>

                        </DialogActions>
                    </Dialog>
                </>
            }

        </div >
    );
}
