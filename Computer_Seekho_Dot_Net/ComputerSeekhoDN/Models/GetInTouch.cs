using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ComputerSeekhoDN.Models;

[Table("get_in_touch")]
public partial class GetInTouch
{
    [Key]
    [Column("get_in_touch_id")]
    public int GetInTouchId { get; set; }

    [Column("course_name")]
    [StringLength(255)]
    public string? CourseName { get; set; }

    [Column("enquirer_email")]
    [StringLength(255)]
    public string? EnquirerEmail { get; set; }

    [Column("enquirer_name")]
    [StringLength(255)]
    public string? EnquirerName { get; set; }

    [Column("enquirer_phone")]
    [StringLength(255)]
    public string? EnquirerPhone { get; set; }

    [Column("enquiry_message")]
    [StringLength(255)]
    public string? EnquiryMessage { get; set; }
}
