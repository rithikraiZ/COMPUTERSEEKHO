using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ComputerSeekhoDN.Models;

[Table("enquiry")]
[Index("StaffId", Name = "FKeud7g3l135dchk6imapeqd5ih")]
public partial class Enquiry
{
    [Key]
    [Column("enquiry_id")]
    public int EnquiryId { get; set; }

    [Column("course_name")]
    [StringLength(255)]
    public string? CourseName { get; set; }

    [Column("enquirer_address")]
    [StringLength(255)]
    public string? EnquirerAddress { get; set; }

    [Column("enquirer_email_id")]
    [StringLength(255)]
    public string? EnquirerEmailId { get; set; }

    [Column("enquirer_mobile")]
    [StringLength(255)]
    public string? EnquirerMobile { get; set; }

    [Column("enquirer_name")]
    [StringLength(255)]
    public string? EnquirerName { get; set; }

    [Column("enquirer_query")]
    [StringLength(255)]
    public string? EnquirerQuery { get; set; }

    [Column("enquiry_date")]
    public DateOnly? EnquiryDate { get; set; }

    [Column("follow_up_date")]
    public DateOnly? FollowUpDate { get; set; }

    [Column("student_name")]
    [StringLength(255)]
    public string? StudentName { get; set; }

    [Column("staff_id")]
    public int? StaffId { get; set; }

    [Column("enquiry_counter")]
    public int? EnquiryCounter { get; set; }

    [Column("enquiry_is_active")]
    public bool? EnquiryIsActive { get; set; }

    //[InverseProperty("Enquiry")]
    //public virtual ICollection<Followup> Followups { get; set; } = new List<Followup>();

    [ForeignKey("StaffId")]
    //[InverseProperty("Enquiries")]
    public virtual Staff? Staff { get; set; }
}
