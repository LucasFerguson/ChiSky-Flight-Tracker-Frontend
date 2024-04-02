import React, { useState } from 'react';

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
					<input type="text" value={icao_code} onChange={handleChange} />
				</label>
				<br />
				<button type="submit">Delete</button>
			</form>
		</div>
	);
}

export default DeleteAirport;
