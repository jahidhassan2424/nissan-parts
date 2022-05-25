
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OurProducts from './Pages/OurProducts/OurProducts';
import ShowUserProfileIcon from './Pages/Shared/ShowUserProfileIcon';
import MyProfile from './Pages/Dashboard/MyProfile';
import MyReview from './Pages/Dashboard/MyReview';
import MyOrders from './Pages/Dashboard/MyOrders';
import ManageUsers from './Pages/Dashboard/ManageUsers';
import ManageOrders from './Pages/Dashboard/ManageOrders';
import Checkouot from './Pages/CheckOut/CheckOut';
import RequireAdmin from './Pages/Shared/RequireAdmin';

function App() {
  return (
    <div>
      <ShowUserProfileIcon></ShowUserProfileIcon>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/home' element={<Home />} ></Route>
        <Route path='/t' element={<RequireAdmin />} ></Route>
        <Route path='/loading' element={<Loading />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/register' element={<Register />} ></Route>
        <Route path='/allProducts' element={<OurProducts />} ></Route>
        <Route path='/purchase/:id' element={
          <RequireAuth><Purchase /></RequireAuth>} ></Route>
        <Route path='/dashboard' element={
          <RequireAuth><Dashboard />
          </RequireAuth>} >
          <Route index element={<MyProfile />} ></Route>
          <Route path="/dashboard/my-review" element={<MyReview />} ></Route>
          <Route path="/dashboard/my-orders" element={<MyOrders />} ></Route>
          <Route path="/dashboard/manage-orders" element={<ManageOrders />} ></Route>
          <Route path="/dashboard/manage-users" element={<ManageUsers />} ></Route>
        </Route>
        <Route path='/checkout/:orderId' element={
          <RequireAuth><Checkouot /></RequireAuth>
        } ></Route>
        <Route path='/blog' element={<Blog />} ></Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App;
