import React, { useEffect, useState } from "react";
import "./comp.css"
import {
    addNote,
    getAllNotes,
    deleteNote,
    updateNote,
} from "../service/firebase";
import { analyzeNote, searchPhrase } from "../service/openai";
import { useSelector } from "react-redux";

export const Notes = ({ setnewNote, newNote, handleLogout }) => {

    const user = useSelector((state) => state.user.user);

    const [note, setNote] = useState("");
    const [phrase, setphrase] = useState("")
    const [notes, setNotes] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setloading] = useState(true)


    const analyzewithAi = async (noteProp) => {
        const result = await analyzeNote(noteProp);
        return result;
    };


    useEffect(() => {
        fetchNotes();

        setTimeout(() => {
            setloading(false)
        }, 1000)

        clearAll()
    }, []);

    const fetchNotes = async () => {
        const data = await getAllNotes(user?.uid);
        setNotes(data);
        setloading(false)
    };

    const handleAdd = async () => {

        if (!note.trim()) return;
        setloading(true)
        const res = await analyzewithAi(note)
        await addNote({ text: note, timestamp: Date.now(), bgcolor: getRandomLightColor(), sentiment: res?.sentiment, summary: res?.summary, tag: res?.tag }, user.uid);
        setNote("");
        fetchNotes();
        clearAll()
        alert("Notes Added")
    };

    const handleDelete = async (id) => {
        if (!user || !user.uid) {
            console.error("User ID is missing.");
            return;
        }
        if (!id) {
            console.error("Note ID is missing.");
            return;
        }
        setloading(true)
        await deleteNote(user?.uid, id);
        fetchNotes();
        clearAll()
        alert("Notes Deleted")
    };

    const handleEdit = (id, text) => {
        setEditingId(id);
        setNote(text);
        setnewNote(true)
    };

    const handleUpdate = async (noteId) => {
        setloading(true)
        if (!user || !user.uid) {
            console.error("User ID is missing.");
            return;
        }
        if (!noteId) {
            console.error("Note ID is missing.");
            return;
        }

        if (!note.trim()) return;
        const res = await analyzewithAi(note)

        try {

            await updateNote(user.uid, noteId, { text: note, timestamp: Date.now(), sentiment: res?.sentiment, summary: res?.summary, tag: res?.tag });
            fetchNotes();
            clearAll()
            alert("Notes Updated")
        } catch (error) {
            console.error("Failed to update note:", error);
        }
    };


    const clearAll = () => {
        setEditingId(null);
        setNote("");
        setnewNote(false)
        setloading(false)
    }


    function getRandomLightColor() {
        const lightColors = [
            "#FFCDD2", "#F8BBD0", "#E1BEE7", "#D1C4E9", "#C5CAE9",
            "#BBDEFB", "#B3E5FC", "#B2EBF2", "#B2DFDB", "#C8E6C9",
            "#DCEDC8", "#F0F4C3", "#FFF9C4", "#FFECB3", "#FFE0B2",
            "#FFCCBC", "#D7CCC8", "#F5F5F5", "#CFD8DC"
        ];

        const randomIndex = Math.floor(Math.random() * lightColors.length);
        return lightColors[randomIndex];
    }

    function timestampToDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Converts to local date & time format
    }


    const search = async () => {
        const res = await searchPhrase(notes, phrase)
        setNotes(res)
    }


    if (loading) {
        return (
            <div className="loading-container">
                <p>Loading Notes...</p>
            </div>
        )
    }



    return (

        <div>
            <div>
                <div className="search_bar">
                    <p>Welcome {user?.displayName}</p>
                    <input type="search"
                        value={phrase}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            setphrase(newValue);
                            if (newValue === "") {
                                fetchNotes()
                            }
                        }}
                        placeholder="Search your notes phrase here..."

                    />
                    <button onClick={() => search()}>Find Phrase</button>
                </div>


            </div>
            <div className='notesgrid'>



                {newNote && <div className='notescomp' style={{ backgroundColor: "#BBDEFB" }}>

                    <div className='row'>
                        <i class="fa fa-hashtag" aria-hidden="true"></i>
                        <h3> {!editingId ? "New" : "Update"}</h3>
                    </div>

                    <textarea placeholder='please enter you note here...'
                        style={{ width: "100%", resize: "none", overflow: "hidden" }}
                        rows={2} cols={25}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}

                    />

                    <div className='row space-between'>
                        <h6>{timestampToDate(Date.now())}</h6>
                        <div className='button_row row'>
                            <i onClick={() => clearAll()} class="fa fa-minus" aria-hidden="true"></i>
                            <i onClick={() => !editingId ? handleAdd() : handleUpdate(editingId)} class="fa fa-check" aria-hidden="true"></i>
                        </div>
                    </div>

                </div>}

                {
                    notes?.map((n, index) => {
                        return (
                            <div key={index} className='notescomp' style={{ backgroundColor: n?.bgcolor }}>

                                <div className="notes_header">
                                    <div className='row'>
                                        <i class="fa fa-hashtag" aria-hidden="true"></i>
                                        <h3>{n?.tag} #{n?.sentiment}</h3>
                                    </div>

                                    <p>{n?.text}</p>
                                </div>

                                <div className='row space-between'>
                                    <h6>{timestampToDate(n?.timestamp)}</h6>
                                    <div className='button_row row'>
                                        <i class="fa fa-info-circle" aria-hidden="true" title={n?.summary}></i>
                                        <i onClick={() => handleEdit(n.id, n.text)} class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                        <i onClick={() => handleDelete(n.id)} class="fa fa-trash-o" aria-hidden="true"></i>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}
