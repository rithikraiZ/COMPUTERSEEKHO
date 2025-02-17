using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ComputerSeekhoDN.Models;

[Table("followup")]
[Index("StaffId", Name = "FK50e1swkfgoljn0b96r2kxh5t9")]
[Index("EnquiryId", Name = "FKpymeqs8lf6wkwp9lsqjj08gy7")]
[NotMapped]
public partial class Followup
{
    [Key]
    [Column("followup_id")]
    public int FollowupId { get; set; }

    [Column("followup_date")]
    public DateOnly? FollowupDate { get; set; }

    [Column("followup_msg")]
    [StringLength(255)]
    public string? FollowupMsg { get; set; }

    [Column("is_active", TypeName = "bit(1)")]
    public ulong? IsActive { get; set; }

    [Column("enquiry_id")]
    public int? EnquiryId { get; set; }

    [Column("staff_id")]
    public int? StaffId { get; set; }

    [ForeignKey("EnquiryId")]
    [InverseProperty("Followups")]
    public virtual Enquiry? Enquiry { get; set; }

    [ForeignKey("StaffId")]
    [InverseProperty("Followups")]
    public virtual Staff? Staff { get; set; }
}
