import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {UserDto} from "../../models/userDto.ts";
import apiConnector from "../../api/apiConnector.ts";

export default function UserForm()
{
    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserDto>({
        id: undefined,
        Name: '',
        Surname: '',
        Email: '',
        Password: '',
        Photo: '',
        CreatedAt: ''
    });
    useEffect(()=>{
        if(id){
            apiConnector.getUserById(id).then(users => setUser(user!))
        }
    },[]);
    return (
        <> 
        </>
    )
}