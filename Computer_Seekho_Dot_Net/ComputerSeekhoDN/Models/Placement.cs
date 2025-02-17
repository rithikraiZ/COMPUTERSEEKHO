using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ComputerSeekhoDN.Models;

[Table("placement")]
[Index("BatchId", Name = "FKfjp90ouyl79cs2u450vca7ip9")]
[Index("RecruiterId", Name = "FKmeq262aa8o8iqkv0m6jpj9wog")]
[Index("StudentId", Name = "UKburs792scucffx16rarw5dijl", IsUnique = true)]
public partial class Placement
{
    [Key]
    [Column("placement_id")]
    public int PlacementId { get; set; }

    [Column("ctc")]
    public float Ctc { get; set; }

    [Column("recruiter_id")]
    public int? RecruiterId { get; set; }

    [Column("student_id")]
    public int? StudentId { get; set; }

    [Column("batch_id")]
    public int? BatchId { get; set; }

    [ForeignKey("BatchId")]
    [InverseProperty("Placements")]
    public virtual Batch? Batch { get; set; }

    [ForeignKey("RecruiterId")]
    [InverseProperty("Placements")]
    public virtual Recruiter? Recruiter { get; set; }

    [ForeignKey("StudentId")]
    [InverseProperty("Placement")]
    public virtual Student? Student { get; set; }
}
