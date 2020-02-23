using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security.Authorization.Hosts
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }
}