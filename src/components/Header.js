import React, { useContext } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { FirebaseContext } from '../firebase';
function Header() {
  const { user, firebase } = useContext(FirebaseContext);
  return (
    <div className='header'>
      <div className='flex'>
        <img src='/logo.png' alt='hooks news logo' className='logo' />
        <NavLink to='/' className='header-title'>
          Hooks News
        </NavLink>
        <NavLink to='/' className='header-link'>
          New
        </NavLink>
        <div className='divider'></div>
        <NavLink to='/top' className='header-link'>
          Top
        </NavLink>
        <div className='divider'></div>
        <NavLink to='/search' className='header-link'>
          Serach
        </NavLink>
        {user && (
          <>
            <div className='divider'></div>
            <NavLink to='/create' className='header-link'>
              Submit
            </NavLink>
          </>
        )}
      </div>
      <div className='flex'>
        {user ? (
          <>
            <div className='header-name'>{user.displayName}</div>
            <div className='divider'></div>
            <div className='header-button' onClick={() => firebase.logout()}>
              logout
            </div>
          </>
        ) : (
          <NavLink to='/login' className='header-link'>
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default withRouter(Header);
