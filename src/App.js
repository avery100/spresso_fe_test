import logo from './logo.svg';
import './App.css';
// Import DataTable component
import AATable from './components/AATable.component' // Update the path as needed

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Employee Table.
        </p>
        <AATable />  
      </header>
      
    </div>
  );
}

export default App;
