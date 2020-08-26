using System;
using System.Collections.Generic;
using System.Web.Http.ModelBinding;

namespace VotingSite
{
    public class ErrorsManager
    {
        public static string GetInnerMeesage(Exception ex)
        {
#if DEBUG
            if (ex.InnerException == null)
                return ex.Message;

            return GetInnerMeesage(ex.InnerException);
#else
        return "Some error occurred, please try again.";
#endif
        }

    }
}