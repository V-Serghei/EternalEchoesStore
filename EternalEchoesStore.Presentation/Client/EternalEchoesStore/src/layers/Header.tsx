import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaUserCircle, FaShoppingCart } from 'react-icons/fa';

const Header = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const toggleNotifications = () => setShowNotifications(!showNotifications);
    const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
    const toggleCart = () => setShowCart(!showCart);

    return (
        <header className="header">
            <div className="container">
                <div className="logo" >
                    <Link to="/">
                        <img src="/img/logoEESW.png" alt="logo"   />
                    </Link>
                </div>

                <nav className="navbar">
                    <ul className="nav_links">
                        <li><Link to="/Home">Home</Link></li>
                        <li><Link to="/Index">Index</Link></li>
                        <li><Link to="/Store">Store</Link></li>
                    </ul>
                </nav>

                <div className="header_buttons">
                    <div className="icon_with_menu">
                        <FaBell onClick={toggleNotifications} className="icon" />
                        {showNotifications && (
                            <div className="dropdown_menu notifications">
                                <h4>Notifications</h4>
                                <div className="dropdown_content">
                                    <p>No new notifications</p>
                                    {/* Добавьте список уведомлений здесь */}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="icon_with_menu">
                        <FaShoppingCart onClick={toggleCart} className="icon" />
                        {showCart && (
                            <div className="dropdown_menu cart">
                                <h4>Your Cart</h4>
                                <div className="dropdown_content">
                                    <p>Your cart is empty</p>
                                    {/* Добавьте список товаров в корзине здесь */}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="icon_with_menu">
                        <FaUserCircle onClick={toggleProfileMenu} className="icon" />
                        {showProfileMenu && (
                            <div className="dropdown_menu profile">
                                <ul>
                                    <li><Link to="/profile">Profile</Link></li>
                                    <li><Link to="/settings">Settings</Link></li>
                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                    <li><Link to="/logout">Logout</Link></li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <Link to="/login" className="btn login_btn">Login</Link>
                    <Link to="/signup" className="btn signup_btn">Sign Up</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
