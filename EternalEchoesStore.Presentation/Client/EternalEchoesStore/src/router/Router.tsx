import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "../App.tsx";
import ProductForm from "../components/product/ProductForm.tsx";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: 'createProduct',
                element: <ProductForm mode="create"/>,
            },
            {
                path: 'editProduct/:id',
                element: <ProductForm mode="edit"/>,
            },
            {
                path: '*',
                element: <ProductForm />,
            }
        ]
    }
]
export const router = createBrowserRouter(routes);