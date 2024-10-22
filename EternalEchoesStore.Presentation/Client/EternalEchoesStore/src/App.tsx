
import './App.css'
import ProductTable from "./components/product/ProductTable.tsx";
import {Outlet, useLocation} from "react-router-dom";
import {Container, Header} from "semantic-ui-react";
import {useEffect} from "react";
import {setupErrorHandlingInterceptor} from "./interceptors/axiosInterceptor.tsx";
import Footer from "./layers/Footer.tsx";

function App() {
    const location = useLocation();

    useEffect(() => {
        setupErrorHandlingInterceptor()
    }, []);
  return (
    <>
       
            <Header /> 
            <Outlet/>
            <Footer />
        
        
    </>
  )
}

export default App
