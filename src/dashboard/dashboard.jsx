import React, {useState, useEffect} from 'react';
import { DashNotifier, DashEvent } from './dashNotifier';
import TradingViewWidget from './TradingViewWidget';
import './dashboard.css'

export function Dashboard({userName}) {

    const [localMessage, setLocalMessage] = React.useState('');
  
    const [activeCharts, setActiveCharts] = React.useState(() => {
        const userKey = `watchlist_${userName}`;
        const saved = localStorage.getItem(userKey);
        const initialValue = JSON.parse(saved);

        return initialValue || {
            'CPI': false,
            'FEDFUNDS': false,
            'MANU': false
        };
    });

    const [FEDFUNDS, setFedRate] = React.useState('...');
    const [CPILevel, setCPILevel] = React.useState('...');

   React.useEffect(() => {
        fetch('/api/proxy/inflation')
            .then(res => res.json())
            .then(data => {
                if (data.rate) {
                    setCPILevel(data.rate);
                } else {
                    throw new Error("No rate in response");
                };
            })
            .catch(() => setCPILevel("(Error)"));

        fetch('/api/proxy/rate')
            .then(res => {
                if (!res.ok) throw new Error('Network error');
                return res.json();
            })
            .then(data => {
                if (data.rate) {
                    setFedRate(data.rate);
                }
            })
            .catch((err) => {
                console.error("FedFunds Fetch Error:", err);
                setFedRate("(Error)"); 
            });
    }, []);

    const [manuPrice, setManuPrice] = React.useState('Loading...');

    React.useEffect(() => {
        fetch('/api/proxy/manu')
            .then(res => res.json())
            .then(data => setManuPrice(data.price))
            .catch(() => setManuPrice("Market Closed"));
    }, []);

    React.useEffect(() => {
        const userKey = `watchlist_${userName}`;
        localStorage.setItem(userKey, JSON.stringify(activeCharts));}, [activeCharts, userName]);

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


            saveCommunityWatchlist(userName, assetName, setLocalMessage)

            console.log(`${userName} added ${assetName}`);
        }
    }

  return (

    <main className="dashboard-page container-fluid text-left">
        <br/>
        <h2>Your Dashboard</h2>
        <div className="d-flex flex-wrap gap-2 mt-2 mb-3">
            {activeCharts['MANU'] && (
                <span className="badge bg-dark">
                    Live MANU Price: <span style={{ color: '#22ce34' }}>{manuPrice}</span>
                </span>
            )}

            {activeCharts['CPI'] && (
                <span className="badge bg-dark">
                    Current CPI Level: <span style={{ color: '#22ce34' }}>{CPILevel}</span>
                </span>
            )}

            {activeCharts['FEDFUNDS'] && (
                <span className="badge bg-dark">
                    Current FEDFUNDS Rate: <span style={{ color: '#22ce34' }}>{FEDFUNDS}</span>
                </span>
            )}
        </div>
                

        <div className="row align-items-start">
            <div className="col-md-4 text-start">
                <h4>Select Your Watchlist</h4>
                <form>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="Consumer Price Index" name="CPI" onChange={onCheckboxChange} checked={activeCharts['CPI']}></input>
                        <label className="form-check-label" htmlFor="Consumer Price Index">Display Consumer Price Index data</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="Federal Funds Rate" name="FEDFUNDS" onChange={onCheckboxChange} checked={activeCharts['FEDFUNDS']}></input>
                        <label className="form-check-label" htmlFor="Federal Funds Rate">Display Federal Funds Rate data</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="Manchester United" name="MANU" onChange={onCheckboxChange} checked={activeCharts['MANU']}></input>
                        <label className="form-check-label" htmlFor="Manchester United">Display MANU data</label>
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
                <div id='chartArea' className="text-end" style={{ minHeight: 'fit-content' }}>
                    {activeCharts['CPI'] && (
                    <div className='mb-4'>
                        <h5>CPI</h5>
                        <div className='chart-box'>
                            <iframe
                                src="https://fred.stlouisfed.org/graph/graph-landing.php?g=1Tx1I&width=670&height=475"
                                style={{ width: '100%', height: '400px', border: 'none' }}
                                frameBorder="0"
                                title="CPI Graph">
                            </iframe>
                        </div>
                    </div>
                    )}
                
                    {activeCharts['FEDFUNDS'] && (
                    <div className='mb-4'>
                        <h5>FEDFUNDS</h5>
                            <div className='chart-box'>
                                <iframe 
                                    src="https://fred.stlouisfed.org/graph/graph-landing.php?g=1T5b1&width=670&height=475" 
                                    style={{ width: '100%', height: '400px', border: 'none' }}
                                    frameBorder="0"
                                    title="FEDFUNDS Graph"
                                ></iframe>
                            </div>
                        </div>
                    )}

                    {activeCharts['MANU'] && (
                        <div className='mb-4'>
                            <h5>MANU</h5>
                            {/* We put the width constraint here, NOT inside the widget component */}
                            <div style={{ width: '100%', maxWidth: '670px', marginLeft: 'auto', overflow: 'hidden' }}>
                                <TradingViewWidget />   
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </main>
  );
}

function saveCommunityWatchlist(userName, assetName, setWatchlist) {
    const newUpdate = {
        user: userName,
        action: ' started tracking ',
        asset: assetName,
    };

    fetch('/api/update-watchlist', {
        method: 'POST',
        body: JSON.stringify(newUpdate),
        headers: { 'Content-type': 'application/json' },
    })
    .then((response) => response.json())
    .then((data) => {
        setWatchlist(data.msg); 
        setTimeout(() => setWatchlist(''), 3000);
    })
}