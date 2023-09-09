import React, { useContext, useEffect, useRef, useState } from 'react'
import contextValue from '../context/notes/Notecontext'
import Noteitem from './Noteitem'
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const context = useContext(contextValue)
    const { notes, getnote, editnote } = context
    let navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('token')){
            getnote()
        }
        else{
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refclose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })    
    }
    const handleclick = (e) => {
        // console.log("Updating note", note)
        editnote(note.id, note.etitle, note.edescription, note.etag)
        refclose.current.click()
        props.showAlert("Updated Successfully","success")
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Addnote showAlert={props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onchange} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onchange} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onchange} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='row my-3'>
                <h2>Your Notes</h2>
                <div className="container">
                {notes.length === 0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem note={note} key={note._id} updateNote={updateNote} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}

export default Notes