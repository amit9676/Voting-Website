using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace VotingSite
{
    [EnableCors("*", "*", "*")]
    public class VotersController : ApiController
    {
        VotersLogic logic = new VotersLogic();

        [HttpGet]
        [Route("api/voters")]
        public HttpResponseMessage GetAllVoters()
        {
            try
            {
                using (logic)
                {
                    List<VotersDTO> allVoters = logic.GetAllVoters();
                    return Request.CreateResponse(HttpStatusCode.OK, allVoters);
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpPost]
        [Route("api/voters")]
        public HttpResponseMessage AddVoters(VotersDTO givenVoter)
        {
            try
            {
                using (logic)
                {
                    VotersDTO addedVoter = logic.addVoter(givenVoter);
                    return Request.CreateResponse(HttpStatusCode.Created, addedVoter);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpPut]
        [Route("api/voters/{id}")]
        public HttpResponseMessage UpdateVoters(VotersDTO givenVoter, int id)
        {
            try
            {
                using (logic)
                {
                    givenVoter.id = id;
                    VotersDTO updatedVoter = logic.UpdateVoter(givenVoter);
                    if (updatedVoter == null)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound);
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, updatedVoter);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }
    }
}
