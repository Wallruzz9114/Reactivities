using System;
using System.Security.Claims;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Persistence;

namespace Infrastructure.Security.Authorization.Hosts
{
    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsHostRequirementHandler(DataContext context, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            if (context.Resource is AuthorizationFilterContext authorizationFilterContext)
            {
                var activityId = Guid.Parse(authorizationFilterContext.RouteData.Values["id"].ToString());
                var activity = _context.Activities.FindAsync(activityId).Result;
                var host = activity.ApplicationUserActivities.FirstOrDefault(aua => aua.IsHost);

                var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?.SingleOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)?.Value;

                if (host?.ApplicationUser?.UserName == currentUserName)
                    context.Succeed(requirement);
            }
            else
                context.Fail();

            return Task.CompletedTask;
        }
    }
}