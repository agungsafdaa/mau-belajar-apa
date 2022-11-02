import React, { useState, useRef, useEffect } from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormLesson from './FormLesson';
import EditIcon from '@mui/icons-material/Edit';
import EditSession from './EditSession';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import { Typography } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
export default function ListSession({ session, setSession }) {

    const draggingItem = useRef();
    const dragOverItem = useRef();
    const [data, setData] = useState();
    const [openEdit, setOpenEdit] = useState(false);

    const [openLesson, setOpenLesson] = useState(false);
    const handleDragStart = (e, position) => {
        draggingItem.current = position;

    };




    const handleDragEnter = (e, position) => {
        dragOverItem.current = position;

        const listCopy = [...session];

        const draggingItemContent = listCopy[draggingItem.current];
        listCopy.splice(draggingItem.current, 1);
        listCopy.splice(dragOverItem.current, 0, draggingItemContent);

        draggingItem.current = dragOverItem.current;
        dragOverItem.current = null;
        setSession(listCopy);
    };



    const handleClickOpen = (event, a) => {
        setOpenLesson(true);
        setData(event)
    };


    function addToStructure(structure, object, parent) {
        structure.some(function iter(a) {
            if (a.key === parent) {
                a.children = a.children || [];
                a.children.push(object);
                return true;
            }
            return Array.isArray(a.children) && a.children.some(iter);
        });
    }


    const addSession = (row) => {
        var elements = [{ key: data.id, id: data.id, name: data.name },
        ];

        row.id = 1;
        addToStructure(elements, { ...data.children, id: row.id, name: row.name, time: row.time, date: row.date }, data.id);
        setSession(session.map((user) => (user.id === data.id ? elements[0] : user)));
    };

    const addNewSession = (row) => {

        var elements = [{
            key: data.id, id: data.id, name: data.name, children: [data.children],
        }];

        addToStructure(elements, { id: 1, name: row.name }, data.id);
        setSession(session.map((user) => (user.id === data.id ? elements[0] : user)));
    };

    console.log(session)
    const [currentUser, setCurrentUser] = useState();

    const getId = (event) => {

        setOpenEdit(true);
        setCurrentUser(event);
    }

    const updateUser = (id, updateUser) => {
        setOpenEdit(false);
        setSession(session.map((user) => (user.id === id ? updateUser : user)));
    };
    return (
        <>

            <div className="curiculum">

                <div className="session">

                    {session.length === 0 ?
                        <>

                            <div className="nama-session">
                                <div className="title">
                                    <img src="/img/dots.png" alt="dots" />
                                    <h3>Belum ada data</h3>
                                </div>
                            </div>
                        </>
                        :
                        session.map((item, index) => (
                            <div className="nama-session" onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => e.preventDefault()}
                                onDragEnter={(e) => handleDragEnter(e, index)}
                                key={index}
                                draggable>
                                <div className="title"  >
                                    <div className="name">
                                        <img src="/img/dots.png" alt="dots" />
                                        <h3 onClick={() => getId(item)}>{item.name}</h3> <EditIcon onClick={() => getId(item)} />
                                    </div>
                                    <Button className="more">
                                        <img src='./img/dot.png' alt="more" />
                                    </Button>
                                </div>
                                <div className="list-lesson">
                                    {item.children === undefined ? '' : item.children.map((item, index) => (

                                        <div className="lesson" key={index}>
                                            <div className="title">
                                                <img src="/img/dots.png" alt="dots" />
                                                <VideoCameraBackOutlinedIcon />
                                                <h5 >{item.name}</h5>
                                                <Typography style={{ color: '#6F32D2;' }}>Required</Typography>
                                            </div>
                                            <div className="time">
                                                <AccessTimeOutlinedIcon /> <Typography>{item.date}</Typography>
                                                <CircleIcon className="divider" />
                                                <AccessTimeOutlinedIcon /> <Typography>{item.time}</Typography>
                                                <CircleIcon className="divider" />
                                                <SystemUpdateAltIcon /> <Typography>Downloadable</Typography>
                                                <Button className="more">
                                                    <img src='./img/dot.png' alt="more" />
                                                </Button>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                                <div className="add-lesson">
                                    <EditSession form={openEdit} set={setOpenEdit} currentUser={currentUser} updateUser={updateUser} />
                                    <FormLesson form={openLesson} addSession={item.children === undefined ? addSession : addNewSession} children={item.children} parentObject={data} set={setOpenLesson} session={session} setSession={setSession} />
                                    <Button type="submit" onClick={() => handleClickOpen(item, item.children)}><span className="icon-plus"><AddIcon /></span>Add Lesson Material</Button>

                                </div>
                            </div>
                        ))

                    }

                </div>


            </div>
        </>
    )
}
