import React from 'react';
import { Link } from 'react-router-dom';
import FriendsList from '../components/FriendsList';
import ForumsList from '../components/ForumList';

export default function HomePage() {
  return (
    <div className="w-full">
      <div className="flex justify-around items-start h-20 mb-10">
        <Link to="/">
          <h2 className="mr-4">Home</h2>
        </Link>
        <Link to="/signin">
          <h2 className="mr-4">Sign In</h2>
        </Link>
        <Link to="/register">
          <h2 className="mr-4">Register</h2>
        </Link>
      </div>
      <div className="flex flex-row justify-around mt-10">
        <ForumsList />
        <FriendsList />
      </div>
    </div>
  );
}













