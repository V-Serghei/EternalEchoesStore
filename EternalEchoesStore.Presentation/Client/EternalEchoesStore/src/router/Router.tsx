import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "../App.tsx";
import ProductForm from "../components/product/ProductForm.tsx";
import AddProductForm from "../components/product/AddProductForm.tsx";
import ViewProduct from "../components/product/ViewProduct.tsx";

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
                element: <AddProductForm />, // Страница для добавления продукта
            },
            {
                path: 'viewProduct/:id',
                element: <ViewProduct />, // Страница для просмотра продукта
            },
            {
                path: '*',
                element: <ProductForm />,
            }
        ]
    }
]
export const router = createBrowserRouter(routes);