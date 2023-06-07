import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './component/pages/user';
import Category from './component/pages/category';
import Product from './component/pages/product';
import Layout from './component/shared/layout';
import Dashboard from './component/pages/dashboard';
import EditUser from './component/pages/editUser';
import AddUser from './component/pages/addUser';
import AddProduct from './component/pages/addProduct';
import EditProduct from './component/pages/editProduct';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Dashboard />} />
            <Route path="user" element={<User />} />
            <Route path="/create-user" element={<AddUser/>} />
            <Route path='/edit-user/:id' element={<EditUser/>} />
            <Route path="category" element={<Category />} />
            <Route path="product" element={<Product />} />
            <Route path="create-product" element={<AddProduct/>} />
            <Route path="edit-product/:id" element={<EditProduct/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;