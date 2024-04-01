// import { useState, useEffect } from 'react';

// export default function QueryDisplay() {
// 	const [flights, setFlights] = useState([]);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const response = await fetch('http://localhost:3000/select/flights');
// 				if (!response.ok) {
// 					throw new Error('Failed to fetch flights');
// 				}
// 				const data = await response.json();
// 				console.log('Data:', data);
// 				setFlights(data);
// 			} catch (error) {
// 				console.error('Error fetching flights:', error);
// 			}
// 		};

// 		fetchData();
// 	}, []);




// 	return (
// 		<div>
// 			<h1>Flights List</h1>
// 			{flights.fields.length > 0 && flights.rows.length > 0 ? (
// 				<table>
// 					<thead>
// 						<tr>
// 							{flights.fields.map(field => (
// 								<th key={field.name}>{field.name}</th>
// 							))}
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{flights.rows.map((row, rowIndex) => (
// 							<tr key={rowIndex}>
// 								{flights.fields.map(field => (
// 									<td key={`${rowIndex}-${field.name}`}>{row[field.name]}</td>
// 								))}
// 							</tr>
// 						))}
// 					</tbody>
// 				</table>
// 			) : (
// 				<p>Loading...</p>
// 			)}
// 		</div>
// 	);
// };


import { useState, useEffect } from 'react';

export default function QueryDisplay() {
	const [json_from_databace, setJSON] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:3000/select/aircraft_types');
				if (!response.ok) {
					throw new Error('Failed to fetch flights');
				}
				const data = await response.json();
				console.log('Data:', data);
				setJSON(data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching flights:', error);
				setError(error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<div>
			<h2>Flight List</h2>

			<DisplayTableFromJSON json_data={json_from_databace} />
			{/* <table>
				<thead>
					<tr>
						{json_from_databace.fields.map(field => (
							<th key={field.name}>{field.name}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{json_from_databace.rows.map((row, index) => (
						<tr key={index}>
							{json_from_databace.fields.map(field => (
								<td key={`${index}-${field.name}`}>{row[field.name]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table> */}
		</div>
	);
};


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
