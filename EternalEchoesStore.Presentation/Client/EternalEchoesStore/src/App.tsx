
import './App.css'
import ProductTable from "./components/product/ProductTable.tsx";
import {Outlet, useLocation} from "react-router-dom";
import {Container} from "semantic-ui-react";
import {useEffect} from "react";
import {setupErrorHandlingInterceptor} from "./interceptors/axiosInterceptor.tsx";

function App() {
    const location = useLocation();

    useEffect(() => {
        setupErrorHandlingInterceptor()
    }, []);
  return (
    <>
        {location.pathname === "/" ? <ProductTable/>:(
            <Container className="container-style">
                <Outlet/>
            </Container>
        )}
        
    </>
  )
}

export default App
