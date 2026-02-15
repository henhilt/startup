import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Community } from './community/community';

export default function App() { 
  return (
    <BrowserRouter>
        <div className="body bg-dark text-light">
            <header className="container-fluid">
                <nav className="navbar fixed-top navbar-dark bg-dark text-light">
                    <div className="navbar-brand">
                        Finance Dashboard
                    </div>
                    <menu className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link active" to='/'>
                                Login
                            </NavLink></li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='dashboard'>
                                Dashboard
                            </NavLink></li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='community'>
                                Community
                            </NavLink></li>
                    </menu>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/community' element={<Community />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="bg-dark text-white-50">
                <div className="container-fluid">
                <span className="text-reset">Author Name(s): HSH</span>
                <a className="text-reset" href="https://github.com/henhilt/startup/">GitHub</a>
                </div>
            </footer>

        </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}