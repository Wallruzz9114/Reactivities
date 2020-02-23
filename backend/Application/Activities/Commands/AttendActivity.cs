using System.Net;
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Application.Activities.Commands
{
    public class AttendActivity
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // Get activity from database
                var activityFromDB = await _context.Activities.FindAsync(request.Id);

                if (activityFromDB == null)
                    throw new RESTException(HttpStatusCode.NotFound, new { Activity = "Could not find activity" });

                var currentUser = await _context.Users.SingleOrDefaultAsync(user =>
                    user.UserName == _userAccessor.GetCurrentUsername()
                );
                var attendance = await _context.ApplicationUserActivities.SingleOrDefaultAsync(aua =>
                    aua.ActivityId == activityFromDB.Id && aua.ApplicationUserId == currentUser.Id
                );

                if (attendance != null)
                    throw new RESTException(HttpStatusCode.BadRequest, new { Attendence = "Already attending this activity" });

                attendance = new ApplicationUserActivity
                {
                    Activity = activityFromDB,
                    ApplicationUser = currentUser,
                    IsHost = false,
                    DateJoined = DateTime.Now
                };

                _context.ApplicationUserActivities.Add(attendance);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem adding new attendance to the database");
            }
        }
    }
}