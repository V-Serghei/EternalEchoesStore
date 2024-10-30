import React from 'react';
import {TbTextSize} from "react-icons/tb";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer_top">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-md-6 col-lg-3">
                            <div className="footer_widget">
                                <div className="footer_logo">
                                    <a href="#">
                                        <img src="/img/logoEESW.png" alt="footer-logo" height={300} width={300}/>
                                    </a>
                                </div>
                                <p>5th flora, 700/D kings road, green <br /> lane New York-1782 <br />
                                    <a href="#">+10 367 826 2567</a> <br />
                                    <a href="#">contact@carpenter.com</a>
                                </p>
                                <div className="socail_links">
                                    <ul>
                                        <li><a href="#"><i className="ti-facebook"></i></a></li>
                                        <li><a href="#"><i className="ti-twitter-alt"></i></a></li>
                                        <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                                        <li><a href="#"><i className="fa fa-pinterest"></i></a></li>
                                        <li><a href="#"><i className="fa fa-youtube-play"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6 col-lg-4 offset-xl-1">
                            <div className="footer_widget">
                                <h3 className="footer_title">Useful Links</h3>
                                <ul>
                                    <li><a href="#">Menu</a></li>
                                    <li><a href="#">About</a></li>
                                    <li><a href="#">Blog</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6 col-lg-4">
                            <div className="footer_widget">
                                <h3 className="footer_title">Subscribe</h3>
                                <form className="newsletter_form">
                                    <input type="text" placeholder="Enter your mail" />
                                    <button type="submit">Subscribe</button>
                                </form>
                                <p className="newsletter_text">Esteem spirit temper too say adieus who direct esteem luckily.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copy-right_text">
                <div className="container">
                    <div className="footer_border"></div>
                    <div className="row">
                        <div className="col-xl-12">
                            <p className="copy_right text-center">
                                Copyright &copy; {new Date().getFullYear()} All rights reserved
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
