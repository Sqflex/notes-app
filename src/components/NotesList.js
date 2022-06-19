import Note from './Note';
import AddNote from './AddNote';
import EditNote from './EditNote';
import { Fragment } from 'react';

const NotesList = ({ notes, handleAddNote, handleDeleteNote, 
    handleEditClick, handleSaveClick, editNoteId, editFormData, handleEditFormChange, 
    handleEditFormSubmit }) => {
    return <div className="notes-list">
        {notes.map((note) => (
            <Fragment>
                {editNoteId === note.id ? <EditNote 
                handleSaveClick={handleSaveClick} 
                handleDeleteNote={handleDeleteNote} 
                editFormData={editFormData}  
                handleEditFormChange={handleEditFormChange} 
                handleEditFormSubmit={handleEditFormSubmit}/> : 
                <Note id={note.id} text={note.text} handleDeleteNote={handleDeleteNote} 
                handleEditClick={handleEditClick} note={note}/>}
            </Fragment>
        )
        )}
        <AddNote handleAddNote={handleAddNote}/>
    </div>
};

export default NotesList;