import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import DatabaseFetchWrapper from '../../src/DatabaseFetchWrapper';
import DisplayTableFromJSON from '../components/TableDisplay';

export default function FirstValueComponent(data) {
  const [query_text, setQueryText] = useState(`SELECT flightid, status, ident_iata, fa_flight_id, FIRST_VALUE(flightid) OVER (ORDER BY ident_iata) AS first_value_flight_id
    FROM flights;`)
  const [json_from_database, setJSON] = useState({ fields: [], rows: [] });

  const handleChange = (e) => {
    console.log(e);
    setQueryText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let db = new DatabaseFetchWrapper();
    db.fetchData(query_text).then((data) => {
      setJSON(data);
    })
  };

  //Render component
  return (
    <div className={styles.querybox}>
      <div>
        <h2>First Value Page</h2>
        {/* <p>Selected Table: [ {data ? data.table : ""} ]</p> */}

        <p> Query: {query_text} </p>

        <form onSubmit={handleSubmit}>
          <div>
            <button type="submit">Run</button>
          </div>
        </form>

        <h2> Table Output </h2>
        <DisplayTableFromJSON json_data={json_from_database} />

      </div>
    </div>
  );
};