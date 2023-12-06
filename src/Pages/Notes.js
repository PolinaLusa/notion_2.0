import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Utils/UserContext';
import { fetchNotesByUserId, deleteNoteById } from '../Requests/API';

const Notes = () => {
  const { loggedInUser } = useContext(UserContext);
  const [userNotes, setUserNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        if (!loggedInUser) return;

        const data = await fetchNotesByUserId(loggedInUser.id);
        setUserNotes(data || []);
      } catch (error) {
        console.error('Error fetching user notes:', error);
      }
    };

    if (loggedInUser) {
      fetchUserNotes();
    }
  }, [loggedInUser]);

  const deleteNote = async (noteId) => {
    try {
      const deleted = await deleteNoteById(noteId);
      if (deleted) {
        setUserNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      } else {
        throw new Error('Error deleting note');
      }
    } catch (error) {
      console.error(`Error deleting note with ID ${noteId}:`, error);
    }
  };

  const handleSignOutAndRedirect = () => {
    navigate('/signin');
  };

  return (
    <div className="container">
      <div className="menu">
        <Link to="/home" className="about">Home</Link>
        <Link to="/notes" className="notes">Notes</Link>
        <Link to="/signin" className="notes">Sign Out</Link>
      </div>
      <div className='box p-6'>
        <h2 className="text-center mb-4">Notes</h2>
        {userNotes.length > 0 ? (
          <ul className="notes-list">
            {userNotes.map((note) => (
              <li key={note.id} className="border p-4 mb-4 rounded">
                <h3 className="text-lg font-semibold">{note.title}</h3>
                <p>{note.createdAt}</p>
                <div className="note-icons mt-2">
                  <Link to={`/edit/${note.id}`}>
                    <span role="img" aria-label="Edit a note" className="mr-2 cursor-pointer">
                      ✏️
                    </span>
                  </Link>
                  <span
                    role="img"
                    aria-label="Delete a note"
                    className="cursor-pointer"
                    onClick={() => deleteNote(note.id)}
                  >
                    🗑
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center mb-4">You don't have any notes right now.</p>
        )}
        <hr className="my-4" />
        <Link to="/create-note" className="create">Create a note</Link>
      </div>
    </div>
  );
};

export default Notes;
