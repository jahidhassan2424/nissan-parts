
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home/Home';
import Footer from './Pages/Shared/Footer';
import Navbar from './Pages/Shared/Navbar';
import Loading from './Pages/Shared/Loading';
import Purchase from './Pages/Purchase/Purchase';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import Blog from './Pages/Blog';
import RequireAuth from './Pages/Shared/RequireAuth';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/home' element={<Home />} ></Route>
        <Route path='/loading' element={<Loading />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/register' element={<Register />} ></Route>
        <Route path='/purchase/:id' element={
          <RequireAuth><Purchase /></RequireAuth>} ></Route>
        <Route path='/dashboard' element={
          <RequireAuth><Dashboard ></Dashboard></RequireAuth>
        } ></Route>
        <Route path='/blog' element={<Blog />} ></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
