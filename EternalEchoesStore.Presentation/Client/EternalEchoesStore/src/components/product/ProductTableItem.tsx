import {ProductDto} from "../../models/productDto.ts";
import {Button} from "semantic-ui-react";
import apiConnector from "../../api/apiConnector.ts";

interface Props{
    product: ProductDto;
}

export default function ProductTableItem({product}: Props) {
    return (
        <>
            <tr className="center aligned">
                <td data-label="Id">{product.id}</td>
                <td data-label="Title">{product.title}</td>
                <td data-label="Description">{product.description}</td>
                <td data-label="CreatedAt">{product.createdAt}</td>
                <td data-label="ImageUrl">{product.imageUrl}</td>
                <td data-label="Category">{product.category}</td>
                <td data-label="SubCategory">{product.subCategory}</td>
                <td data-label="Action">
                    <Button type='submit' color="yellow">Edit</Button>
                    <Button type="button" color="red" negative onClick={async () => {
                        await apiConnector.deleteProduct(product.id!);
                        window.location.reload();
                    }}>Delete</Button>
                </td>
            </tr>
        </>
    )
}