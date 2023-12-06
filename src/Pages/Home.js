import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from'../Utils/UserContext';

const Home = ({ setLoggedIn, location }) => {
  const { loggedIn } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (loggedIn && currentUser && currentUser.email) {
      setUser(currentUser);
    }
  }, [loggedIn]);

  const formattedDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString))) {
      return 'Registration Date is unavailable';
    }

    const parsedDate = new Date(dateString);
    return parsedDate.toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    setLoggedIn(false);
    setUser(null);
    navigate('/signin');
  };

  return (
    <div className="container bg-lavender flex items-center justify-center cursor-pointer">
      <div className="welcome text-left p-10">
        {user ? (
          <div>
            <h3>Welcome, {user.email}!</h3>
          </div>
        ) : (
          <h1>User not logged in</h1>
        )}
      </div>
      <div className="box p-20 w-96 rounded bg-white">
        <h2 className="text-center">About me</h2>
        <hr />
        {user && (
          <div className="email-date">
            <p>Email: {user.email}</p>
            <p>Registered on: {formattedDate(user.createdAt)}</p>
            <Link to="/notes" className="go-to-notes">
              Go to Notes
            </Link>
          </div>
        )}
      </div>
      <div className="menu ">
        <Link to="/home" className="about">
          Home
        </Link>
        <Link to="/notes" className="notes">
          Notes
        </Link>
        <Link to="/signin" className="notes">Sign Out</Link>
      </div>
    </div>
  );
};

export default Home;