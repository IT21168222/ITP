import './App.css';
import AddEmployee from './components/AddEmployee';
import AllEmployees from './components/AllEmployees';
import Update from './components/update';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
    <Header/>
    
    <BrowserRouter>
      <Routes>
          
          <Route path="add"  exact element={<AddEmployee/>} />
          <Route path="update" exact element={<Update/>} />
          <Route path="get/:id" exact element={<Update/>} />
          <Route path="/" exact element={<AllEmployees/>} />
      </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;