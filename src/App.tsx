import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import MainPage from '../src/components/MainPage';
import CountryPage from '../src/components/CountryPage';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path=":code" element={<CountryPage/>}/>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
