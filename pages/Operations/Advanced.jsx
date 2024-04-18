// Advanced
import React, { useState } from 'react';

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

	return <div>
		<div>
			<h2> Advanced Operation Page</h2>
			<p>Selected Table: {data.table}</p>
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


const DisplayTableFromJSON = ({ json_data }) => {
	return (
		<table>
			<thead>
				<tr>
					{json_data.fields.map(field => (
						<th key={field.name}>{field.name}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{json_data.rows.map((row, index) => (
					<tr key={index}>
						{json_data.fields.map(field => (
							<td key={`${index}-${field.name}`}>{row[field.name]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};





// // DeleteOperation

// import DeleteAirport from "../DeleteAirport"
// import styles from '../../styles/Home.module.css';
// import React, { useState } from 'react';
// export default function DeleteOperation(data) {

//Roll Up

//Cubed

//First Value

//Having Count

// **Advanced Window Features

//Ranking

//Dense_rank()

//Ntile()

//Unbounded Preceding


// }
