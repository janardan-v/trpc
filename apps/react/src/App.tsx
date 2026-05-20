import { trpc } from "@/trpc/client";
import './App.css'

function App() {
  const { data, isLoading } =
    trpc.health.getHealth.useQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Streamyst testing</h1>
      <p>Status: {data?.status}</p>
    </div>
  );
}

export default App
