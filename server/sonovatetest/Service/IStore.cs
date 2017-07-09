using System.ServiceModel;
using System.ServiceModel.Web;

using SwaggerWcf.Attributes;

namespace sonovatetest
{
	[ServiceContract]
	public interface IStore
	{
		[SwaggerWcfPath ("Create candidate", "Create a candidate in the store")]
		[WebInvoke (UriTemplate = "/candidates",
			BodyStyle = WebMessageBodyStyle.Bare,
			Method = "POST",
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		[OperationContract]
		Candidate CreateCandidate ([SwaggerWcfParameter (Description = "The candidate to be created")]Candidate candidate);

		[SwaggerWcfPath("Get candidates", "Retrieve all candidates from the store")]
		[WebGet (UriTemplate = "/candidates",
			BodyStyle = WebMessageBodyStyle.Bare,
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		[OperationContract]
		Candidate[] ReadCandidates ();

		[SwaggerWcfPath ("Get candidate", "Retrieve a candidate from the store using its id")]
		[WebGet(UriTemplate = "/candidates/{id}",
			BodyStyle = WebMessageBodyStyle.Bare,
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		[OperationContract]
		Candidate ReadCandidate (int id);

		[SwaggerWcfPath ("Update candidate", "Update a candidate in the store")]
		[WebInvoke(UriTemplate = "/candidates/{id}",
			BodyStyle = WebMessageBodyStyle.Bare,
			Method = "PUT",
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		[OperationContract]
		Candidate UpdateCandidate (int id,
			[SwaggerWcfParameter (Description = "The candidate to be updated.  The id must match the id in the path parameter")]
			Candidate candidate);

		[SwaggerWcfPath ("Delete candidate", "Delete a candidate in the store")]
		[WebInvoke(UriTemplate = "/candidates/{id}",
			BodyStyle = WebMessageBodyStyle.Bare,
			Method = "DELETE",
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		[OperationContract]
		void DeleteCandidate (int id);

		[SwaggerWcfPath ("Create client", "Create a client in the store")]
		[WebInvoke (UriTemplate = "/clients",
			BodyStyle = WebMessageBodyStyle.Bare,
			Method = "POST",
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		[OperationContract]
		Client CreateClient ([SwaggerWcfParameter (Description = "The client to be created")]Client client);

		[SwaggerWcfPath("Get clients", "Retrieve all clients from the store")]
		[WebGet (UriTemplate = "/clients",
			BodyStyle = WebMessageBodyStyle.Bare,
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		[OperationContract]
		Client[] ReadClients ();

		[SwaggerWcfPath ("Get client", "Retrieve a client from the store using its id")]
		[WebGet(UriTemplate = "/clients/{id}",
			BodyStyle = WebMessageBodyStyle.Bare,
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		[OperationContract]
		Client ReadClient (int id);

		[SwaggerWcfPath ("Update client", "Update a client in the store")]
		[WebInvoke(UriTemplate = "/clients/{id}",
			BodyStyle = WebMessageBodyStyle.Bare,
			Method = "PUT",
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		[OperationContract]
		Client UpdateClient (int id,
			[SwaggerWcfParameter (Description = "The client to be updated.  The id must match the id in the path parameter")]
			Client client);

		[SwaggerWcfPath ("Delete client", "Delete a client in the store")]
		[WebInvoke(UriTemplate = "/clients/{id}",
			BodyStyle = WebMessageBodyStyle.Bare,
			Method = "DELETE",
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		[OperationContract]
		void DeleteClient (int id);

		[SwaggerWcfPath ("Create placement", "Create a placement in the store")]
		[WebInvoke (UriTemplate = "/placements",
			BodyStyle = WebMessageBodyStyle.Bare,
			Method = "POST",
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		[OperationContract]
		Placement CreatePlacement ([SwaggerWcfParameter (Description = "The placement to be created")]Placement placement);

		[SwaggerWcfPath("Get placements", "Retrieve all placements from the store")]
		[WebGet (UriTemplate = "/placements",
			BodyStyle = WebMessageBodyStyle.Bare,
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		[OperationContract]
		Placement[] ReadPlacements ();

		[SwaggerWcfPath ("Get placement", "Retrieve a placement from the store using its id")]
		[WebGet(UriTemplate = "/placements/{id}",
			BodyStyle = WebMessageBodyStyle.Bare,
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		[OperationContract]
		Placement ReadPlacement (int id);

		[SwaggerWcfPath ("Update placement", "Update a placement in the store")]
		[WebInvoke(UriTemplate = "/placements/{id}",
			BodyStyle = WebMessageBodyStyle.Bare,
			Method = "PUT",
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		[OperationContract]
		Placement UpdatePlacement (int id,
			[SwaggerWcfParameter (Description = "The placement to be updated.  The id must match the id in the path parameter")]
			Placement placement);

		[SwaggerWcfPath ("Delete placement", "Delete a placement in the store")]
		[WebInvoke(UriTemplate = "/placements/{id}",
			BodyStyle = WebMessageBodyStyle.Bare,
			Method = "DELETE",
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		[OperationContract]
		void DeletePlacement (int id);

		[SwaggerWcfPath ("Get candidate for a placement", "Retrieve the candidate associated with a placement")]
		[WebGet(UriTemplate = "/placements/{id}/candidate",
			BodyStyle = WebMessageBodyStyle.Bare,
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		[OperationContract]
		Candidate ReadPlacementCandidate (int id);

		[SwaggerWcfPath ("Get client for a placement", "Retrieve the client associated with a placement")]
		[WebGet(UriTemplate = "/placements/{id}/client",
			BodyStyle = WebMessageBodyStyle.Bare,
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		[OperationContract]
		Client ReadPlacementClient (int id);
	}
}

