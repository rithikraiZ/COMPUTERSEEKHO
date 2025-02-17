using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ComputerSeekhoDN.Models;

[Table("closure_reason")]
public partial class ClosureReason
{
    [Key]
    [Column("closure_reason_id")]
    public int ClosureReasonId { get; set; }

    [Column("closure_reason_desc")]
    [StringLength(255)]
    public string? ClosureReasonDesc { get; set; }

    [Column("enquirer_name")]
    [StringLength(255)]
    public string? EnquirerName { get; set; }
}
