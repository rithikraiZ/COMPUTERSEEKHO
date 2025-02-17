using System;
using System.Collections.Generic;
using ComputerSeekhoDN.Models;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace ComputerSeekhoDN.Repositories;

public partial class ComputerSeekhoDBContext : DbContext
{
	public ComputerSeekhoDBContext()
	{
	}

	public ComputerSeekhoDBContext(DbContextOptions<ComputerSeekhoDBContext> options)
		: base(options)
	{
	}

	public virtual DbSet<Album> Albums { get; set; }

	public virtual DbSet<Batch> Batches { get; set; }

	public virtual DbSet<ClosureReason> ClosureReasons { get; set; }

	public virtual DbSet<Course> Courses { get; set; }

	public virtual DbSet<Enquiry> Enquiries { get; set; }

	//public virtual DbSet<Followup> Followups { get; set; }

	public virtual DbSet<GetInTouch> GetInTouches { get; set; }

	public virtual DbSet<Image> Images { get; set; }

	public virtual DbSet<Payment> Payments { get; set; }

	public virtual DbSet<PaymentType> PaymentTypes { get; set; }

	public virtual DbSet<Placement> Placements { get; set; }

	public virtual DbSet<Receipt> Receipts { get; set; }

	public virtual DbSet<Recruiter> Recruiters { get; set; }

	public virtual DbSet<Staff> Staff { get; set; }

	public virtual DbSet<Student> Students { get; set; }

	public virtual DbSet<Video> Videos { get; set; }

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		=> optionsBuilder.UseMySql("server=localhost;port=3306;database=computerseekho;user=root;password=qazwsxedc", ServerVersion.Parse("8.0.39-mysql"));

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder
			.UseCollation("utf8mb4_0900_ai_ci")
			.HasCharSet("utf8mb4");

		modelBuilder.Entity<Album>(entity =>
		{
			entity.HasKey(e => e.AlbumId).HasName("PRIMARY");
		});

		modelBuilder.Entity<Batch>(entity =>
		{
			entity.HasKey(e => e.BatchId).HasName("PRIMARY");

			entity.HasOne(d => d.Course).WithMany(p => p.Batches)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("FKlyo26rvg0hs090cwqxgxrw0xn");
		});

		modelBuilder.Entity<ClosureReason>(entity =>
		{
			entity.HasKey(e => e.ClosureReasonId).HasName("PRIMARY");
		});

		modelBuilder.Entity<Course>(entity =>
		{
			entity.HasKey(e => e.CourseId).HasName("PRIMARY");
		});

		modelBuilder.Entity<Enquiry>(entity =>
		{
			entity.HasKey(e => e.EnquiryId).HasName("PRIMARY");

			entity.Property(e => e.EnquiryCounter).HasDefaultValueSql("'0'");
			entity.Property(e => e.EnquiryIsActive).HasDefaultValueSql("'1'");

			entity.HasOne(d => d.Staff).WithMany(p => p.Enquiries).HasConstraintName("FKeud7g3l135dchk6imapeqd5ih");
		});

		//modelBuilder.Entity<Followup>(entity =>
		//{
		//    entity.HasKey(e => e.FollowupId).HasName("PRIMARY");

		//    entity.HasOne(d => d.Enquiry).WithMany(p => p.Followups).HasConstraintName("FKpymeqs8lf6wkwp9lsqjj08gy7");

		//    entity.HasOne(d => d.Staff).WithMany(p => p.Followups).HasConstraintName("FK50e1swkfgoljn0b96r2kxh5t9");
		//});

		modelBuilder.Entity<GetInTouch>(entity =>
		{
			entity.HasKey(e => e.GetInTouchId).HasName("PRIMARY");
		});

		modelBuilder.Entity<Image>(entity =>
		{
			entity.HasKey(e => e.ImageId).HasName("PRIMARY");

			entity.HasOne(d => d.Album).WithMany(p => p.Images).HasConstraintName("FKklgd5pxhpuh3nwik115myord");
		});

		modelBuilder.Entity<Payment>(entity =>
		{
			entity.HasKey(e => e.PaymentId).HasName("PRIMARY");

			entity.HasOne(d => d.PaymentType).WithMany(p => p.Payments).HasConstraintName("FKkvolsaw3e4jg4ra05vu135cj9");

			entity.HasOne(d => d.Student).WithMany(p => p.Payments)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("FKq0mpbhvyrwyggk1gwjams69wf");
		});

		modelBuilder.Entity<PaymentType>(entity =>
		{
			entity.HasKey(e => e.PaymentTypeId).HasName("PRIMARY");
		});

		modelBuilder.Entity<Placement>(entity =>
		{
			entity.HasKey(e => e.PlacementId).HasName("PRIMARY");

			entity.HasOne(d => d.Batch).WithMany(p => p.Placements).HasConstraintName("FKfjp90ouyl79cs2u450vca7ip9");

			entity.HasOne(d => d.Recruiter).WithMany(p => p.Placements).HasConstraintName("FKmeq262aa8o8iqkv0m6jpj9wog");

			entity.HasOne(d => d.Student).WithOne(p => p.Placement).HasConstraintName("FKtnlbpdla0lw8qpqb9pq0wfwvj");
		});

		modelBuilder.Entity<Receipt>(entity =>
		{
			entity.HasKey(e => e.ReceiptId).HasName("PRIMARY");

			entity.HasOne(d => d.Payment).WithOne(p => p.Receipt).HasConstraintName("FKol02cxv1xmyc8j9o2npop6bs5");
		});

		modelBuilder.Entity<Recruiter>(entity =>
		{
			entity.HasKey(e => e.RecruiterId).HasName("PRIMARY");
		});

		modelBuilder.Entity<Staff>(entity =>
		{
			entity.HasKey(e => e.StaffId).HasName("PRIMARY");
		});

		modelBuilder.Entity<Student>(entity =>
		{
			entity.HasKey(e => e.StudentId).HasName("PRIMARY");

			entity.HasOne(d => d.Batch).WithMany(p => p.Students).HasConstraintName("FK17mfv6a26cwnmli2b6vm00dn7");

			entity.HasOne(d => d.Course).WithMany(p => p.Students).HasConstraintName("FKdfypyqt0stgfc0aij9kcxm99s");
		});

		modelBuilder.Entity<Video>(entity =>
		{
			entity.HasKey(e => e.VideoId).HasName("PRIMARY");

			entity.HasOne(d => d.Batch).WithMany(p => p.Videos).HasConstraintName("FKn0uhqipq35vpweapnpy5ykekj");

			entity.HasOne(d => d.Course).WithMany(p => p.Videos).HasConstraintName("FKgcpx5x8vhp9j5f9nhxlxqx45m");
		});

		OnModelCreatingPartial(modelBuilder);
	}

	partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
