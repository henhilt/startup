import React, {useState} from 'react';
import { DashNotifier, DashEvent } from './dashNotifier';

export function Dashboard({userName}) {

    const [localMessage, setLocalMessage] = useState('');
  
    const [activeCharts, setActiveCharts] = useState({
        'CPI': false,
        'FEDFUNDS': false,
        'AAPL': false
    });

    function onCheckboxChange(event) {
        const assetName = event.target.name;
        const isChecked = event.target.checked;

        setActiveCharts(prev => ({
            ...prev,
            [assetName]: isChecked
        }));

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

        

        <div className="row align-items-start">
            <div className="col-md-4 text-start">
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
                <div style={{minHeight: '90px'}}>
                    {localMessage && (
                    <div className='alert alert-success' role='alert'>
                        {localMessage}
                    </div>
                    )}
                </div>
            </div>
            <div className="col-md-8 text-end">
                <div id='chartArea' className="text-end" style={{minHeight: '100vh', minWidth: '400px'}}>
                    {activeCharts['CPI'] && (
                    <div className='mb-4'>
                        <h5>CPI</h5>
                        <img width="400px" height="200px" src="CPIfred.png" alt="random" />
                    </div>
                    )}
                
                    {activeCharts['FEDFUNDS'] && (
                    <div className='mb-4'>
                        <h5>FEDFUNDS</h5>
                        <img width="400px" height="200px" src="FEDFUNDSfred.png" alt="random" />
                    </div>
                    )}

                    {activeCharts['AAPL'] && (
                    <div className='mb-4'>
                        <h5>AAPL</h5>
                        <img width="400px" height="200px" src="AAPLchart.png" alt="random" />
                    </div>
                    )}
                </div> 
            </div>
        </div>
    </main>
  );
}