import React from 'react';
import { AuthState } from './authState';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';


export function Login({ userName, authState, onAuthChange }) {
    
    function updateLastLogin(loginUserName) {
        const savedLogins = localStorage.getItem('communityLogins');
        let loginList = savedLogins ? JSON.parse(savedLogins) : [];

        const newEntry = {
            name: loginUserName,
            time : new Date().toLocaleString([], {
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit'
            })
        };

        {/*removes previous entries for user and moves to top of the list*/}
        loginList = loginList.filter(user => user.name !== loginUserName);
        loginList.unshift(newEntry);
        
        if (loginList.length > 5) loginList.length = 5;
        localStorage.setItem('communityLogins', JSON.stringify(loginList));

    }
  
  
    return (
      <main className="container-fluid bg-secondary text-center">
           
            <div className="d-flex flex-column align-items-center" style={{ gap: '1.5rem' }}>
                <div className='text-center mb-5'>
                    {authState !== AuthState.Unknown &&
                        <h1>Welcome to your personalized finance dashboard.</h1>
                    }
                </div>
                
                <div className="card bg-dark text-white p-4 shadow-lg border-0" style={{ minWidth: '350px', borderRadius: '15px' }}>
                    {authState === AuthState.Authenticated && (
                        <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
                    )}

                    {authState === AuthState.Unauthenticated && (
                        <Unauthenticated
                            userName={userName}
                            onLogin={(loginUserName) => {
                                updateLastLogin(loginUserName);
                                onAuthChange(loginUserName, AuthState.Authenticated);
                            }}
                        />
                    )}
                </div>
            </div>
      </main>
  );
}