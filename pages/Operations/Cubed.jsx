// NOT TESTED
import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import Advanced from '../Advanced';

const CubeComponent = ({ data }) => {
    const [primaryKey, setPrimaryKey] = useState(''); 

    const handleChange = (e) => {
      setPrimaryKey(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:3011/cube/${data.table}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ primary_key: primaryKey }),
        });
        if (response.ok) {
          console.log('Cube successfully'); 
        } else {
          throw new Error('Failed to cube'); 
        }
      } catch (error) {
        console.error('Error cube data:', error.message); 
      }
    };
  

    return (
      <div className={styles.querybox}>
        <div>
          <h2>Cube Operation Page</h2>
          <p>Selected Table: {data.table}</p>
          <form onSubmit={handleSubmit}>
            <label>
              Enter Primary Key of row to cube:
              <input type="text" value={primaryKey} onChange={handleChange} /> {/* Input field for primary key */}
            </label>
            <button type="submit">Cube</button> {/* Submit button */}
          </form>
        </div>
      </div>
    );
  };
  
  export default CubeComponent; 