import React from 'react';
import {Button} from 'react-bootstrap'
import './community.css'

export function Community() {

    const [communityLogins, setCommunityLogins] = React.useState([]);
    const [updates, setUpdates] = React.useState(() => {
        const saved = localStorage.getItem('community_cache');
        return saved ? JSON.parse(saved) : [];
    });

    React.useEffect(() => {

        function fetchUpdates() {
            fetch('/api/community-updates')
                .then((response) => response.json())
                .then((data) => setUpdates(data));

                fetch('/api/logins')
                    .then((res) => res.json())
                    .then((data) => setCommunityLogins(data)); 
        }
        
        fetchUpdates();
        const interval = setInterval(fetchUpdates, 5000)
        return () => clearInterval(interval);
    }, []);

/* simon test
    function handleClick() {
        console.log('Button clicked');
        fetch('/api/test')
            .then((response) => response.json())
            .then((testing) => {
            console.log(testing);
            console.log(testing.test);
            setTestStuff(testing.test);
            });
    }
*/

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
                    {communityLogins.length > 0 ? (
                        communityLogins.map((login, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td style={{ color: 'rgb(22, 206, 52)' }}>{login.name}</td>
                                <td>{login.time}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">Be the first to login</td>
                        </tr>
                    )}
                </tbody>
            </table>
  </main>
  );
}