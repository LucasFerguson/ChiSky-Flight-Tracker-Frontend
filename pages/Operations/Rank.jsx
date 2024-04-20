//Not Tested
import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import Advanced from '../Advanced';
const RankComponent = ({ data }) => {
  const [primaryKey, setPrimaryKey] = useState(''); // State for primary key
  const [rank, setRank] = useState(null); // State for rank result

  // Handle input change
  const handleChange = (e) => {
    setPrimaryKey(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await fetch(`http://localhost:3011/rank/${data.table}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ primary_key: primaryKey }),
      });
      if (response.ok) {
        const result = await response.json();
        setRank(result.rank); 
        console.log('Rank successfully:', result.rank);
      } else {
        throw new Error('Failed to rank'); 
      }
    } catch (error) {
      console.error('Error rank data:', error.message);
    }
  };

  // Render component
  return (
    <div className={styles.querybox}>
      <div>
        <h2>RANK Operation Page</h2>
        <p>Selected Table: {data.table}</p>
        <form onSubmit={handleSubmit}>
          <label>
            Enter Primary Key of row to rank:
            <input type="text" value={primaryKey} onChange={handleChange} /> {/* Input field for primary key */}
          </label>
          <button type="submit">Rank</button> {/* Submit button */}
        </form>
        {rank !== null && <p>Rank Result: {rank}</p>} {/* Display rank result if available */}
      </div>
    </div>
  );
};

export default RankComponent; // Export component
