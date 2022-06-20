// import { useState, useEffect} from 'react';
//import ContentEditable from 'react-contenteditable';

const EditNote = ({editFormData, handleEditFormChange, handleEditFormSubmit}) => {
    return <div className="note edit">
        <textarea
            name='text' 
            placeholder="Type to add a note here..."
            value={editFormData.text}
            onChange={handleEditFormChange}
        ></textarea>
        {/* <div suppressContentEditableWarning={true} contentEditable={true} 
        placeholder="Type to add a note here..." className='textarea-edit' 
        onKeyDown={(e) => handleEditFormChange(e)}>{editFormData.text}</div> */}
        <div className="note-footer add">
            <button className='save' onClick={handleEditFormSubmit}>Save</button>
        </div>
    </div>
};

export default EditNote;