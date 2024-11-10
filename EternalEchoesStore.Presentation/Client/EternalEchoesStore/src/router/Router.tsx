import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "../App.tsx";
import ProductForm from "../components/product/ProductForm.tsx";
import UserForm from "../components/user/UserForm.tsx";

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
            },
            {
                path: 'createUser',
                element: <UserForm mode="create"/>,
            },
            {
                path: 'editUser/:id',
                element: <UserForm mode="edit"/>,
            },
            {
                path: '*',
                element: <UserForm />,
            }
        ]
    }
]
export const router = createBrowserRouter(routes);