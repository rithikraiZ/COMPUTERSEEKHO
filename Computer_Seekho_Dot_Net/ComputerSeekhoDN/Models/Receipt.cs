using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ComputerSeekhoDN.Models;

[Table("receipt")]
[Index("PaymentId", Name = "UKkcnr2bq3p17a3ur8d6h9dfl6t", IsUnique = true)]
public partial class Receipt
{
    [Key]
    [Column("receipt_id")]
    public int ReceiptId { get; set; }

    [Column("receipt_amount")]
    public double ReceiptAmount { get; set; }

    [Column("receipt_date")]
    public DateOnly ReceiptDate { get; set; }

    [Column("payment_id")]
    public int? PaymentId { get; set; }

    [ForeignKey("PaymentId")]
    [InverseProperty("Receipt")]
    public virtual Payment? Payment { get; set; }
}
