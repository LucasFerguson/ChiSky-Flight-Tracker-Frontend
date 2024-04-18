import Layout from "./components/layout";

// this is the root component

export default function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			{/* <div>This is a test</div> */}

			<div style={{ border: "1px solid black" }}>
				<Component {...pageProps} />
			</div>
		</Layout>
	)
}