import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We use /api/test because the Nginx proxy handles the routing
    fetch('/api/test')
      .then((res) => {
        if (!res.ok) throw new Error('Backend is not responding');
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial', marginTop: '50px' }}>
      <h1>Multi-Tier App Status</h1>
      <hr style={{ width: '50%' }} />

      {loading && <p>Connecting to services...</p>}
      
      {error && (
        <div style={{ color: 'red', padding: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {data && (
        <div style={{ background: '#f4f4f4', display: 'inline-block', padding: '20px', borderRadius: '10px' }}>
          <p style={{ color: 'green', fontWeight: 'bold' }}>✅ {data.message}</p>
          <p><strong>DB Time:</strong> {data.dbTime}</p>
          <p><strong>Redis Visitor Count:</strong> {data.visitorNumber}</p>
        </div>
      )}
    </div>
  );
}

export default App;