import {MdDeleteForever, MdEdit} from 'react-icons/md';

const Note = ({id, text, handleDeleteNote, handleEditClick, note}) => {
    return <div className='note'>
        <span>{text}</span>
        <div className="note-footer">
            <MdEdit className='edit-icon' size='1.3em' onClick={(event) => handleEditClick(event,note)} />
            <MdDeleteForever className='delete-icon' size='1.3em' onClick={() => handleDeleteNote(id, text)}/>
        </div>
    </div>;
};

export default Note;