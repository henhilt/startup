import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

{/*} import './authenticated.css'; --> */}

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
        method: 'delete',
    })
    .catch(() => {
      // Logout failed. Assuming offline
    })
    .finally(() => {
        localStorage.removeItem('userName');
        props.onLogout();
    });
  }

  return (
    <div>
        <div className='text-center'>
            <p> WELCOME BACK</p>
            <h2 className='display-6'>
                {props.userName}
            </h2>
        </div>
        <div className='d-flex justify-content-center gap-3 w-100 mt-2'>
        <Button variant='primary' onClick={() => navigate('/dashboard')}>
            Dashboard
        </Button>
        <Button variant='secondary' onClick={() => logout()}>
            Logout
        </Button>
        </div>
    </div>
  );
}
