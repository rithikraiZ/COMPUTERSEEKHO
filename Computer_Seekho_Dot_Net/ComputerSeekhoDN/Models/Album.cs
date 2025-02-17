using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace ComputerSeekhoDN.Models;

[Table("album")]
public partial class Album
{
    [Key]
    [Column("album_id")]
    public int AlbumId { get; set; }

    [Column("album_description")]
    [StringLength(255)]
    public string? AlbumDescription { get; set; }

    [Column("is_active", TypeName = "bit(1)")]
    public ulong? IsActive { get; set; }

    [Column("album_name")]
    [StringLength(255)]
    public string AlbumName { get; set; } = null!;

    [Column("end_date")]
    public DateOnly? EndDate { get; set; }

    [Column("start_date")]
    public DateOnly? StartDate { get; set; }

    [InverseProperty("Album")]
    [JsonIgnore]
    public virtual ICollection<Image> Images { get; set; } = new List<Image>();
}
