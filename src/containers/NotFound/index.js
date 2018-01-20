import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const NotFound = () => {
  return (
    <div className="screen-center">
    	<h1 className="title-main">This page does not exist.</h1>
    	<Link to="/childGroup" className="link-home">Go Home</Link>
    </div>
  );
}

export default NotFound;
