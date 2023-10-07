import { useGetHelloWorldQuery } from '@taskaria-app/hello-world/data-access';

export function App() {
  const { isLoading, data } = useGetHelloWorldQuery();
  const headerText = isLoading ? 'Loading...' : data?.message;

  return (
    <div>
      <h1>{headerText}</h1>
    </div>
  );
}

export default App;
