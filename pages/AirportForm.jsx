import React, { useState } from 'react';

function AirportForm() {
	const [formData, setFormData] = useState({
		icao_code: "",
		type: "",
		name: "",
		elevation_ft: "",
		continent: "",
		iso_country: "",
		iso_region: "",
		municipality: "",
		gps_code: "",
		iata_code: "",
		local_code: "",
		coordinates: ""
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("handleSubmit, e =", e);
		console.log("handleSubmit, formData =", formData);

		try {
			console.log("fetch http://localhost:3011/insert/airport");
			const response = await fetch('http://localhost:3011/insert/airport', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			console.log("response: ", response);

			const data = await response.json();

			console.log('Data inserted successfully:', data);
		} catch (error) {
			console.error('Error inserting data:', error);
		}
	};

	return (
		<div>
			<h2>Insert Airport Data</h2>
			<form onSubmit={handleSubmit}>
				<label>
					ICAO Code:
					<input type="text" name="icao_code" value={formData.code_icao} onChange={handleChange} />
				</label>
				<br />
				{/* Add more input fields for other data */}
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default AirportForm;
