import {useEffect, useState} from "react";
import {UserDto} from "../../models/userDto.ts";
import ApiConnector from "../../api/apiConnector.ts";
import {Button, Container} from "semantic-ui-react";
import ProductTableItem from "../product/ProductTableItem.tsx";
import {NavLink} from "react-router-dom";

export default function UserTable()
{
    
    const[users, setUsers] = useState<UserDto[]>([])
    
    useEffect(()=> {
        const fetchData = async () => {
         const fetchedUsers = await ApiConnector.getUser();
         setUsers(fetchedUsers);
        }
        fetchData();
    },[]);    
    
    return (
        <>
            <Container>
                <table className="ui inverted table">
                    <thead style={{textAlign: "center"}}>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Photo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length !== 0 && (
                        users.map((user, index) => (
                            <UserTableItem key={index} product={user}/>
                        ))
                    )}
                    </tbody>

                </table>
                <Button as={NavLink} to="createUser" floated='right' type='button' content='Create User'
                        positive/>
            </Container>
        </>
    )
}