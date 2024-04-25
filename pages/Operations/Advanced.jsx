// Advanced
import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import DisplayTableFromJSON from '../components/TableDisplay';

export default function Advanced(data) {

	const [query_text, setQueryText] = useState(`SELECT * FROM flights WHERE flightid='UAL2610'`);
	const [json_from_database, setJSON] = useState({ fields: [], rows: [] });

	const handleChange = (e) => {
		console.log(e);
		setQueryText(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`http://localhost:3011/query`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ query: query_text }),
			});
			if (response.ok) {
				console.log('Run successfully');
				const data = await response.json();
				console.log('Data:', data);
				setJSON(data);
			} else {
				const error = await response.json();

				throw new Error('Failed to fetch data,' + JSON.stringify(error));
			}
		} catch (error) {
			console.error('Error:', error.message);
		}
	};

	return <div className={styles.querybox}>
		<div>
			<h2> Advanced Operation Page</h2>
			<p>Database Table Names: flights | flight_status | airports | airlines | aircraft_types | routes</p>
			<p>Selected Table: [ {data.table} ]</p>
			<form onSubmit={handleSubmit}>
				<label>
					Enter SQL Query:

					{/* <input type="text" value={icaoCode} onChange={handleChange} /> */}
				</label>

				<div><textarea rows={5} cols={50} defaultValue={``} onChange={handleChange} /> </div>
				<div>
					<button type="submit">Run</button>
				</div>
				<p> Example: SELECT * FROM flights WHERE flightid='UAL2610' </p>

				<p> Query: {query_text} </p>
			</form>
			<h2> Table Output </h2>
			<DisplayTableFromJSON json_data={json_from_database} />

		</div>
	</div>
}





// // DeleteOperation

// import DeleteAirport from "../DeleteAirport"
// import styles from '../../styles/Home.module.css';
// import React, { useState } from 'react';
// export default function DeleteOperation(data) {
// }

// --Roll UP-- (Works)
// SELECT engine_type, SUM(engine_count)
// FROM aircraft_types
// GROUP BY engine_type;

// --CUBED-- (Works)
//SELECT engine_type, description, SUM(engine_count)
//FROM aircraft_types
//GROUP BY CUBE(engine_type, description);


// --VIEW-- (Works)
// CREATE VIEW public."United States" AS
// SELECT name, iata, icao
// FROM airlines
// WHERE country = 'United States';

// --FIRST VALUE-- (Works)
// SELECT flight_id, status, ident_iata, fa_flight_id, FIRST_VALUE(flight_id) OVER (ORDER BY ident_ata) AS first_value_flight_id
// FROM flights;

// --HAVING COUNT -- (Not Works)
// SELECT description, engine_type, SUM(engine_count)
// FROM aircraft_types
// GROUP BY description, engine_type
// HAVING COUNT(engine_count);

// ADVANCED WINDOW FEATURES (CHAPTER 5)

// --RECURSIVE QUERIES-- (Not Works)
// WITH RECURSIVE ReachableAirports AS(
// 	SELECT icao_code AS reachable_airport, 1 AS hops
// 	FROM airport
// 	WHERE icao_code = '07OK'

// 	UNION ALL

// 	SELECT name AS reachable_airport, ra.hops + 1 AS hops
// 	FROM ReachableAirports ra
// 	JOIN routes r ON ra.reachable_airport = r.coordinates
// 	WHERE ra.hops < 10
// )

// SELECT reachable_airport, hops
// FROM ReachableAirports;

// --Ranking-- (Works)
// SELECT * FROM (
// SELECT *,
// RANK() OVER (ORDER BY length ASC) AS l_rank
// FROM routes) as table_routes;

// --DENSE_RANK()-- (Works)
// SELECT *,
// DENSE_RANK() OVER (ORDER BY  length ASC) as denRank
// FROM routes;


// --NTILE()-- (Works)
// SELECT *,
// NTILE (4) OVER (ORDER BY engine_count) AS ‘fourth_ntile’
// FROM aircraft_types;


// --Unbounded Preceding-- (Works)
// SELECT *,
// SUM(engine_count) OVER (ORDER BY engine_type ROWS UNBOUNDED PRECEDING)
// AS ‘unbounded_engine’
// FROM aircraft_types;

