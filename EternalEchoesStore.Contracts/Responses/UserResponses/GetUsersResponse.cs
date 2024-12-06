using EternalEchoesStore.Contracts.Dtos;

namespace EternalEchoesStore.Contracts.Responses.UserResponses;

public record GetUsersResponse(List<UserDto> UserDtos);