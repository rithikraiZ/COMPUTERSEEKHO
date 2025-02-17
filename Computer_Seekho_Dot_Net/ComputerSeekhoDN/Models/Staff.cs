using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace ComputerSeekhoDN.Models;

[Table("staff")]
public partial class Staff
{
    [Key]
    [Column("staff_id")]
    public int StaffId { get; set; }

    [Column("photo_url")]
    [StringLength(255)]
    public string PhotoUrl { get; set; } = null!;

    [Column("staff_email")]
    [StringLength(255)]
    public string StaffEmail { get; set; } = null!;

    [Column("staff_mobile")]
    [StringLength(255)]
    public string StaffMobile { get; set; } = null!;

    [Column("staff_name")]
    [StringLength(255)]
    public string StaffName { get; set; } = null!;

    [Column("staff_password")]
    [StringLength(255)]
    public string StaffPassword { get; set; } = null!;

    [Column("staff_role")]
    [StringLength(255)]
    public string StaffRole { get; set; } = null!;

    [Column("staff_username")]
    [StringLength(30)]
    public string StaffUsername { get; set; } = null!;

    [InverseProperty("Staff")]
    [JsonIgnore]
    public virtual ICollection<Enquiry> Enquiries { get; set; } = new List<Enquiry>();

    //[InverseProperty("Staff")]
    //public virtual ICollection<Followup> Followups { get; set; } = new List<Followup>();
}
