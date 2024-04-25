import Layout from "./components/layout";
import "../styles/global.css"
// this is the root component

export default function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			
			{/* <div>This is a test</div> */}

			<div style={{ border: "1px solid black",
						backgroundColor: 'aliceblue' }}>
				<Component {...pageProps} />
			</div>
		</Layout>
	)
}