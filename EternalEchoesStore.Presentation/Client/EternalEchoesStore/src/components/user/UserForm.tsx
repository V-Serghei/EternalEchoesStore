import {NavLink, useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {UserDto} from "../../models/userDto.ts";
import apiConnector from "../../api/apiConnector.ts";
import {Button, Form, Segment} from "semantic-ui-react";

export default function UserForm()
{
    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserDto>({
        id: undefined,
        name: '',
        surname: '',
        email: '',
        password: '',
        photo: '',
        createdAt: undefined,
    });
    useEffect(()=>{
        if(id){
            apiConnector.getUserById(Number(id)).then(users => setUser(user!))
        }
    },[id]);
    
    function handleSubmit()
    {
        if(!user.id){
            apiConnector.createUser(user).then(()=>navigate('/profile'));
        } else{
            apiConnector.editUser(user).then(()=>navigate('/profile'));
        }
    }
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setUser(prevState => ({...user, [name]: value}))
    }
    
    return (
        <Segment clearing inverted>
            <Form onSubmit={handleSubmit} autoComplete='off' className='ui inverted form'>
                <Form.Input placeholder='Name' name='name' value={user.name} onChange={handleInputChange}/>
                <Form.Input placeholder='Surname' name='surname' value={user.surname} onChange={handleInputChange}/>
                <Form.Input placeholder='Email' name='email' value={user.email} onChange={handleInputChange}/>
                <Form.Input placeholder='Password' name='password' value={user.password} onChange={handleInputChange}/>
                <Form.Input placeholder='Photo' name='photo' value={user.photo} onChange={handleInputChange}/>
                <Button floated ='right' positive type='submit' content='Submit'/>
                <Button as={NavLink} to={'/profile'} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}