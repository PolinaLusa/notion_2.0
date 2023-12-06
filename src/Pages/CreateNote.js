import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createNote } from '../Requests/API';
import { UserContext } from '../Utils/UserContext';

const CreateNote = () => {
  const { loggedInUser } = useContext(UserContext);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (noteTitle.trim() !== '' && noteContent.trim() !== '' && loggedInUser) {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];

      const noteData = {
        title: noteTitle,
        content: noteContent,
        userId: loggedInUser.id,
        createdAt: formattedDate,
      };

      try {
        const createdNote = await createNote(noteData); 
        console.log('Note successfully created:', createdNote);
        navigate(`/note/${createdNote.id}`);
      } catch (error) {
        console.error('Error creating note:', error);
      }
    } else {
      console.error('Error: Title and content cannot be empty.');
    }
  };

  const handleTitleChange = (e) => {
    setNoteTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setNoteContent(e.target.value);
  };

  const handleSignOutAndRedirect = () => {
    navigate('/signin');
  };

  return (
    <div>
      <div className="container">
        <div className="menu">
          <Link to="/home" className="about">Home</Link>
          <Link to="/notes" className="notes">Notes</Link>
          <Link to="/signin" className="notes" onClick={handleSignOutAndRedirect}>Sign Out</Link>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="box p-6">
        <h2 className="text-center mb-4">Create a note</h2>
        <hr></hr>
        <label htmlFor="title" className="block mb-2">Title</label>
        <input type="text" id="title" value={noteTitle} onChange={handleTitleChange} className="w-full py-2 px-4 mb-4 border rounded" />
        <label htmlFor="content" className="block mb-2">Content</label>
        <textarea
          id="content"
          rows="4"
          cols="50"
          value={noteContent}
          onChange={handleContentChange}
          className="w-full py-2 px-4 mb-4 border rounded"
        ></textarea>
        <button type="submit" className="create-note">Create a note</button>
      </form>
    </div>
  );
};

export default CreateNote;
