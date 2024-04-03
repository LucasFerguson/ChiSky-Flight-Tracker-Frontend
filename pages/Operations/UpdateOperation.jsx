
import AirportForm from "../AirportForm"

import React, { useState, useEffect } from 'react';


export default function UpdateOperation(data) {

	const [json_from_database, setJSON] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value
		}));
	}

	useEffect(() => {
		const fetchData = async (tableName) => {
			if (tableName === "") {
				console.log("Please Select Table!")
				return;
			}
			try {
				console.log("tableName= " + tableName)
				const response = await fetch(`http://localhost:3011/select/${tableName}`);
				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}
				const data = await response.json();
				console.log('Data:', data);
				setJSON(data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching data:', error);
				setError(error);
				setLoading(false);
			}
		};

		fetchData(data.table);
	}, [data.table]);


	// handleSubmit
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Form Data:', formData);
		const { table } = data; // Destructuring the 'data' object to extract the 'table' property

		try {
			const response = await fetch(`http://localhost:3011/insert/${table}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			if (!response.ok) {
				throw new Error('Failed to insert data');
			}
			const data = await response.json();
			console.log('Data:', data);
		} catch (error) {
			console.error('Error inserting data:', error);
		}


	}


	if (loading) {
		return (
			<div>
				<p>Selected Table: {data.table}</p>
				<p>Error: Please Select Table!</p>
				<p>Loading...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<p>Selected Table: {data.table}</p>
				<p>Error: {error.message}</p>
			</div>
		);
	}

	return (
		<div>
			<p>Selected Table: {data.table}</p>
			<h2>Create Operation</h2>
			<p>Enter Data</p>
			<form onSubmit={handleSubmit}>

				{json_from_database.fields.map(field => (
					<div key={field.name}>
						<label>{field.name}:</label>
						<input
							type='text'
							name={field.name}
							onChange={handleChange}
						/><br />
					</div>
				))}

				<button>Submit</button>
			</form>

		</div>
	);
}
