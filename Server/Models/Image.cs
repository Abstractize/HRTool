﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Server.Models
{
    /// <summary>
    /// Image model for Database.
    /// </summary>
    [Table("Image")]
    public partial class Image
    {
        public Image()
        {
            EmployeeData = new HashSet<EmployeeData>();
        }

        [Key]
        public int IdImage { get; set; }
        public byte[] Data { get; set; }

        [InverseProperty(nameof(Models.EmployeeData.IdImageNavigation))]
        public virtual ICollection<EmployeeData> EmployeeData { get; set; }
        /// <summary>
        /// Returns Empty Image Model
        /// </summary>
        public static Image Empty { get => new Image { IdImage = 0, Data = new byte[0] }; }
    }
}
