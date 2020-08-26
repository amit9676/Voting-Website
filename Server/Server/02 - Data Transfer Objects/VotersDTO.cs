using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace VotingSite
{
    public class VotersDTO
    {
        public int id { get; set; }

        [Required(ErrorMessage = "Missing first name")]
        [MinLength(2, ErrorMessage = "first name must be min 2 chars")]
        [MaxLength(30, ErrorMessage = "first name must be max 30 chars")]
        public string firstName { get; set; }

        [Required(ErrorMessage = "Missing last name")]
        [MinLength(2, ErrorMessage = "last name must be min 2 chars")]
        [MaxLength(30, ErrorMessage = "last name must be max 30 chars")]
        public string lastName { get; set; }

        [Required(ErrorMessage = "Missing social number")]
        [StringLength(9, ErrorMessage = "social number must be 9 digits")]
        public string socialNumber { get; set; }

        [Required(ErrorMessage = "Missing gender")]
        [MinLength(2, ErrorMessage = "gender must be min 2 chars")]
        [MaxLength(6, ErrorMessage = "gender must be max 6 chars")]
        public string gender { get; set; }

        [Required(ErrorMessage = "Missing email")]
        [MinLength(2, ErrorMessage = "email must be min 2 chars")]
        [MaxLength(100, ErrorMessage = "email must be max 100 chars")]
        public string email { get; set; }

        [Required(ErrorMessage = "Missing phone")]
        [StringLength(10, ErrorMessage = "phone must be 10 digits")]
        public string phone { get; set; }

        [Required(ErrorMessage = "Missing social number issue date")]
        public DateTime socialNumberIssueDate { get; set; }

        [Required(ErrorMessage = "Missing city")]
        [MinLength(2, ErrorMessage = "city must be min 2 chars")]
        [MaxLength(30, ErrorMessage = "city must be max 30 chars")]
        public string city { get; set; }
        public PartiesDTO votedTo { get; set; }
    }
}
