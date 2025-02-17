using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace ComputerSeekhoDN.Models;

[Table("recruiter")]
public partial class Recruiter
{
    [Key]
    [Column("recruiter_id")]
    public int RecruiterId { get; set; }

    [Column("recruiter_location")]
    [StringLength(50)]
    public string RecruiterLocation { get; set; } = null!;

    [Column("recruiter_name")]
    [StringLength(255)]
    public string RecruiterName { get; set; } = null!;

    [Column("recruiter_photo")]
    [StringLength(255)]
    public string RecruiterPhoto { get; set; } = null!;

    [InverseProperty("Recruiter")]
    [JsonIgnore]
    public virtual ICollection<Placement> Placements { get; set; } = new List<Placement>();
}
