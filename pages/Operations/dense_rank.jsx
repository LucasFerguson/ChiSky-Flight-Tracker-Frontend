// NOT TESTED
import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import Advanced from '../Advanced';
const DenseRankComponent = ({ data }) => {
    const [primaryKey, setPrimaryKey] = useState(''); //state for primary key
    const [denseRank, setDenseRank] = useState(null); //state for dense rank result
  

    const handleChange = (e) => {
      setPrimaryKey(e.target.value);
    };
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:3011/dense_rank/${data.table}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ primary_key: primaryKey }),
        });
        if (response.ok) {
          const result = await response.json();
          setDenseRank(result.dense_rank); 
          console.log('Dense Rank successfully:', result.dense_rank); 
        } else {
          throw new Error('Failed to dense rank'); 
        }
      } catch (error) {
        console.error('Error dense rank data:', error.message); 
      }
    };
  
   
    return (
      <div className={styles.querybox}>
        <div>
          <h2>DENSE_RANK Operation Page</h2>
          <p>Selected Table: {data.table}</p>
          <form onSubmit={handleSubmit}>
            <label>
              Enter Primary Key of row to dense rank:
              <input type="text" value={primaryKey} onChange={handleChange} /> {/* Input field for primary key */}
            </label>
            <button type="submit">Dense Rank</button> {/* Submit button */}
          </form>
          {denseRank !== null && <p>Dense Rank Result: {denseRank}</p>} {/* Display dense rank result if available */}
        </div>
      </div>
    );
  };
  
  export default DenseRankComponent; 