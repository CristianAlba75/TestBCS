import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const navigate = useNavigate();

    const handleCreateProduct = () => {
        navigate('/products/create');
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                const response = await fetch(`http://localhost:3000/product/${productId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Error al eliminar el producto');
                }
                setProducts(products.filter(product => product._id !== productId));
                setSuccessMessage('Producto eliminado exitosamente!');
                setTimeout(() => setSuccessMessage(null), 3000);
            } catch (error) {
                setError(error.message);
            }
        }
    };



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/product/all');
                if (!response.ok) {
                    throw new Error('Error al consultar los productos');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Cargando productos...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Productos</h2>
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleCreateProduct}>
                Crear Producto
            </button>
            {successMessage && (
                <div className="bg-green-200 text-green-800 p-4 rounded mb-4 text-center">
                    {successMessage}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <div className="mb-4">
                                <span className="text-sm font-semibold text-gray-500">Código:</span>
                                <span className="ml-2 text-lg font-bold text-sky-600">{product.code}</span>
                            </div>
                            <span
                                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${product.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                {product.isActive ? 'Activo' : 'Inactivo'}
              </span>
                        </div>
                        <div className="flex justify-end items-center mt-4">
                            <button
                                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                                <i className="fa fa-edit mr-2"></i>
                            </button>
                            <button
                                className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"  onClick={() => handleDeleteProduct(product._id)}>
                                <i className="fa fa-trash mr-2"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;