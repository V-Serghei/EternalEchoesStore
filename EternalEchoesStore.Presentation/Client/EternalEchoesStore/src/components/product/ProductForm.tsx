    import {NavLink, useNavigate, useParams} from "react-router-dom";
    import {ChangeEvent, useEffect, useState} from "react";
    import {ProductDto} from "../../models/productDto.ts";
    import apiConnector from "../../api/apiConnector.ts";
    import {Button, Form, Segment} from "semantic-ui-react";




    export default function ProductForm({ mode }: { mode?: string }) {
        const { id } = useParams();
        const navigate = useNavigate();

        const [product, setProduct] = useState<ProductDto>({
            id: undefined,
            title: '',
            description: '',
            createdAt: undefined,
            imageUrl: '',
            category: '',
            subCategory: '',
        });

        useEffect(() => {
            if (id) {
                apiConnector.getProductById(Number(id)).then(product =>
                    setProduct(product!)
                );
            }
        }, [id]);

        async function handleSubmit() {
            if (mode === 'create') {
                await apiConnector.createProduct(product).then(() => {
                    navigate('/');
                });
            } else {
                await apiConnector.editProduct(product).then(() => {
                    navigate('/');
                });
            }

        }

        function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
            const { name, value } = event.target;
            setProduct(prevProduct => ({
                ...prevProduct,
                [name]: value
            }));
        }

        return (
            <Segment clearing inverted>
                <Form onSubmit={handleSubmit} autoComplete='off' className='ui inverted form'>
                    <Form.Input placeholder='Title' name='title' value={product.title} onChange={handleInputChange} />
                    <Form.Input placeholder='Category' name='category' value={product.category} onChange={handleInputChange} />
                    <Form.Input placeholder='SubCategory' name='subCategory' value={product.subCategory} onChange={handleInputChange} />
                    <Form.TextArea placeholder='Description' name='description' value={product.description} onChange={handleInputChange} />
                    <Form.Input placeholder='ImageUrl' name='imageUrl' value={product.imageUrl} onChange={handleInputChange} />
                    <Button floated='right' positive type='submit' content='Submit' />
                    <Button as={NavLink} to='/' floated='right' type='button' content='Cancel' />
                </Form>
            </Segment>
        );
    }
