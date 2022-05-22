
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home/Home';
import Footer from './Pages/Shared/Footer';
import Navbar from './Pages/Shared/Navbar';
import Loading from './Pages/Shared/Loading';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/home' element={<Home />} ></Route>
        <Route path='/loading' element={<Loading />} ></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
