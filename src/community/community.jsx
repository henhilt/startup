import React from 'react';
import './community.css'

export function Community() {
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
                      <th>Name</th>
                      <th>Last Login</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>William Petersen</td>
                      <td>Jan 19, 2026</td>
                  </tr>
                  <tr>
                      <td>Guy Pierce</td>
                      <td>Jan 17, 2026</td>
                  </tr>
                  <tr>
                      <td>Joe Pantoliano</td>
                      <td>Jan 16, 2026</td>
                  </tr>
              </tbody>
          </table>
  </main>
  );
}