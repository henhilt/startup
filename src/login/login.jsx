import React from 'react';

export function Login() {
  return (
      <main className="container-fluid bg-secondary text-center">
          <h3>Welcome to your personalized finance dashboard. </h3>
          <h5> Please login below. </h5>
          <form method="get" action="dashboard.html" className="mx-auto" >
              <div className="input-group mb-3">
                  <span className="input-group-text">Username:</span>
                  <input className="form-control" type="text" placeholder="user"/>
              </div>
              <div className="input-group mb-3">
                  <span className="input-group-text">Password:</span>
                  <input className="form-control" type="password" placeholder="*****"/>
              </div>
            <button className="btn btn-secondary" type="submit">Login</button>
            <button className="btn btn-secondary" type="submit">New User</button>
          </form>
      </main>
  );
}