import Registration from './Components/Registration.js';
import SignIn from './Components/SignIn.js';
import Footer from './Components/Footer.js';
import Home from './Pages/Home.js';
import Notes from './Pages/Notes.js';
import CreateNote from './Pages/CreateNote.js';
import EditNote from './Pages/EditNote.js';
import NoteView from './Pages/NoteView.js';
import NotFound from './Pages/NotFound.js';
import { UserProvider } from './Utils/UserContext.js';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './style.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    fetch('http://localhost:5001/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data.users || []);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const yourSetLoggedInFunction = (value) => {
    setIsLoggedIn(value);
  };

  return (
    <Router>
      <UserProvider value={{ currentUser, setCurrentUser, isLoading }}>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/home"
            element={<Home
              users={users}
              isLoading={isLoading}
              setCurrentUser={setCurrentUser}
              setLoggedIn={yourSetLoggedInFunction}
              isLoggedIn={isLoggedIn}
            />}
          />
          <Route path="/notes" element={<Notes users={users} isLoading={isLoading} />} />
          <Route path="/create-note" element={<CreateNote />} />
          <Route path="/note/:noteId" element={<NoteView />} /> 
          <Route path="/edit/:noteId" element={<EditNote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </UserProvider>
    </Router>
  );
};

export default App;
