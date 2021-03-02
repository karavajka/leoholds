import Routes from './routes';

// async function fetchPage() {
//   let response = await fetch(`${API_BASE_URL}/content/v1/spaces/${API_SPACE_ID}/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${API_TOKEN}`,
//     },
//     body: JSON.stringify({ query }),
//   });

//   let commits = await response.json();
//   return commits.data.pageCollection.items[0];
// }

function App() {
  return (
      <Routes />
  );
}

export default App;
