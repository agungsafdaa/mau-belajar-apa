
import React, { useState } from "react";
import './style/css/main.css';
import Header from './components/Header'
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FormSession from "./components/FormSession";
import ListSession from "./components/ListSession";
function App() {
  const sessionData = [
    
  ];
  const [session, setSession] = useState(sessionData);
  const [open, setOpen] = useState(false);
  const addSession = (row) => {
    row.id = session.length + 1;
    row.key = session.length + 1;
    setSession([...session, row]);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Header />
      <FormSession addSession={addSession} form={open} set={setOpen} />
      <div className="content">
        <Container maxWidth="xl">
          <div className="heading">
            <div className="title">
              <h2>Belajar dan praktek cinematic videography</h2>
              <Typography>
                Last edited 18 October 2021 | 13:23
              </Typography>
            </div>
            <Button variant="outlined" className="preview-button"><RemoveRedEyeOutlinedIcon /> Preview</Button>
          </div>
          <div className="curiculum">
            <div className="heading">
              <h4>Curicullum</h4>
            </div>
            <div className="nama-schedule">
              <Typography>Event Schedule: 24 Oktober 2021, 16:30</Typography>
            </div>

            <div className="session">
              <ListSession session={session} setSession={setSession}/>
              <div className="add">
                <Button className="action-button" onClick={handleClickOpen}><AddOutlinedIcon /> add session</Button>
              </div>
            </div>


          </div>
        </Container>
      </div>

    </>
  );
}

export default App;
