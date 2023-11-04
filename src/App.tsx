import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import InsuranceList from './screen/Retreive/InsuranceList';
import Application from './screen/Application';
import MyContract from './screen/MyInsurance/MyContract';

function App() {
  return (
    <div>
      <Router>
        <Header></Header>
        <Routes>
          <Route path='/' element={<InsuranceList />} />
          <Route path='/retrieve' element={<InsuranceList />} />
          <Route path='/application' element={<Application />} />
          <Route path='/management' element={<MyContract />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
