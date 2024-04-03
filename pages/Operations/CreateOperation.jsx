// CreateOperation
import React, { useState, useEffect } from 'react';

export default function CreateOperation(data) {
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

	if (loading) {
		return (
			<div>
				<p>Selected Table: {data.table}</p>
				<p>Loading...</p>;
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<p>Selected Table: {data.table}</p>
				<p>Error: {error.message}</p>;
			</div>
		);
	}

	return (
		<div>
			<p>Selected Table: {data.table}</p>
			<h2>Read - just life advice</h2>

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
		</div>
	);
}



const DebugInfo = (data) => {
	return (
		<div>
			[DEBUG Info] React Component: {data.component_name}
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
