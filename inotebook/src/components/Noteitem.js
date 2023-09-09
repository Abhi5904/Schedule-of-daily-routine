import React, { useContext } from 'react'
import contextValue from '../context/notes/Notecontext'

const Noteitem = (props) => {
    const context = useContext(contextValue)
    const {deletenote} = context
    const { note,updateNote,showAlert } = props
    return (
        <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deletenote(note._id);showAlert("Deleted Successfully","success")}}></i><i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
