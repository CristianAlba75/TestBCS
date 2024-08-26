import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Products from "./components/Products";
import Customers from "./components/Customers";
import CreateProduct from "./components/CreateProduct";

const App = () => {
    return (
        <Router>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">ClientPro360</h1>
                <p className="text-lg text-gray-600 mb-8">Bienvenido a la aplicación de gestión de clientes y productos.</p>
                <div className="bg-white shadow-md rounded-lg p-4 mb-8">
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="flex items-center text-blue-500 hover:text-blue-600">
                                <i className="fa fa-home mr-2" aria-hidden="true"></i> Inicio
                            </Link>
                        </li>
                    </ul>
                </div>

                <Routes>
                    <Route path="/" element={
                        <div className="flex justify-center space-x-4">
                            <Link to="/customers"
                                  className="card bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                                <div className="flex justify-center items-center">
                                    <i className="fa fa-users text-sky-600 text-5xl mb-2" aria-hidden="true"></i>
                                </div>
                                <div className="flex justify-center items-center">
                                    <h2 className="text-xl font-semibold text-gray-800">Clientes</h2>
                                </div>
                                <p className="text-gray-600">Gestiona tus clientes.</p>
                            </Link>
                            <Link to="/products"
                                  className="card bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                                <div className="flex justify-center items-center">
                                    <i className="fa fa-archive text-sky-800 text-5xl mb-2" aria-hidden="true"></i>
                                </div>
                                <div className="flex justify-center items-center">
                                    <h2 className="text-xl font-semibold text-gray-800">Productos</h2>
                                </div>
                                <p className="text-gray-600">Gestiona tus productos.</p>
                            </Link>
                        </div>
                    } />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/create" element={<CreateProduct />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;