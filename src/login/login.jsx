import React from 'react';
import { AuthState } from './authState';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';


export function Login({ userName, authState, onAuthChange }) {
  return (
      <main className="container-fluid bg-secondary text-center">
            {authState !== AuthState.Unknown && <h1>Welcome to your personalized finance dashboard. </h1>}
            {authState === AuthState.Authenticated && (
                <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
            )}
            {authState === AuthState.Unauthenticated && (
                <Unauthenticated
                    userName={userName}
                    onLogin={(loginUserName) => {
                        onAuthChange(loginUserName, AuthState.Authenticated);
                    }}
                />
            )}
            

      </main>
  );
}