import React, { useEffect, useState } from 'react';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('http://localhost:3000/customer/all');
                if (!response.ok) {
                    throw new Error('Error al consultar los clientes');
                }
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    if (loading) return <div>Cargando clientes...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Clientes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {customers.map((customer) => (
                    <div
                        key={customer._id}
                        className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-xl font-semibold mb-2">{customer.name}</h3>
                            <p className="text-gray-600 mb-4">{customer.description}</p>
                            <div className="mb-4">
                                <span className="text-sm font-extrabold text-gray-500">Tipo de documento:</span>
                                <span className="ml-2">{customer.documentType}</span>
                            </div>
                            <div className="mb-4">
                                <span className="text-sm font-extrabold text-gray-500">Número de documento:</span>
                                <span className="ml-2">{customer.documentNumber}</span>
                            </div>
                            <div className="mb-4">
                                <span className="text-sm font-extrabold text-gray-500">Email:</span>
                                <span className="ml-2">{customer.email}</span>
                            </div>
                            <div className="mb-4">
                                <span className="text-sm font-extrabold text-gray-500">Productos:</span>
                                {customer.products && customer.products.length > 0 ? (
                                    <div>
                                        {customer.products.map((product) => (
                                            <span
                                                key={product.id}
                                                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mr-2 mb-2 ${product.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                                {product.name}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <span
                                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mr-2 mb-2 bg-red-200 text-red-800'}`}>
                                                Sin productos
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Customers;