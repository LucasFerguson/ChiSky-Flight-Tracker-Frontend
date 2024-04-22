
export default class DatabaseFetchWrapper {
	url = 'http://localhost:3011/query';
	constructor() {
		this.url = 'http://localhost:3011/query';
	}
	async fetchData(query) {
		try {
			const response = await fetch(this.url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ query: query }),
			});
			if (response.ok) {
				console.log('Run successfully');
				const data = await response.json();
				console.log('Data:', data);
				return data;
			} else {
				const error = await response.json();

				throw new Error('Failed to fetch data,' + JSON.stringify(error));
			}
		} catch (error) {
			console.error('Error:', error.message);
		}
	}
}
