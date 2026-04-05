import React, {useState, useEffect} from 'react';
import { DashNotifier, DashEvent } from './dashNotifier';
import TradingViewWidget from './TradingViewWidget';
import './dashboard.css'

export function Dashboard({userName}) {

    const [notifications, setNotifications] = React.useState([]);

    const [localMessage, setLocalMessage] = React.useState('');
  
    const [activeCharts, setActiveCharts] = React.useState({
            'CPI': false,
            'FEDFUNDS': false,
            'MANU': false
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

        fetch('/api/proxy/rate', { credentials: 'include'})
            .then(res => {
                if (res.status===401) throw new Error('Not logged in');
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
    fetch('/api/user-data', { credentials: 'include' })
        .then((res) => res.json())
        .then((userData) => {
            if (userData.watchlist) {
                setActiveCharts(userData.watchlist);
            }
        })
        .catch((err) => console.log("Database not reached yet:", err));
    }, []);

    React.useEffect(() => {
        DashNotifier.addHandler((event) => {
            if (event.from !== userName) {
                setNotifications((prev) => [event, ...prev]);
                setTimeout(() => {
                    setNotifications((prev) => prev.filter(n => n !== event));
                }, 5000);
            }
        });

        return () => {
            DashNotifier.removeHandler();
        };
    }, []);


    function onCheckboxChange(event) {
        const assetName = event.target.name;
        const isChecked = event.target.checked;

        const updatedCharts = {
            ...activeCharts,
            [assetName]: isChecked
        };
        setActiveCharts(updatedCharts);

        fetch('/api/save-watchlist-settings', {
            method: 'POST',
            body: JSON.stringify({watchlist: updatedCharts}),
            headers: {'Content-type': 'application/json'},
            credentials: 'include',
        });

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
    <main className="dashboard-page" style={{ overflowX: 'auto' }}>
              
        <div style={{ minWidth: '1300px', position: 'relative' }}>
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

            <div style={{ position: 'absolute', width: '280px', left: 0 }}>
                <h4>Select Your Watchlist</h4>
                <form>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="CPI" name="CPI" onChange={onCheckboxChange} checked={activeCharts['CPI']} />
                        <label className="form-check-label" htmlFor="CPI">Display CPI data</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="FEDFUNDS" name="FEDFUNDS" onChange={onCheckboxChange} checked={activeCharts['FEDFUNDS']} />
                        <label className="form-check-label" htmlFor="FEDFUNDS">Display FEDFUNDS data</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="MANU" name="MANU" onChange={onCheckboxChange} checked={activeCharts['MANU']} />
                        <label className="form-check-label" htmlFor="MANU">Display MANU data</label>
                    </div>
                </form>
                <div style={{minHeight: '90px', marginTop: '20px'}}>
                    {localMessage && (
                        <div className='alert alert-success' role='alert'>{localMessage}</div>
                    )}
                    {notifications.map((note, index) => (
                        <div key={index} className="alert alert-success shadow-lg border-0" style={{ minWidth: '300px' }}>
                            <strong>{note.from}</strong> 
                            <span> started tracking </span>
                            <span style={{ color: '#22ce34', fontWeight: 'bold' }}>{note.value.asset}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ paddingLeft: '310px', width: '100%' }}>
                <div style={{ width: '980px' }}>
                    {activeCharts['CPI'] && (
                        <div className='mb-4'>
                            <h5>CPI</h5>
                            <div style={{ width: '100%', maxWidth: '980px', marginLeft: 'auto', overflow: 'hidden' }}>
                                <div className='chart-box'>
                                    <iframe
                                        src="https://fred.stlouisfed.org/graph/graph-landing.php?g=1Tx1I&width=980&height=475"
                                        title="CPI Graph" 
                                        style={{ minWidth: '980px' }}
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    )}
                
                    {activeCharts['FEDFUNDS'] && (
                        <div className='mb-4'>
                            <h5>FEDFUNDS</h5>
                            <div style={{ width: '100%', maxWidth: '980px', marginLeft: 'auto', overflow: 'hidden' }}>
                                <div className='chart-box' style={{ width: '980px', minWidth: '980px' }}>
                                    <iframe 
                                        src="https://fred.stlouisfed.org/graph/graph-landing.php?g=1T5b1&width=980&height=475" 
                                        title="FEDFUNDS Graph"
                                        style={{ 
                                            width: '980px', 
                                            minWidth: '980px',
                                            height: '475px', 
                                            border: 'none' 
                                        }}
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeCharts['MANU'] && (
                        <div className='mb-4'>
                            <h5>MANU</h5>
                            <div style={{ width: '980px', marginLeft: 'auto', overflow: 'hidden' }}>
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
        credentials: 'include',
    })
    .then((response) => response.json())
    .then((data) => {
        setWatchlist(data.msg); 
        setTimeout(() => setWatchlist(''), 3000);
    })
}