import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.png';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component

const Category = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [name, setName] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        func();
        getAllCategories();
    }, []);

    const func = () => {
        setName(localStorage.getItem('user'));
    };

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const showProductsByCategory = async (categoryId) => {
        try {
            const response = await axios.get(`http://localhost:8080/categories/${categoryId}/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products by category:', error.message);
        }
    };

    const handleButtonClick = (buttonType) => {
        switch (buttonType) {
            case 'dashboard':
                navigate('/home');
                break;
            case 'products':
                navigate('/product');
                break;
            case 'orders':
                navigate('/checkout');
                break;
            case 'summary':
                navigate('/summary');
                break;
            case 'category':
                navigate('/category');
                break;
            default:
                console.log(`${buttonType} button clicked`);
        }
    };

    const getAllCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    const logout = () => {
        navigate('/login');
    };

    const manageCategory = () => {
        navigate('/managecategory');
    };

    return (
        <>
            <nav className="navbar bg-primary fixed-top" data-bs-theme="white">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                        onClick={toggleNav}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="parent-container">
                        <div className="h5">
                            <h6>
                                <i className="bi bi-person-circle"></i> Hello {name}
                            </h6>
                        </div>
                    </div>
                </div>
            </nav>

            <Sidebar isOpen={isNavOpen} toggleNav={toggleNav} handleButtonClick={handleButtonClick} Logout={logout} />


            <br />
            <h3 style={{marginLeft:"25px",marginTop:"45px"}}>
                <i className="bi bi-grid-fill" > </i> Category
                <h6>Click on the relevant category button to view the products</h6>
                <button
                type="button"
                className="btn btn-outline-primary"
                onClick={manageCategory}
            >
                + Manage Your Category
            </button>
                <div className="container">
                    
                    <table className="table">
                        
                        <tbody>
                            <tr>
                                {categories.map((category) => (
                                    <td key={category.id}>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => showProductsByCategory(category.id)}
                                        >
                                            {category.name}
                                        </button>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>


            </h3>

            <div className="container">
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-lg-4 col-md-6 col-12 mb-4">
                            <div className="card" style={{ width: '22rem', margin: '10px' }}>
                                <div className="card-body">
                                    <h3 className="card-title">{product.name}</h3>
                                    <h4>
                                        <span className="badge bg-secondary">
                                            {product.categoryEntity?.name}
                                        </span>
                                    </h4>
                                    <p className="card-text">Price: {product.price} LKR</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h4>
                                            <span
                                                className={`badge ${product.qty === 0
                                                        ? 'bg-danger'
                                                        : product.qty < 10
                                                            ? 'bg-warning'
                                                            : 'bg-success'
                                                    }`}
                                            >
                                                {product.qty === 0
                                                    ? 'Out of Stock'
                                                    : product.qty < 10
                                                        ? 'Low Stock'
                                                        : 'In Stock'}
                                            </span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* <button
                type="button"
                className="btn btn-outline-primary"
                onClick={manageCategory}
            >
                + Manage Category
            </button> */}
        </>
    );
};

export default Category;
