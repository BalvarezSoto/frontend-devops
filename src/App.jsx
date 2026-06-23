import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [health, setHealth] = useState(null);
  const [data, setData] = useState([]);
  const [loadingHealth, setLoadingHealth] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const [errorHealth, setErrorHealth] = useState(null);
  const [errorData, setErrorData] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Fetch server health status
    fetch(`${API_URL}/api/health`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((resData) => {
        setHealth(resData);
        setLoadingHealth(false);
      })
      .catch((err) => {
        console.error('Error fetching health status:', err);
        setErrorHealth(err.message);
        setLoadingHealth(false);
      });

    // Fetch sample data
    fetch(`${API_URL}/api/data`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((resData) => {
        setData(resData);
        setLoadingData(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setErrorData(err.message);
        setLoadingData(false);
      });
  }, [API_URL]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>DevOps Frontend Dashboard</h1>
        <div className="env-badge">
          Environment: <span>{import.meta.env.MODE.toUpperCase()}</span>
        </div>
      </header>

      <main className="app-main">
        {/* Connection Configuration Details */}
        <section className="card config-card">
          <h2>API Connection Settings</h2>
          <p>
            Connected to API URL: <code>{API_URL}</code>
          </p>
          <div className="status-indicators">
            <div className="indicator-item">
              <span className="label">Health API:</span>
              <span className={`badge ${errorHealth ? 'badge-error' : loadingHealth ? 'badge-loading' : 'badge-success'}`}>
                {errorHealth ? 'Error' : loadingHealth ? 'Checking...' : 'Connected'}
              </span>
            </div>
            <div className="indicator-item">
              <span className="label">Data API:</span>
              <span className={`badge ${errorData ? 'badge-error' : loadingData ? 'badge-loading' : 'badge-success'}`}>
                {errorData ? 'Error' : loadingData ? 'Loading...' : 'Loaded'}
              </span>
            </div>
          </div>
        </section>

        {/* Server Health Section */}
        <section className="card health-card">
          <h2>Server Health status (`/api/health`)</h2>
          {loadingHealth ? (
            <p className="loading-text animate-pulse">Loading status...</p>
          ) : errorHealth ? (
            <div className="alert alert-danger">
              <strong>Error connecting to backend:</strong> {errorHealth}
              <p className="help-text">Verify backend container is running on {API_URL}</p>
            </div>
          ) : (
            <div className="health-details">
              <div className="detail-row">
                <span className="label">Status:</span>
                <span className="value status-ok">{health?.status}</span>
              </div>
              <div className="detail-row">
                <span className="label">Uptime:</span>
                <span className="value">{health?.uptime?.toFixed(2)} seconds</span>
              </div>
              <div className="detail-row">
                <span className="label">Timestamp:</span>
                <span className="value">{new Date(health?.timestamp).toLocaleString()}</span>
              </div>
            </div>
          )}
        </section>

        {/* Server Data Section */}
        <section className="card data-card">
          <h2>Backend Data (`/api/data`)</h2>
          {loadingData ? (
            <p className="loading-text animate-pulse">Loading backend elements...</p>
          ) : errorData ? (
            <div className="alert alert-danger">
              <strong>Error fetching data:</strong> {errorData}
            </div>
          ) : data.length === 0 ? (
            <p className="no-data">No elements returned from the backend.</p>
          ) : (
            <div className="data-grid">
              {data.map((item) => (
                <div key={item.id} className="data-item">
                  <div className="data-header">
                    <span className="item-id">#{item.id}</span>
                    <h3>{item.name}</h3>
                  </div>
                  <p className="item-desc">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>Continuous Integration & Deployment ready with SonarQube & Jenkins.</p>
      </footer>
    </div>
  );
}

export default App;
