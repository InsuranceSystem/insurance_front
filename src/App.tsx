import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Layouts/Header';
import InsuranceList from './pages/Insurance/InsuranceList';
import Apply from './pages/Application/Apply';
import ContractList from './pages/Contract/ContractList';
import SignUp from './pages/SignUp/SignUp';
import Footer from './Layouts/Footer';
import CompensationClaimList from './pages/CompensationClaim/CompensationClaimList';
import Claim from './pages/Contract/Claim/Claim';
import Pay from './pages/Contract/Pay/Pay';

function App() {
  return (
    <div>
      <Router>
        <Header></Header>
        <Routes>
          <Route path='/' element={<InsuranceList />} />
          <Route path='/retrieve' element={<InsuranceList />} />
          <Route path='/application' element={<Apply />} />
          <Route path='/management' element={<ContractList />} />
          <Route
            path='/CompensationClaim'
            element={<CompensationClaimList />}
          />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/Claim' element={<Claim />} />
          <Route path='/Pay' element={<Pay />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
