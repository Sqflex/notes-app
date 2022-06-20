import { useState } from "react";

const AddNote = ({handleAddNote}) => {
    const [noteText, setNoteText] = useState('');
    const characterLimit = 200;

    const handleChange = (event) => {
        if(characterLimit - event.target.value.length >= 0){
            setNoteText(event.target.value);
        }
    }

    const handleSaveClick = (event) => {
        if(noteText.trim.length >= 0){
            handleAddNote(noteText);
            setNoteText('');
        }
    }

    return ( 
    <div className="note new">
        <textarea  
            placeholder="Type to add a note here..."
            value={noteText}
            onChange={handleChange}
        ></textarea>
        <div className="note-footer add">
            <small>{characterLimit - noteText.length} Symbols remaining</small>
            <button className='save' onClick={handleSaveClick}>Save</button>
        </div>
    </div>
    );
}

export default AddNote;