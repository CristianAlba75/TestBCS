import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, isActive, description, code }),
            });
            if (!response.ok) {
                throw new Error('Error al crear el producto');
            }
            setSuccessMessage('Producto creado exitosamente!');
            setTimeout(() => {
                navigate('/products');
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Crear Producto</h2>
            {successMessage && (
                <div className="bg-green-200 text-green-800 p-4 rounded mb-4 text-center">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <label htmlFor="name" className="block font-bold mb-2">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block font-bold mb-2">Descripción:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="code" className="block font-bold mb-2">Código:</label>
                    <input
                        type="text"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="isActive" className="block font-bold mb-2">Activo:</label>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isActive"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            className="hidden"
                        />
                        <label htmlFor="isActive" className="flex items-center cursor-pointer">
                            <div
                                className={`w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 transition-all duration-300 ease-in-out ${isActive ? 'bg-blue-500' : ''}`}>
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
                            </div>
                            <span className={`ml-2 font-bold ${isActive ? 'text-green-500' : 'text-red-500'}`}>
                {isActive ? 'Sí' : 'No'}
            </span>
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
                    Crear
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;