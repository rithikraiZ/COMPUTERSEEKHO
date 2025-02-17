using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace ComputerSeekhoDN.Models;

[Table("batch")]
[Index("CourseId", Name = "FKlyo26rvg0hs090cwqxgxrw0xn")]
[Index("BatchName", Name = "UKq5tex931a0f4matfbugrldaqi", IsUnique = true)]
public partial class Batch
{
    [Key]
    [Column("batch_id")]
    public int BatchId { get; set; }

    [Column("batch_end_time")]
    public DateOnly? BatchEndTime { get; set; }

    [Column("batch_is_active", TypeName = "bit(1)")]
    public bool BatchIsActive { get; set; }

    [Column("batch_name")]
    public string? BatchName { get; set; }
    
    [Column("batch_photo")]
    [MaxLength(500)]
    public string? BatchPhoto { get; set; }

    [Column("batch_start_time")]
    public DateOnly? BatchStartTime { get; set; }

    [Column("course_id")]
    public int CourseId { get; set; }

    [ForeignKey("CourseId")]
    [InverseProperty("Batches")]
    [JsonInclude]
    public virtual Course Course { get; set; } = null!;

    [InverseProperty("Batch")]
    [JsonIgnore]
    public virtual ICollection<Placement> Placements { get; set; } = new List<Placement>();

    [InverseProperty("Batch")]
    [JsonIgnore]
    public virtual ICollection<Student> Students { get; set; } = new List<Student>();

    [InverseProperty("Batch")]
    [JsonIgnore]
    public virtual ICollection<Video> Videos { get; set; } = new List<Video>();
}
