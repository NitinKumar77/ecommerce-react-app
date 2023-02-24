import PageContent from "../components/PageContent";

function ErrorPage() {
	let title = "An error occurred!";
	let message = "Something went wrong!";

	return (
		<>
			<PageContent title={title}>
				<p>{message}</p>
			</PageContent>
		</>
	);
}

export default ErrorPage;
