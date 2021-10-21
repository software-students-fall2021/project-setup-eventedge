import React from 'react';
import {Link} from 'react-router-dom';

export const NotFound = () => (
  <>
    <h2>Whoops! Page not found.</h2>
    <Link to="/">
      <a>Go back home.</a>
    </Link>
  </>
);
