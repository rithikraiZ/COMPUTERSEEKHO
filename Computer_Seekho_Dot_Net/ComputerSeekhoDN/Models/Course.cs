using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace ComputerSeekhoDN.Models;

[Table("course")]
public partial class Course
{
    [Key]
    [Column("course_id")]
    public int CourseId { get; set; }

    [Column("course_description")]
    [StringLength(500)]
    public string? CourseDescription { get; set; }

    [Column("course_duration")]
    public int? CourseDuration { get; set; }

    [Column("course_fee")]
    public double? CourseFee { get; set; }

    [Column("course_is_active", TypeName = "bit(1)")]
    public ulong? CourseIsActive { get; set; }

    [Column("course_name")]
    [StringLength(100)]
    public string? CourseName { get; set; }

    [Column("course_syllabus")]
    [StringLength(200)]
    public string? CourseSyllabus { get; set; }

    [Column("cover_photo")]
    [StringLength(100)]
    public string? CoverPhoto { get; set; }

    [InverseProperty("Course")]
    [JsonIgnore]
    public virtual ICollection<Batch> Batches { get; set; } = new List<Batch>();

    [InverseProperty("Course")]
    [JsonIgnore]
    public virtual ICollection<Student> Students { get; set; } = new List<Student>();

    [InverseProperty("Course")]
    [JsonIgnore]
    public virtual ICollection<Video> Videos { get; set; } = new List<Video>();
}
