//Not Tested
import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import DatabaceFetchWrapper from '../components/DatabaceFetchWrapper';
import DisplayTableFromJSON from '../components/TableDisplay';

export default function DenseRankComponent(data) {
    const[query_text, setQueryText] = useState(`SELECT *,	DENSE_RANK() OVER (ORDER BY  length asc) as denRank FROM routes;`)
    const[json_from_database, setJSON] = useState({ fields: [], rows: [] });

    const handleChange = (e) => {
      console.log(e);
      setQueryText(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      let db = new DatabaceFetchWrapper();
      db.fetchData(query_text).then((data)=> {
        setJSON(data);
      })
    };

    //Render component
    return (
      <div className={styles.querybox}>
			<div>
				<h2>Dense Rank Operation Page</h2>
				<p>Selected Table: {data ? data.table : ""}</p>

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

//export default RankComponent; // Export component
