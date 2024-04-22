import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import DatabaseFetchWrapper from '../components/DatabaseFetchWrapper';
import DisplayTableFromJSON from '../components/TableDisplay';

// WITH RECURSIVE ReachableAirports AS ( SELECT icao_code AS reachable_airport, 1 AS hops FROM airports WHERE icao_code = 'ENFL' UNION ALL SELECT r.destination AS reachable_airport, ra.hops + 1 AS hops FROM ReachableAirports ra JOIN Routes r ON ra.reachable_airport = r.origin WHERE ra.hops < 50  -- Stop after 10 hops ) SELECT reachable_airport, min(hops) AS shortest_hops FROM ReachableAirports GROUP BY reachable_airport ORDER BY min(hops);

// WITH RECURSIVE ReachableAirports AS (
// 	SELECT icao_code AS reachable_airport, 1 AS hops
// 	FROM airports
// 	WHERE icao_code = 'ENFL'
// 	 -- Starting at the above airport

// 	UNION ALL

// 	-- Joining with Routes to find reachable airports
// 	SELECT r.destination AS reachable_airport, ra.hops + 1 AS hops
// 	FROM ReachableAirports ra
// 	JOIN Routes r ON ra.reachable_airport = r.origin
// 	WHERE ra.hops < 50  -- Stop after 10 hops

//  )
//  -- min is used to only return the shortest distance
//  SELECT reachable_airport, min(hops) AS shortest_hops
//  FROM ReachableAirports
//  GROUP BY reachable_airport
//  ORDER BY min(hops);

export default function RecursiveComponent(data) {

	const [query_text, setQueryText] = useState(`WITH RECURSIVE ReachableAirports AS ( SELECT icao_code AS reachable_airport, 1 AS hops FROM airports WHERE icao_code = 'ENFL' UNION ALL SELECT r.destination AS reachable_airport, ra.hops + 1 AS hops FROM ReachableAirports ra JOIN Routes r ON ra.reachable_airport = r.origin WHERE ra.hops < 50 ) SELECT reachable_airport, min(hops) AS shortest_hops FROM ReachableAirports GROUP BY reachable_airport ORDER BY min(hops);`);
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
		});
	};

	//Render component
	return (
		<div className={styles.querybox}>
			<div>
				<h2>Rollup Operation Page</h2>
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
