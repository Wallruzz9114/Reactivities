using System.Security.AccessControl;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<ApplicationUser>
    {
        public DataContext(DbContextOptions options) : base(options) { }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<ApplicationUserActivity> ApplicationUserActivities { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUserActivity>(b => b.HasKey(ua => new { ua.ApplicationUserId, ua.ActivityId }));
            builder.Entity<ApplicationUserActivity>()
                .HasOne(au => au.ApplicationUser)
                .WithMany(a => a.ApplicationUserActivities)
                .HasForeignKey(au => au.ApplicationUserId);
            builder.Entity<ApplicationUserActivity>()
                .HasOne(a => a.Activity)
                .WithMany(au => au.ApplicationUserActivities)
                .HasForeignKey(a => a.ActivityId);
        }
    }
}
