import React from 'react';
import './community.css'

export function Community() {

    const [communityLogins, setCommunityLogins] = React.useState([]);

    React.useEffect(() => {
        const loginsText = localStorage.getItem('communityLogins');
        if (loginsText) {
            setCommunityLogins(JSON.parse(loginsText));
        }
    }, []);

    const loginRows = [];
    if (communityLogins.length) {
        for (const [i, login] of communityLogins.entries()) {
            loginRows.push(
                <tr key={i}>
                    <td>{i+1}</td>
                    <td>{login.name}</td>
                    <td>{login.time}</td>
                </tr>
            )
        }
    } else {
        loginRows.push(
            <tr key = '--'>
                <td colSpan='3'> Be the first to login</td>
            </tr>
        );
    }


  return (
    <main className="container-fluid bg-secondary text-left">
        <h2>Community</h2>

            <div id="picture" className="picture-box"><img width="400px" height="200px" src="wallstreet.jpg" alt="random" /></div>

            <div className="users">
            Community Watchlist:
            <span className="user-name">User1</span>
            </div>
            <div id="community-updates">
                <div className="user-event">Joe started tracking CPI</div>
                <div className="system-event">Guy logged on</div>
                <div className="user-event">William started tracking FEDFUNDS</div>
            </div>
            <hr />

            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Last Login</th>
                    </tr>
                </thead>
                <tbody>
                    {loginRows}
                </tbody>
            </table>
  </main>
  );
}