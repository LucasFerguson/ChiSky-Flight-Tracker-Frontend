// CreateOperation
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';

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
		setLoading(true);
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
			<div className={styles.querybox}>
				<p>Selected Table: [ {data.table} ]</p>
				<p>Error: Please Select Table!</p>
				<p>Loading...</p>
				<img src="https://media1.giphy.com/media/uIJBFZoOaifHf52MER/200w.gif?cid=6c09b9529ry67rkxriku5ai6omcaegqxtchadtx84q511l9p&ep=v1_gifs_search&rid=200w.gif&ct=g" alt="" />
			</div>
		);
	}

	if (error) {
		return (
			<div className={styles.querybox}>
				<p>Selected Table: {data.table}</p>
				<p>Error: {error.message}</p>
			</div>
		);
	}

	return (
		<div className={styles.querybox}>
			<p>Selected Table: [ {data.table} ]</p>
			<h2>Create Operation</h2>
			<p>Enter data to create a new tuple in the selected table.</p>
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



const DebugInfo = (data) => {
	return (
		<div className={styles.querybox}>
			[DEBUG Info] React Component: {data.component_name}
		</div>

	);
};
