import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "../App.tsx";
import ProductForm from "../components/product/ProductForm.tsx";
import UserForm from "../components/user/UserForm.tsx";
import AddProductForm from "../components/product/AddProductForm.tsx";
import ViewProduct from "../components/product/ViewProduct.tsx";
import UserTable from "../components/user/UserTable.tsx";

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
                path: 'createProduct1',
                element: <AddProductForm />,
            },
            {
                path: 'viewProduct/:id',
                element: <ViewProduct />, 
            },
            {
               path: 'profile',
               element : <UserTable/> 
            },
            {
                path: 'profile/createUser',
                element: <UserForm/>
            },
            // {
            //     path: 'profile/edit',
            //     element: </>
            // },
            {
                path: '*',
                element: <ProductForm />,
            },
            
            
        ]
    }
]
export const router = createBrowserRouter(routes);