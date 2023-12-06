import './App.css';
import { SearchContextProvider } from './context/search';
import { UtilitiesContextProvider } from './context/utilities';
import Display from './screens/display';
import LoadUtitilies from './screens/utilities';

function App() {
  return (
    <div className="App">
      <SearchContextProvider>
        <UtilitiesContextProvider>
          <LoadUtitilies />
        </UtilitiesContextProvider>
        <Display />
      </SearchContextProvider>
    </div>
  );
}

export default App;
