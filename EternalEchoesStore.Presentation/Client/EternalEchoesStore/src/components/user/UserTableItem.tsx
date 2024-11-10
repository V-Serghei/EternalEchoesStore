import {UserDto} from "../../models/userDto.ts";
import {Button} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import apiConnector from "../../api/apiConnector.ts";

interface Props {
    user: UserDto,
}
export default function UserTableItem({user}:Props)
{
    return (
        <>
            <tr className="center aligned">
                <td data-label="Id">{user.id}</td>
                <td data-label="Title">{user.Name}</td>
                <td data-label="Description">{user.Surname}</td>
                <td data-label="CreatedAt">{user.Email}</td>
                <td data-label="ImageUrl">{user.Password}</td>
                <td data-label="Category">{user.Photo}</td>
                <td data-label="Action">
                    <Button as={NavLink} to={`editUser/${user.id}`} type='submit' color="green">Edit</Button>
                    <Button type="button" color="orange" negative onClick={async () => {
                        await apiConnector.deleteUser(user.id!);
                        window.location.reload();
                    }}>Delete</Button>
                </td>
            </tr>
        </>
    )
}