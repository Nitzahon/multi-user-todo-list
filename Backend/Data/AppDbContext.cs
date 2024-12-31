using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Task = Backend.Models.Task;

namespace Backend.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Task> Tasks { get; set; } = null!;
        public DbSet<TaskHistory> TaskHistories { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
             base.OnModelCreating(modelBuilder);
            // Task Entity Configuration
            modelBuilder.Entity<Task>(entity =>
            {
                entity.Property(t => t.Status)
                    .HasDefaultValue(Constants.TaskStatus.TODO)
                    .HasMaxLength(20);

                entity.Property(t => t.CreatedDate)
                    .HasDefaultValueSql("GETUTCDATE()");

                entity.HasOne(t => t.AssignedUser)
                    .WithMany()
                    .HasForeignKey(t => t.AssignedUserId)
                    .OnDelete(DeleteBehavior.Restrict);
                entity.HasMany(t => t.TaskHistories)
                    .WithOne(th => th.Task)
                    .HasForeignKey(th => th.TaskId)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            // TaskHistory Entity Configuration
            modelBuilder.Entity<TaskHistory>(entity =>
            {
                entity.Property(th => th.ChangeDate)
                    .HasDefaultValueSql("GETUTCDATE()");

                entity.Property(th => th.ChangeType)
                    .HasDefaultValue(Constants.ChangeType.TaskCreated)
                    .HasMaxLength(100);

                entity.HasOne(th => th.Task)
                    .WithMany(t => t.TaskHistories)
                    .HasForeignKey(th => th.TaskId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(th => th.ChangedByUser)
                    .WithMany()
                    .HasForeignKey(th => th.ChangedByUserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // User Entity Configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(u => u.Role)
                    .HasDefaultValue(Constants.UserRole.USER)
                    .HasMaxLength(10);

                entity.HasIndex(u => u.Email)
                    .IsUnique();
            });
        }
    }
}
