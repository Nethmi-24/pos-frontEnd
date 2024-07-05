import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from './logo.png';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component

const Summary = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [name, setName] = useState(null);
    const [countOfTotalProducts, setcountOfTotalProducts] = useState(null);
    const [countOutOfStock, setcountOutOfStock] = useState(null);
    const [countQtyLessThan10, setcountQtyLessThan10] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [products, setProducts] = useState([]);
    const [orderId, setOrderId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/login');
        }

        func();
        getProductDetails();
        getAllOrders();
    }, []);

    const func = () => {
        setName(localStorage.getItem('user'));
    };

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const handleButtonClick = (buttonType) => {
        switch (buttonType) {
            case 'dashboard':
                navigate('/home');
                break;
            case 'products':
                navigate('/product');
                break;
            case 'category':
                navigate('/category');
                break;
            case 'orders':
                navigate('/checkout');
                break;
            case 'summary':
                navigate('/summary');
                break;
            default:
                console.log(`${buttonType} button clicked`);
        }
    };

    const getProductDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/counts`);
            setcountOfTotalProducts(response.data.countOfTotalProducts);
            setcountOutOfStock(response.data.countOutOfStock);
            setcountQtyLessThan10(response.data.countQtyLessThan10);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    const getAllOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/orders/details`);
            setOrderDetails(response.data);
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    const showProducts = async (orderId) => {
        try {
            console.log(orderId);

            const response = await axios.get(`http://localhost:8080/orders/${orderId}/products`);
            setSelectedOrder(response.data);
            console.log(response.data);
            setProducts(response.data);
            setOrderId(orderId);

        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    const Logout = async () => {
        navigate("/login");
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

                            <h6><i class="bi bi-person-circle"></i> Hello {name}</h6>
                        </div>
                    </div>
                </div>
            </nav>

            <Sidebar isOpen={isNavOpen} toggleNav={toggleNav} handleButtonClick={handleButtonClick} Logout={Logout} />




            <p className="orderSum">For detailed order insights, click the corresponding column to unveil additional information.</p>
            <div className="row">
                <div className="col-md-6">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Order Time</th>
                                <th>Customer Name</th>
                                <th>Total</th>
                                <th>User Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails && orderDetails.map((order) => (
                                <tr key={order.id} onClick={() => showProducts(order.id)}>
                                    <td>{order.id}</td>
                                    <td>{order.orderTime}</td>
                                    <td>{order.name}</td>
                                    <td>{order.total}</td>
                                    <td>{order.fullName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="col-md-6">
                    {selectedOrder && (
                        <>
                            <h4>Order ID: {orderId}</h4>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products && products.map((product, index) => (
                                        <tr key={index}>
                                            <td>{product.product}</td>
                                            <td>{product.qty}</td>
                                            <td>{product.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <p className="card-text"><h5>Total Products  </h5> <h6>{countOfTotalProducts}</h6></p>
                    <p className="card-text"><h5>Out Of Stock Products </h5> <h6>{countOutOfStock}</h6></p>
                    <p className="card-text"><h5>Low Stock Products  </h5> <h6>{countQtyLessThan10}</h6></p>
                </div>
            </div>
            <br />
        </>
    );
};

export default Summary;
