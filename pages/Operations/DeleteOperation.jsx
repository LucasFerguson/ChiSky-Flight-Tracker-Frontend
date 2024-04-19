// DeleteOperation

import DeleteAirport from "../DeleteAirport"
import styles from '../../styles/Home.module.css';
import React, { useState } from 'react';
export default function DeleteOperation(data) {

	const [primary_key, setPrimaryKey] = useState('');

	const handleChange = (e) => {
		setPrimaryKey(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`http://localhost:3011/delete/${data.table}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ primary_key: primary_key }),
			});
			if (response.ok) {
				console.log('Data deleted successfully');
			} else {
				throw new Error('Failed to delete data');
			}
		} catch (error) {
			console.error('Error deleting data:', error.message);
		}
	};


	return <div className={styles.querybox}>
		<div>
			<h2> Delete Operation Page</h2>
			<p>Selected Table: {data.table}</p>
			<form onSubmit={handleSubmit}>
				<label>
					Enter Primary Key of row to delete:
					<input type="text" value={primary_key} onChange={handleChange} />
				</label>
				<button type="submit">Delete</button>
			</form>

		</div>
	</div>

}


/**
 * 
 * 
 * import React, { useState } from 'react';

function DeleteAirport() {
	const [icaoCode, setIcaoCode] = useState('');

	const handleChange = (e) => {
		setIcaoCode(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:3011/delete/airports', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ icaoCode }),
			});
			if (response.ok) {
				console.log('Data deleted successfully');
			} else {
				throw new Error('Failed to delete data');
			}
		} catch (error) {
			console.error('Error deleting data:', error.message);
		}
	};

	return (
		<div>
			<h2>Delete Airport Data</h2>
			<form onSubmit={handleSubmit}>
				<label>
					ICAO Code:
					<input type="text" value={icaoCode} onChange={handleChange} />
				</label>
				<br />
				<button type="submit">Delete</button>
			</form>
		</div>
	);
}

export default DeleteAirport;
 */