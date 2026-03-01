import React, {useState} from 'react';
import { DashNotifier, DashEvent } from './dashNotifier';

export function Dashboard({userName}) {

    const [localMessage, setLocalMessage] = useState('');
  
    

    function onCheckboxChange(event) {
        const assetName = event.target.name;
        const isChecked = event.target.checked;

        if (isChecked) {
            DashNotifier.broadcastEvent(userName, DashEvent.Watchlist, { 
                asset: assetName, 
                date: new Date().toLocaleTimeString() 
            });

            setLocalMessage(`You added ${assetName} to your watchlist`);
            setTimeout(() => {
                setLocalMessage('');
            }, 3000);

            console.log(`${userName} added ${assetName}`);
        
        }
    }

  return (

    <main className="container-fluid bg-secondary text-left">
      <h2>Your Dashboard</h2>

      {localMessage && (
        <div className='alert alert-success' role='alert'>
            {localMessage}
        </div>
      )}

      <div className="row align-items-center">
          <div className="col-md-6">
              <h4>Select Your Watchlist</h4>
                  <form>
                      <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="Consumer Price Index" name="CPI" onChange={onCheckboxChange} value="yes"></input>
                          <label className="form-check-label" for="Consumer Price Index">Display Consumer Price Index data</label>
                      </div>
                      <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="Federal Funds Rate" name="FEDFUNDS" onChange={onCheckboxChange} value="yes"></input>
                          <label className="form-check-label" for="Federal Funds Rate">Display Federal Funds Rate data</label>
                      </div>
                      <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="Apple" name="AAPL" onChange={onCheckboxChange} value="yes"></input>
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