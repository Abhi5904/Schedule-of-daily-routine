import { useState } from "react";
import NoteContext from "./Notecontext";

const NoteState = (props) => {
  const host = "http://localhost:8000"
  const noteInitial = []
  const [notes, setNotes] = useState(noteInitial)

  // get all  notes
  const getnote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "jwtData": localStorage.getItem('token')
      }
    })
    const json = await response.json()
      // console.log(json)         
    setNotes(json)
  }
  // Add a note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "jwtData": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    const note = json
    setNotes(notes.concat(note))
  }

  // Delete a note
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "jwtData": localStorage.getItem('token')
      },
    });
    const json = response.json();
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a note
  const editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "jwtData": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title
        element.description = description
        element.tag = tag
        break
      }
    }
    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getnote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState