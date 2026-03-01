import React from 'react';
import './community.css'

export function Community() {

    const [communityLogins, setCommunityLogins] = React.useState([]);
    const [updates, setUpdates] = React.useState([]);

    React.useEffect(() => {
        const loginsText = localStorage.getItem('communityLogins');
        if (loginsText) {
            setCommunityLogins(JSON.parse(loginsText));
        }

        const updatesText = localStorage.getItem('communityWatchlist');
        if (updatesText) {
            setUpdates(JSON.parse(updatesText));
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
                Community Watchlist Updates:
            </div>
            <div id="community-updates">
                {updates.length > 0 ? (
                    updates.map((update, i) => (
                        update.user && (
                            <div key={i} className='user-event'>
                                <span className='text-info-bullet'>• </span>
                                <span className='text-info-name' style={{color: 'rgb(22, 206, 52)', fontStyle: 'italic'}}>{update.user}</span>
                                <span className='text-info-action'>{update.action}</span>
                                <span className='text-info-asset' style={{color: 'rgb(22, 206, 52)', fontWeight: 'bold'}}>{update.asset}</span>
                            </div>
                        )
                    ))
                ) : (
                    <div className='text-muted-italic'>No updates recorded</div>
                )}
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