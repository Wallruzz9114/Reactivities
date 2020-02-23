using Application.Activities.DTOs;
using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDTO>();
            CreateMap<ApplicationUserActivity, ActivityAttendeeDTO>()
                .ForMember(dest => dest.Username, options => options.MapFrom(source => source.ApplicationUser.UserName))
                .ForMember(dest => dest.DisplayName, options => options.MapFrom(source => source.ApplicationUser.DisplayName));
        }
    }
}