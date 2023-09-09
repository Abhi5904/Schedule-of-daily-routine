import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/Notecontext'

const Addnote = (props) => {
    const context = useContext(noteContext)
    const {addnote} = context

    const [note,setNote] = useState({title:"",description:"",tag:"default"})
    const handleclick = (e)=>{
        e.preventDefault()
        addnote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:"default"})
        props.showAlert("Added Successfully","success")
    }
    const onchange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
      }
  return (
    <div>
      <h1>Add a Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onchange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onchange}/>
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
      </form>
    </div>
  )
}

export default Addnote
