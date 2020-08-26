using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace VotingSite
{
    public class PartiesDTO
    {
        public int id { get; set; }

        [Required(ErrorMessage = "Missing name")]
        [MinLength(2, ErrorMessage = " Name must be min 2 chars")]
        [MaxLength(15, ErrorMessage = " Name must be max 15 chars")]
        public string name { get; set; }

        [Required(ErrorMessage = "Missing description")]
        [MaxLength(200, ErrorMessage = " Description must be max 200 chars")]
        public string description { get; set; }
        
        [MaxLength(100, ErrorMessage = " image-code must be max 100 chars")]
        public string image { get; set; }

        [Required(ErrorMessage = "Missing votes")]
        public int votes { get; set; }
    }
}
