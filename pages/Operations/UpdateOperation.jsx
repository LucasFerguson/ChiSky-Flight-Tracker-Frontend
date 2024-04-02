
import AirportForm from "../AirportForm"

// UpdateOperation

export default function UpdateOperation(data) {

	return <div>
		<h2>Update Operation Page</h2>
		<p>Selected Table: {data.table}</p>
		<AirportForm />
	</div>

}
