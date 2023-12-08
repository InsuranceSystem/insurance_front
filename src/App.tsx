import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Layouts/Header';
import InsuranceList from './pages/User/Insurance/InsuranceList';
import ApplyInsurance from './pages/User/Insurance/ApplyInsurance';
import ContractList from './pages/User/Contract/ContractList';
import SignUp from './pages/SignUp/SignUp';
import Footer from './Layouts/Footer';
import CompensationClaimList from './pages/User/CompensationClaim/CompensationClaimList';
import Claim from './pages/User/Contract/FunctionInModal/Claim/Claim';
import Pay from './pages/User/Contract/FunctionInModal/Payment/Pay';
import ManageInsurance from './pages/Admin/ManageInsurance/ManageInsurance';
import DesignInsurance from './pages/Admin/ManageInsurance/DesignInsurance';
import ManageApplication from './pages/Admin/ManageApplication/ManageApplication';
import ManageClaim from './pages/Admin/ManageCompensationClaim/ManageClaim';
import UpdateInsurance from './pages/Admin/ManageInsurance/UpdateInsurance';
import CarAccidentClaim from './pages/User/Contract/FunctionInModal/Claim/CarAccidentClaim';
import ManageUser from './pages/Admin/ManageUser/ManageUser';
import Cancel from './pages/User/Contract/FunctionInModal/Cancel/Cancel';
import ManageTarget from './pages/Admin/ManageTarget/ManageTarget';

function App() {
  return (
    <div>
      <Router>
        <Header></Header>
        <Routes>
          <Route path='/' element={<InsuranceList />} />
          <Route path='/user/retrieve' element={<InsuranceList />} />
          <Route path='/user/application' element={<ApplyInsurance />} />
          <Route path='/user/management' element={<ContractList />} />
          <Route
            path='/user/CompensationClaim'
            element={<CompensationClaimList />}
          />
          <Route path='/user/signUp' element={<SignUp />} />
          <Route path='/user/Claim' element={<Claim />} />
          <Route path='/user/CarAccidentClaim' element={<CarAccidentClaim />} />
          <Route path='/user/Pay' element={<Pay />} />
          <Route path='/user/Cancel' element={<Cancel />} />
          <Route path='/admin/edit' element={<UpdateInsurance />} />
          <Route path='/admin/DesignInsurance' element={<DesignInsurance />} />
          <Route path='/admin/Application' element={<ManageApplication />} />
          <Route path='/admin/CompensationClaim' element={<ManageClaim />} />
          <Route path='/admin/insurance' element={<ManageInsurance />} />
          <Route path='/admin/user' element={<ManageUser />} />
          <Route path='/admin/target' element={<ManageTarget />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
