using Domain;

namespace Application.Interfaces
{
    public interface IJWTGenerator
    {
        string CreateToken(ApplicationUser user);
    }
}