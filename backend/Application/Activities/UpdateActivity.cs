using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class UpdateActivity
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // Get activity from database
                var activityFromDB = await _context.Activities.FindAsync(request.Id);

                if (activityFromDB == null)
                    throw new Exception("Could not grab activity from database");

                // Update properties inside activity (will add mapping later)
                activityFromDB.Title = request.Title ?? activityFromDB.Title;
                activityFromDB.Description = request.Description ?? activityFromDB.Description;
                activityFromDB.Category = request.Category ?? activityFromDB.Category;
                activityFromDB.Date = request.Date ?? activityFromDB.Date;
                activityFromDB.City = request.City ?? activityFromDB.City;
                activityFromDB.Venue = request.Venue ?? activityFromDB.Venue;


                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving updated activity to the database");
            }
        }
    }
}