
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home/Home';
import Navbar from './Pages/Home/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/home' element={<Home />} ></Route>
      </Routes>

    </div>
  )
}

export default App;
