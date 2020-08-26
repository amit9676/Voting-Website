using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace VotingSite
{
    public class VotersLogic : BaseLogic
    {
        
        public List<VotersDTO> GetAllVoters()
        {
            return DB.Voters.Select(p => new VotersDTO
            {
                id = p.VoterID,
                firstName = p.FirstName,
                lastName = p.LastName,
                socialNumber = p.SocialNumber,
                city = p.City,
                email = p.Email,
                gender = p.Gender,
                socialNumberIssueDate = p.SocialNumberIssueDate,
                phone = p.Phone,
                votedTo = p.Party != null ? new PartiesDTO {id = p.Party.PartyID, description = p.Party.Description, name = p.Party.Name, image = p.Party.Image, votes = p.Party.Votes} : null
            }).ToList();
        }

        public VotersDTO addVoter(VotersDTO givenVoter)
        {
            Voter voterToAdd = new Voter
            {
                FirstName = givenVoter.firstName,
                LastName = givenVoter.lastName,
                City = givenVoter.city,
                SocialNumber = givenVoter.socialNumber,
                SocialNumberIssueDate = givenVoter.socialNumberIssueDate,
                Email = givenVoter.email,
                Phone = givenVoter.phone,
                Gender = givenVoter.gender,
                PartyID = null
            };
            DB.Voters.Add(voterToAdd);
            DB.SaveChanges();
            givenVoter.id = voterToAdd.VoterID;
            return givenVoter;
        }

        public VotersDTO UpdateVoter(VotersDTO givenVoter)
        {
            Voter voterToUpdate = DB.Voters.Where(p => p.VoterID == givenVoter.id).SingleOrDefault();
            if (voterToUpdate == null)
            {
                return null;
            }
            voterToUpdate.FirstName = givenVoter.firstName;
            voterToUpdate.LastName = givenVoter.lastName;
            voterToUpdate.City = givenVoter.city;
            voterToUpdate.SocialNumber = givenVoter.socialNumber;
            voterToUpdate.SocialNumberIssueDate = givenVoter.socialNumberIssueDate;
            voterToUpdate.Email = givenVoter.email;
            voterToUpdate.Phone = givenVoter.phone;
            voterToUpdate.Gender = givenVoter.gender;

            if (givenVoter.votedTo != null)
            {
                voterToUpdate.PartyID = givenVoter.votedTo.id;
            }
            else
            {
                voterToUpdate.PartyID = null;
            }


            DB.SaveChanges();
            return givenVoter;

        }
    }
}
