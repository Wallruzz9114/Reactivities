using System.Net;
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class DeleteActivity
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                    throw new RESTException(HttpStatusCode.NotFound, new { activity = "Not found" });

                _context.Remove(activityFromDB);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem adding new activity to the database");
            }
        }
    }
}