import React, { useState, useRef, useEffect } from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
export default function ListSession({ session, setSession }) {

    const draggingItem = useRef();
    const dragOverItem = useRef();
    const [data, setData] = useState();

    const handleDragStart = (e, position) => {
        draggingItem.current = position;

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

    const getId = (event) => {
        console.log(event.id)
        setData(event)
    }
    const addSession = (event) => {
        var elements = [{ key: event.id, id: event.id, name: event.name },

        ];

        addToStructure(elements, { id: 1, name: "Johny Dep" }, event.id);
        setSession(session.map((user) => (user.id === event.id ? elements[0] : user)));
    };

    const addNewSession = (event) => {
        var elements = [{ key: event.id, id: event.id, name: event.name, children: [event.children[0]] },

        ];

        addToStructure(elements, { id: 1, name: "Johny Depa" }, event.id);
        setSession(session.map((user) => (user.id === event.id ? elements[0] : user)));
    };

    console.log(session);

    // var elements = [{ key: 1, label: "a.", open: true, }];

    // addToStructure(elements, { key: 100, label: "Johny Dep" }, 1);

    // console.log(elements);
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
                                    <img src="/img/dots.png" alt="dots" />
                                    <h3 onClick={() => getId(item)}>{item.name}</h3>

                                </div>
                                <div className="list-lesson">
                                    {item.children === undefined ? '' : item.children.map((item, index) => (

                                        <div className="lesson">
                                            <img src="/img/dots.png" alt="dots" />
                                            <h5 >{item.name}</h5>
                                        </div>

                                    ))}
                                </div>
                                <div className="add-lesson">
                                    <form
                                        onSubmit={event => {
                                            event.preventDefault();
                                            item.children === undefined ?
                                                addSession(item)
                                                : addNewSession(item);
                                        }}
                                    >

                                         <Button type="submit"><span className="icon-plus"><AddIcon /></span>Add Lesson Material</Button>
                                    </form>
                                </div>
                            </div>
                        ))

                    }

                </div>


            </div>
        </>
    )
}
