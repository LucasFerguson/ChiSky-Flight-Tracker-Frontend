// TESTED
import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';

import DatabaceFetchWrapper from '../components/DatabaseFetchWrapper';
import DisplayTableFromJSON from '../components/TableDisplay';

// --CUBED-- (Works)
//SELECT engine_type, description, SUM(engine_count)
//FROM aircraft_types
//GROUP BY CUBE(engine_type, description);

export default function CubeComponent(data) {

	// const CubeComponent = ({ data }) => {

	const [query_text, setQueryText] = useState(`SELECT engine_type, description, SUM(engine_count) FROM aircraft_types GROUP BY CUBE(engine_type, description);`);
	const [json_from_database, setJSON] = useState({ fields: [], rows: [] });

	const handleChange = (e) => {
		console.log(e);
		setQueryText(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let db = new DatabaceFetchWrapper();
		db.fetchData(query_text).then((data) => {
			setJSON(data);
		});
	};


	//Render component
	return (
		<div className={styles.querybox}>
			<div>
				<h2>Cube Operation Page</h2>
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


	// const [primaryKey, setPrimaryKey] = useState('');

	// const handleChange = (e) => {
	// 	setPrimaryKey(e.target.value);
	// };

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		const response = await fetch(`http://localhost:3011/cube/${data.table}`, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify({ primary_key: primaryKey }),
	// 		});
	// 		if (response.ok) {
	// 			console.log('Cube successfully');
	// 		} else {
	// 			throw new Error('Failed to cube');
	// 		}
	// 	} catch (error) {
	// 		console.error('Error cube data:', error.message);
	// 	}
	// };


	// return (
	// 	<div className={styles.querybox}>
	// 		<div>
	// 			<h2>Cube Operation Page</h2>
	// 			<p>Selected Table: {data.table}</p>
	// 			<form onSubmit={handleSubmit}>
	// 				<label>
	// 					Enter Primary Key of row to cube:
	// 					<input type="text" value={primaryKey} onChange={handleChange} /> {/* Input field for primary key */}
	// 				</label>
	// 				<button type="submit">Cube</button> {/* Submit button */}
	// 			</form>
	// 		</div>
	// 	</div>
	// );
};

