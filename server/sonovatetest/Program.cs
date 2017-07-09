using System;
using System.ServiceModel;
using System.ServiceModel.Web;

using SwaggerWcf;

namespace sonovatetest
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			var address = new Uri ("http://localhost:8080/api/store");
			var host = new WebServiceHost (typeof(Store)/*, address*/);
			host.Open ();

			var swaggerHost = new WebServiceHost (typeof(SwaggerWcfEndpoint));
			swaggerHost.Open ();

			Console.WriteLine ("Type [CR] to stop...");
			Console.ReadLine ();

			host.Close ();
			swaggerHost.Close ();
		}
	}
}
