import React from 'react';

export function Dashboard() {
  return (
    <main className="container-fluid bg-secondary text-left">
      <h2>Your Dashboard</h2>
      <div className="row align-items-center">
          <div className="col-md-6">
              <h4>Select Your Watchlist</h4>
                  <form>
                      <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="Consumer Price Index" name="CPI" value="yes"></input>
                          <label className="form-check-label" for="Consumer Price Index">Display Consumer Price Index data</label>
                      </div>
                      <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="Federal Funds Rate" name="FEDFUNDS" value="yes"></input>
                          <label className="form-check-label" for="Federal Funds Rate">Display Federal Funds Rate data</label>
                      </div>
                      <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="Apple" name="AAPL" value="yes"></input>
                          <label className="form-check-label" for="Apple">Display Apple data</label>
                      </div>
                  </form> 
          </div>
          <div className="col-md-6"> 
              <div id="picture" className="picture-box">
                  <img width="400px" height="200px" src="CPIfred.png" alt="random" /></div>
          </div> 
      </div>
  </main>
  );
}