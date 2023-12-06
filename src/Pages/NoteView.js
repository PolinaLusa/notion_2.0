import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import{ fetchNoteById, deleteNoteById }from '../Requests/API';
const NoteView = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await fetchNoteById(noteId); 
        setNote(data);
      } catch (error) {
        console.error('Error fetching note:', error);
        navigate('*');
      }
    };

    fetchNote();
  }, [noteId, navigate]);

  const handleDeleteNote = async () => {
    try {
      const deleted = await deleteNoteById(noteId); 
      if (deleted) {
        navigate('/notes');
      } else {
        throw new Error('Error deleting note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  const processedContent = note.content ? note.content.split('\n').map((item, index) => (
    <span key={index}>
      {item}
      <br />
    </span>
  )) : null;

  return (
    <div className="container">
      <div className="menu">
        <Link to="/home" className="about">Home</Link>
        <Link to="/notes" className="notes">Notes</Link>
        <Link to="/signin" className="notes">Sign Out</Link>
      </div>
      <div className='box p-6'>
        <h2 className='text-2xl mb-4'>Note View</h2>
        <hr className='my-4'></hr>
        <h2 className='text-xl font-bold mb-2'>Title: {note.title}</h2>
        <p className='mb-4'>Content: {processedContent}</p>
        <div className="note-actions">
          <Link to={`/edit/${noteId}`} className="edit-note bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Edit</Link>
          <button onClick={handleDeleteNote} className="delete-note bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </div>
        <Link to="/notes" className="back text-blue-500 hover:text-blue-600">Back to notes</Link>
      </div>
    </div>
  );
};

export default NoteView;
