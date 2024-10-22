import React from 'react';
import { Link } from 'react-router-dom'; // Use Link instead of <a> for client-side routing

const Header = () => {
    return (
        <div className="header-area">
            <div id="sticky-header" className="main-header-area">
                <div className="container-fluid p-0">
                    <div className="header_bottom_border">
                        <div className="row align-items-center no-gutters">
                            <div className="col-xl-3 col-lg-2">
                                <div className="logo">
                                    <Link to="/">
                                        <img src="/img/logo.png" alt="logo" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-7">
                                <div className="main-menu d-none d-lg-block">
                                    <nav>
                                        <ul id="navigation">
                                            <li><Link className="active" to="/">Home</Link></li>
                                            <li><Link to="/menu">Menu</Link></li>
                                            <li><Link to="#">Pages</Link>
                                                <ul className="submenu">
                                                    <li><Link to="/about">About</Link></li>
                                                    <li><Link to="/elements">Elements</Link></li>
                                                </ul>
                                            </li>
                                            <li><Link to="#">Blog</Link>
                                                <ul className="submenu">
                                                    <li><Link to="/blog">Blog</Link></li>
                                                    <li><Link to="/single-blog">Single Blog</Link></li>
                                                </ul>
                                            </li>
                                            <li><Link to="/contact">Contact</Link></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                                <div className="say_hello">
                                    <Link to="/book">Book a Table</Link>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mobile_menu d-block d-lg-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
