using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ComputerSeekhoDN.Models;

[Table("image")]
[Index("AlbumId", Name = "FKklgd5pxhpuh3nwik115myord")]
public partial class Image
{
    [Key]
    [Column("image_id")]
    public int ImageId { get; set; }

    [Column("image_url")]
    [StringLength(255)]
    public string ImageUrl { get; set; } = null!;

    [Column("album_id")]
    public int? AlbumId { get; set; }

    [Column("image_description")]
    [StringLength(255)]
    public string? ImageDescription { get; set; }

    [Column("imagetitle")]
    [StringLength(255)]
    public string? Imagetitle { get; set; }

    [ForeignKey("AlbumId")]
    [InverseProperty("Images")]
    public virtual Album? Album { get; set; }
}
