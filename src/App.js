import React, { useEffect } from "react";
import { useState } from "react";
import NoteList from './components/NotesList';
import Search from "./components/Search";
import TagInput from "./components/TagInput";

const App = () => {
  const[notes,setNotes] = useState([]);
  const[editNoteId,setEditNoteId] = useState(null); // for access to edit note
  const[searchText, setSearchText] = useState('');
  const[editFormData, setEditFormData] = useState({
    id: '',
    text: '',
  }); 
  const [tags, setTags] = useState([]);

  useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
    const savedTags = JSON.parse(localStorage.getItem('react-notes-app-tags'));

		if (savedNotes) {
			setNotes(savedNotes);
		}
    if(savedTags) {
      setTags(savedTags);
    }
	}, []);

  useEffect(() => {
      localStorage.setItem('react-notes-app-tags',JSON.stringify(tags));
  }, [tags]);

  function handleKeyDown(event) {
      if(event.key !== 'Enter') return;
      const value = event.target.value;

      const newTag = {
        name: value,
        value: value,
      }

      if(!value.trim()) return;
      setTags([...tags, newTag]);
      event.target.value = '#';
      localStorage.setItem('react-notes-app-tags', JSON.stringify(tags));
  }

  const removeTag = (index) => {
      setTags(tags.filter((el, i) => i !== index));
      localStorage.setItem('react-notes-app-tags', JSON.stringify(tags));
  }

  const AddNote = (text) => {
    const newNote = {
      id: Math.random(),
      text : text,
    }
    const newNotes = [...notes, newNote]
    setNotes(newNotes);
    localStorage.setItem('react-notes-app-data', JSON.stringify(newNotes));
  }

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = {...editFormData};
    newFormData[fieldName] = fieldValue;;

    setEditFormData(newFormData);
  }

  const handleEditFormSubmit = (event) => {
    let j = 0;
    let tagString = [];
    let flag = false;
    event.preventDefault();

    const editedNote = {
      id: editNoteId,
      text: editFormData.text,
    }

    for (let i = 0; i < editFormData.text.length; i++) {
      if (editFormData.text[i] === '#') flag = true;

      if (flag && editFormData.text[i] !== 'null') {
        if (tagString[j] === undefined) {
          tagString[j] = '';
        }
        tagString[j] += editFormData.text[i];
        if (editFormData.text[i+1] === ' ' || editFormData.text[i+1] === ',' || editFormData.text[i+1] ==='/') {
          flag = false;
          j++;
        }
      } 
    }

    let newTagString = [];
    let checkTag = false;

    for (let i = 0; i < tagString.length; i++) {
      tags.forEach(tag => {
        if (tag.value === tagString[i]) {
          checkTag = true;
        }
      })
      if (!checkTag) {
        newTagString.push(tagString[i]);
      }
      checkTag = false;
    }
    
    setTags([...tags, ...newTagString.map(str => {
        return {
          name: str,
          value: str,
        }; 
    })]);
    
    localStorage.setItem('react-notes-app-tags', JSON.stringify(tags));

    const newNotes = [...notes];

    const index = notes.findIndex((note) => note.id === editNoteId);

    newNotes[index] = editedNote;

    setNotes(newNotes);
    setEditNoteId(null);
    localStorage.setItem('react-notes-app-data',JSON.stringify(newNotes));
  }

  const handleEditClick = (event, note) => {
    event.preventDefault();
    setEditNoteId(note.id);

    const formValues = {
      id: note.id,
      text: note.text,
    }

    setEditFormData(formValues);
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    localStorage.setItem('react-notes-app-data',JSON.stringify(newNotes));
  }

  return <>
    <h1 className="notes-title">Notes</h1>
    <div className="container">
      <Search handleSearchNote={setSearchText}
      tags={tags}/>
      <NoteList
      notes={notes.filter((note) => note.text.toLowerCase().includes(searchText.toLowerCase()))} 
      handleAddNote={AddNote}
      handleDeleteNote={deleteNote}
      handleEditClick={handleEditClick}
      editNoteId={editNoteId}
      editFormData={editFormData}
      handleEditFormChange={handleEditFormChange}
      handleEditFormSubmit={handleEditFormSubmit}/>
      <TagInput tags={tags}
      handleKeyDown={handleKeyDown}
      removeTag={removeTag}/>
    </div> 
  </> 
}

export default App;