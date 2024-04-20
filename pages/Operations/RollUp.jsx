// NOT TESTED
//Implementation of RollUp
import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import Advanced from '../Advanced';

// export default{
//     input: ''
// };

const RollupComponent = ({ data }) => {
    const [primaryKey, setPrimaryKey] = useState(''); // State for primary key
  
    // Handle input change
    const handleChange = (e) => {
      setPrimaryKey(e.target.value);
    };

// COMPONENT WITH ROLLUP FUNCTIONALITY
const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        //Make POST request in the Database to execute Rollup
        const response = await fetch(`http://localhost:3011/rollup/${data.table}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({primary_key: primary_key}),
        });
        if(response.ok) {
            console.log('Rollup successfully'); //success message
        } else{
            throw new Error('Failed to rollup'); //Throw error if request fails
        }
    } catch (error){
        console.error('Error rollup data:', error.message);//log error message
    }
};

//Render component
return (
    <div className={styles.querybox}>
      <div>
        <h2>Rollup Operation Page</h2>
        <p>Selected Table: {data.table}</p>
        <form onSubmit={handleSubmit}>
          <label>
            Enter Primary Key of row to rollup:
            <input type="text" value={primaryKey} onChange={handleChange} /> {/* Input field for primary key */}
          </label>
          <button type="submit">Rollup</button> {/* Submit button */}
        </form>
      </div>
    </div>
  );
};

export default RollupComponent; // Export component