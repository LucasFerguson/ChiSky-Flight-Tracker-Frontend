// React Component for the footer of the website

import React from 'react';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <span style={styles.poweredBy}>Powered by Group 18</span>
        <img
          src="/vercel.svg"
          alt="Vercel Logo"
          style={styles.logo}
        />
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#77a5ca',
    padding: '20px 0',
    textAlign: 'center',
    color: '#fff',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  poweredBy: {
    marginRight: '10px',
    fontSize: '14px',
    color: '#333',
    fontFamily: 'Arial, sans-serif'
  },
  logo: {
    width: '100px',
    height: 'auto',
  },
};