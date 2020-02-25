using System.Linq;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos.Commands
{
    public class AddPhoto
    {
        public class Command : IRequest<Photo>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Photo>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
            {
                // Get activity from database
                var photoUploadResult = _photoAccessor.AddPhoto(request.File);
                var currentUser = await _context.Users
                    .SingleOrDefaultAsync(user => user.UserName == _userAccessor.GetCurrentUsername());
                var newPhoto = new Photo
                {
                    Id = photoUploadResult.PublicId,
                    URL = photoUploadResult.URL
                };

                // Check if main photo, if not set it
                if (!currentUser.Photos.Any(photo => photo.IsMain))
                    newPhoto.IsMain = true;

                currentUser.Photos.Add(newPhoto);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return newPhoto;

                throw new Exception("Problem uploading new photo");
            }
        }
    }
}