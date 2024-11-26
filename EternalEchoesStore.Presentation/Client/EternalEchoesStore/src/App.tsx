
import './App.css'
import {useEffect} from "react";
import {setupErrorHandlingInterceptor} from "./interceptors/axiosInterceptor.tsx";
import Footer from "./layers/Footer.tsx";
import Header from "./layers/Header.tsx";
import MainContent from "./pages/MainContent.tsx";
import {Link, useLocation} from "react-router-dom";


function App() {
    const location = useLocation();

    useEffect(() => {
        setupErrorHandlingInterceptor()
    }, []);
  return (
    <>
        <div className="app-container">
            <Header/> 
                <nav>
                <Link to="/createProduct1">Add Product</Link>
                {/* Другие ссылки */}
                </nav>
                <MainContent></MainContent>
                <br></br>
                <br></br>
                <Footer/>
        </div>

    </>
  )
}

export default App
