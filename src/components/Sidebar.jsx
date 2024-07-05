import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Sidebar = ({ isOpen, toggleNav, handleButtonClick, Logout }) => {
  return (
    <div className={`offcanvas offcanvas-start ${isOpen ? 'show' : ''}`} tabIndex="-1" id="offcanvasNav" aria-labelledby="offcanvasNavLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavLabel">Main Menu</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={toggleNav}></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button type="button" className="btn-offcanvas" onClick={() => handleButtonClick("dashboard")}>
              <i className="bi bi-house-fill"></i> Dashboard
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="btn-offcanvas" onClick={() => handleButtonClick('category')}>
              <i className="bi bi-list-ul"></i> Category
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="btn-offcanvas" onClick={() => handleButtonClick("products")}>
              <i className="bi bi-stack"></i> Products
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="btn-offcanvas" onClick={() => handleButtonClick("orders")}>
              <i className="bi bi-cart-plus-fill"></i> Orders
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="btn-offcanvas" onClick={() => handleButtonClick("summary")}>
              <i className="bi bi-grid-1x2-fill"></i> Summary
            </button>
          </li>
        </ul>
        <div className='col-md-8'>
          <button className="btn btn-primary" onClick={Logout}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
