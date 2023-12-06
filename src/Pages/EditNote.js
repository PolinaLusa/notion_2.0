import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchNoteById, updateNoteById } from '../Requests/API'; 

const EditNote = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await fetchNoteById(noteId); 
        setNote(data);
        setEditedTitle(data.title);
        setEditedContent(data.content);
      } catch (error) {
        console.error('Error fetching note:', error);
        navigate('*');
      }
    };

    fetchNote();
  }, [noteId, navigate]);

  const handleUpdate = async () => {
    const updatedNote = {
      title: editedTitle,
      content: editedContent,
    };

    const updated = await updateNoteById(noteId, updatedNote);
    if (updated) {
      navigate(`/note/${noteId}`);
    }
  };

  if (!note) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <div className="menu">
        <Link to="/home" className="about">
          Home
        </Link>
        <Link to="/notes" className="notes">
          Notes
        </Link>
        <Link to="/signin" className="notes">Sign Out</Link>
      </div>
      <div className="box p-20 w-96 rounded bg-white">
        <h2>Edit Note</h2>
        <hr />
        <label htmlFor="edited-title">Title:</label>
        <input
          type="text"
          id="edited-title"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <label htmlFor="edited-content">Content:</label>
        <textarea
          id="edited-content"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        ></textarea>
        <button onClick={handleUpdate} style={{ fontSize: '16px' }} className="create">Save changes</button>
        <Link to={`/note/${noteId}`} className="back text-blue-500 hover:text-blue-600">
          Back to note view
        </Link>
      </div>
    </div>
  );
};

export default EditNote;