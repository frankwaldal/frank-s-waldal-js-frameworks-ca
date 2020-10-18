import { Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const listItemStyle = {
  listStyle: 'none',
  margin: '0 0.5rem',
}

export default function SiteHeader() {
  return(
    <header style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant='h4' component='h1'>JS Frameworks CA</Typography>
      <nav>
        <ul style={{ display: 'flex' }}>
          <li style={listItemStyle}>
            <Link to='/' className='muiStyleButton muiStyleButton muiStyleButton-text muiStyleButton-textPrimary muiStyleButton-textSizeLarge muiStyleButton-sizeLarge'>Home</Link>
          </li>
          <li style={listItemStyle}>
            <Link to='/favorites' className='muiStyleButton muiStyleButton muiStyleButton-text muiStyleButton-textPrimary muiStyleButton-textSizeLarge muiStyleButton-sizeLarge'>Favorites</Link>
          </li>
          <li style={listItemStyle}>
            <Link to='/contact' className='muiStyleButton muiStyleButton muiStyleButton-text muiStyleButton-textPrimary muiStyleButton-textSizeLarge muiStyleButton-sizeLarge'>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
