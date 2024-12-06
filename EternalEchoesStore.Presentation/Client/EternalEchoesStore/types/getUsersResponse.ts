import {UserDto} from "./userDto.ts";

export interface GetUsersResponse{
    userDtos: UserDto[];
}