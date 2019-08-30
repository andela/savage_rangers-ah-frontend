import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Common/NavProfile/navbar';

const NotFound = () => (
  <div className="notFound">
    <Navbar />
    <h1 className="notFound__number">404</h1>
    <p className="notFound__pagenotfound">PAGE NOT FOUND</p>
    <Link to="/" className="notFound__linkback">
      Back to Homepage
    </Link>
  </div>
);
export default NotFound;
