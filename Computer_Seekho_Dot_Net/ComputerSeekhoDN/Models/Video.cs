using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ComputerSeekhoDN.Models;

[Table("video")]
[Index("CourseId", Name = "FKgcpx5x8vhp9j5f9nhxlxqx45m")]
[Index("BatchId", Name = "FKn0uhqipq35vpweapnpy5ykekj")]
public partial class Video
{
    [Key]
    [Column("video_id")]
    public int VideoId { get; set; }

    [Column("end_date")]
    public DateOnly? EndDate { get; set; }

    [Column("start_date")]
    public DateOnly? StartDate { get; set; }

    [Column("video_description")]
    [StringLength(60)]
    public string? VideoDescription { get; set; }

    [Column("is_active", TypeName = "bit(1)")]
    public ulong? IsActive { get; set; }

    [Column("video_url")]
    [StringLength(255)]
    public string? VideoUrl { get; set; }

    [Column("batch_id")]
    public int? BatchId { get; set; }

    [Column("course_id")]
    public int? CourseId { get; set; }

    [ForeignKey("BatchId")]
    [InverseProperty("Videos")]
    public virtual Batch? Batch { get; set; }

    [ForeignKey("CourseId")]
    [InverseProperty("Videos")]
    public virtual Course? Course { get; set; }
}
