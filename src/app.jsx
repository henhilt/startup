import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className="body bg-dark text-light">
    <header className="container-fluid">
            <nav className="navbar fixed-top navbar-dark bg-dark text-light">
                <a className="navbar-brand" href="#">Finance Dashboard </a>
                <menu className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" href="index.html">Login</a></li>
                    <li className="nav-item">
                        <a className="nav-link" href="dashboard.html">Dashboard</a></li>
                    <li className="nav-item">
                        <a className="nav-link" href="community.html">Community</a></li>
                </menu>
            </nav>
        </header>

        <main> App components go here</main>

        <footer className="bg-dark text-white-50">
            <div className="container-fluid">
            <span className="text-reset">Author Name(s): HSH</span>
            <a className="text-reset" href="https://github.com/henhilt/startup/">GitHub</a>
            </div>
        </footer>

    </div>;
}