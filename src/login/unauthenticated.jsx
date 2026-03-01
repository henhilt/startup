import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }

    async function createUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }

    return (
        <>
            <div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Username:</span>
                    <input className="form-control" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="user"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Password:</span>
                    <input className="form-control" type="password"  onChange={(e) => setPassword(e.target.value)} placeholder="*****"/>
                </div>
                <Button variant='primary' onClick={() => loginUser()} disabled={!userName || !password}>
                    Login
                </Button>
                <Button variant='primary' onClick={() => createUser()} disabled={!userName || !password}>
                    New User
                </Button>
            </div>
                    
            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}