import logo from './logo.svg';
import './App.css';
import ApiCall from './components/ApiCall';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddUser from './components/AddUser';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import NavComp from './components/NavComp';


function App() {
  return (
    <div>
    <BrowserRouter>
    <NavComp/>
      <Routes>
        <Route exact path='/' element={<ApiCall/>} />
        <Route path='/adduser' element={<AddUser/>}/>
      </Routes>
    </BrowserRouter>
    
    
   
    </div>
  );
}

export default App;
