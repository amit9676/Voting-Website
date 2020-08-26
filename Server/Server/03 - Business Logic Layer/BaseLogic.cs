using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VotingSite
{
    public class BaseLogic : IDisposable
    {
        protected VotingSiteEntities DB = new VotingSiteEntities();

        public void Dispose()
        {
            DB.Dispose();
        }
    }
}
