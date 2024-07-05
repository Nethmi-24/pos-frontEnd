import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from '../components/Sidebar'; // Import the Sidebar component
import logo from './logo.png';

const Product = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [uname, setuName] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
    getCategories();
    setuName(localStorage.getItem('user'));
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products");
      setProducts(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/categories");
      setCategories(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleViewProduct = (productId) => {
    navigate(`/SingleProduct/${productId}`);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleButtonClick = (buttonType) => {
    switch (buttonType) {
      case "dashboard":
        navigate("/home");
        break;
      case "category":
        navigate("/category");
        break;
      case "products":
        navigate("/product");
        break;
      case "orders":
        navigate("/checkout");
        break;
      case "summary":
        navigate("/summary");
        break;
      default:
        console.log(`${buttonType} button clicked`);
    }
    setIsNavOpen(false);
  };

  const ManageProduct = () => {
    navigate("/manageproducts");
  };

  const Logout = async () => {
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar fixed-top" data-bs-theme="white" style={{backgroundColor:"#028391"}}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation" onClick={toggleNav}>
            <span className="navbar-toggler-icon"></span>
          </button>

         
          <div className="parent-container">
            <div className="h5">
              <h6><i className="bi bi-person-circle"></i> Hello {uname}</h6>
            </div>
          </div>
        </div>
      </nav>

      <Sidebar isOpen={isNavOpen} toggleNav={toggleNav} handleButtonClick={handleButtonClick} Logout={Logout} />

      <div className="main-content">
        <h1>Product</h1>
        <h3 style={{marginLeft:"25px" ,marginTop:"15px"}}><i className="bi bi-archive-fill"> </i>Products</h3>
        <div className="container">
          <div className="row">
            {products && products.map((product) => (
              <div key={product.id} className="col-lg-4 col-md-6 col-12 mb-4">
                <div className="card" style={{ width: "22rem", margin: "10px" }}>
                  <div className="card-body">
                    <h3 className="card-title">{product.name}</h3>
                    <h4>
                      <span className="badge bg-secondary">{product.categoryEntity?.name}</span>
                    </h4>
                    <p className="card-text">Price: {product.price} LKR</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <h4>
                        <span className={`badge ${product.qty === 0 ? "bg-danger" : product.qty < 10 ? "bg-warning" : "bg-success"}`}>
                          {product.qty === 0 ? "Out of Stock" : product.qty < 10 ? "Low Stock" : "In Stock"}
                        </span>
                      </h4>
                      {product.qty > 0 && (
                        <button onClick={() => handleViewProduct(product.id)} className="btn btn-primary">
                          View Product
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="button" className="btn btn-outline-primary" onClick={ManageProduct}>
          + Manage Products
        </button>
      </div>
    </>
  );
};

export default Product;
