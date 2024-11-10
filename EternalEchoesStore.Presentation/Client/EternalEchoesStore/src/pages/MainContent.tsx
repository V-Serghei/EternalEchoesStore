import React, {useEffect} from 'react';
import ProductTable from "../components/product/ProductTable.tsx";
import {setupErrorHandlingInterceptor} from "../interceptors/axiosInterceptor.tsx";
import {Outlet, useLocation} from "react-router-dom";
import {Container} from "semantic-ui-react";

const MainContent = () => {

    const location = useLocation();

    useEffect(() => {
        setupErrorHandlingInterceptor()
    }, []);
    return (
        <div className="main-content" >    
            
            <>
                {location.pathname === "/" ? <ProductTable/>:(
                    <Container className="container-style">
                        <Outlet/>
                    </Container>
                )}

            </>
            
        </div>
    );
};export default MainContent;
