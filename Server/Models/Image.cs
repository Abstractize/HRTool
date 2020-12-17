﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Server.Models
{
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
    }
}