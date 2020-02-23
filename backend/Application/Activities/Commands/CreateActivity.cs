using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Activity = Domain.Activity;
using FluentValidation;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Application.Activities.Commands
{
    public class CreateActivity
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Venue).NotEmpty();
            }
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
                var newActivity = new Activity
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue
                };

                _context.Activities.Add(newActivity);

                var currentUser = await _context.Users.SingleOrDefaultAsync(user =>
                    user.UserName == _userAccessor.GetCurrentUsername()
                );

                var newApplicationUserActivity = new ApplicationUserActivity
                {
                    ApplicationUser = currentUser,
                    Activity = newActivity,
                    IsHost = true,
                    DateJoined = DateTime.Now
                };

                _context.ApplicationUserActivities.Add(newApplicationUserActivity);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem adding new activity to the database");
            }
        }
    }
}