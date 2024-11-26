import {UserDto} from "../../models/userDto.ts";
import {Button} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import apiConnector from "../../api/apiConnector.ts";

interface Props {
    user: UserDto,
}
export default function UserTableItem({user}:Props)
{
    console.log(user)
    
    return (
        <>
            <tr className="center aligned">
                <td data-label="id">{user.id}</td>
                <td data-label="name">{user.name}</td>
                <td data-label="surname">{user.surname}</td>
                <td data-label="email">{user.email}</td>
                <td data-label="password">{user.password}</td>
                <td data-label="photo">{user.photo}</td>
                <td data-label="Action">
                    <Button as={NavLink} to={`profile/editUser/${user.id}`} type='submit' color="green">Edit</Button>
                    <Button type="button" color="orange" negative onClick={async () => {
                        await apiConnector.deleteUser(user.id!);
                        window.location.reload();
                    }}>Delete</Button>
                </td>
            </tr>
        </>
    )
}