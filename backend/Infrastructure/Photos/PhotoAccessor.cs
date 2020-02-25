using System;
using Application.Interfaces;
using Application.Photos.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary _cloudinary;

        public PhotoAccessor(IOptions<CloudinarySettings> cloudinaryConfiguration)
        {
            var account = new Account(
                cloudinaryConfiguration.Value.CloudName,
                cloudinaryConfiguration.Value.APIKey,
                cloudinaryConfiguration.Value.APISecret
            );

            _cloudinary = new Cloudinary(account);
        }

        public PhotoUploadResult AddPhoto(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                // Read the file into memory
                using (var stream = file.OpenReadStream())
                {
                    var uploadParameters = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream),
                        // Crop and focus on faces (for profile pictures)
                        Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParameters);
                }
            }

            // Check for errors
            if (uploadResult.Error != null)
                throw new Exception(uploadResult.Error.Message);

            return new PhotoUploadResult
            {
                PublicId = uploadResult.PublicId,
                URL = uploadResult.SecureUri.AbsoluteUri
            };
        }

        public string DeletePhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = _cloudinary.Destroy(deleteParams);

            return result.Result == "ok" ? result.Result : null;
        }
    }
}