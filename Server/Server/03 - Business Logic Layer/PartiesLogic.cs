using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace VotingSite
{
    public class PartiesLogic : BaseLogic
    {
        public List<PartiesDTO> GetAllParties()
        {
            return DB.Parties.Select(p => new PartiesDTO
            {
                id = p.PartyID,
                description = p.Description,
                name = p.Name,
                image = p.Image,
                votes = p.Votes
            }).ToList();
        }

        public PartiesDTO addVote(PartiesDTO givenParty)
        {
            Party partyToUpdate = DB.Parties.Where(p => p.PartyID == givenParty.id).SingleOrDefault();
            if (partyToUpdate == null)
            {
                return null;
            }
            partyToUpdate.Votes++;

            DB.SaveChanges();
            return givenParty;

        }
    }
}
