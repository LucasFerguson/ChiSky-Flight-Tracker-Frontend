// CreateOperation
import React, { useState } from 'react';


export default function CreateOperation(data) {

	// handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	console.log("Submit button clicked");
	// }



	return <div>
		<div>
			<h2> Create Operation Page</h2>
			<p>Selected Table: {data.table}</p>
			{/* <form onSubmit={handleSubmit}>

			</form> */}
			{/* <h2> Data </h2>
			<DisplayTableFromJSON json_data={json_from_database} /> */}

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




// }
