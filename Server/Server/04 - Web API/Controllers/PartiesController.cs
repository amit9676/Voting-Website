using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace VotingSite.Controllers
{
    [EnableCors("*","*","*")]
    public class PartiesController : ApiController
    {
        PartiesLogic logic = new PartiesLogic();

        [HttpGet]
        [Route("api/parties")]
        public HttpResponseMessage GetAllParties()
        {
            try
            {
                using (logic)
                {
                    List<PartiesDTO> allParties = logic.GetAllParties();
                    return Request.CreateResponse(HttpStatusCode.OK, allParties);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpPut]
        [Route("api/parties/{id}")]
        public HttpResponseMessage addVote(PartiesDTO givenParty, int id)
        {
            try
            {
                using (logic)
                {
                    givenParty.id = id;
                    PartiesDTO updatedParty = logic.addVote(givenParty);
                    if (updatedParty == null)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound);
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, updatedParty);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }
    }
}
