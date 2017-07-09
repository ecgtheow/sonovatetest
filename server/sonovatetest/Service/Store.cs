using System;
using System.IO;
using System.Net;
using System.ServiceModel.Web;

using SQLite.Net;
using SQLite.Net.Platform.Generic;
using SQLiteNetExtensions.Extensions;

using SwaggerWcf.Attributes;

namespace sonovatetest
{
	[SwaggerWcf ("/api/store")]
	public class Store: IStore
	{
		private const string dbPath = "svtest.sqlite";
		private SQLiteConnection connection;

		public Store ()
		{
			connection = new SQLiteConnection (new SQLitePlatformGeneric (), dbPath);

			this.PopulateCandidates ();
			this.PopulateClients ();
			this.PopulatePlacements ();
		}

		~Store ()
		{
			Console.WriteLine ("Closing Store");
			connection.Close ();
		}

		private void PopulateCandidates ()
		{
			/* Creates if not exists */
			connection.CreateTable<Candidate> ();

			if (connection.Table<Candidate> ().Count () == 0) {
				Console.WriteLine ("Populating candidates data");
				connection.Insert (new Candidate () {
					Name = "Desperate Dan"
				});
				connection.Insert (new Candidate () {
					Name = "Dennis the Menace"
				});
			}
		}

		/* Ensure Clients and Candidates are populated first */
		private void PopulatePlacements ()
		{
			connection.CreateTable<Placement> ();

			if (connection.Table<Placement> ().Count () == 0) {
				Console.WriteLine ("Populating placements data");
				Placement placement1 = new Placement () {
					JobTitle = "Portable Hole Digger",
					Start = 1498867200000,
					End = 1506729600000,
					PlacementType = PlacementType.Weekly,
					Candidate = connection.Get<Candidate> (1),
					Client = connection.Get<Client> (1)
				};
				connection.Insert (placement1);
				connection.UpdateWithChildren (placement1);

				Placement placement2 = new Placement () {
					JobTitle = "Cyborg Trainer",
					Start = 1493596800000,
					End = 1503964800000,
					PlacementType = PlacementType.Monthly,
					Candidate = connection.Get<Candidate> (2),
					Client = connection.Get<Client> (2)
				};
				connection.Insert (placement2);
				connection.UpdateWithChildren (placement2);
			}
		}

		private void PopulateClients ()
		{
			connection.CreateTable<Client> ();

			if (connection.Table<Client> ().Count () == 0) {
				Console.WriteLine ("Populating clients data");
				connection.Insert (new Client () {
					Name = "Acme Corporation, Inc"
				});
				connection.Insert (new Client () {
					Name = "Cyberdyne Systems, Inc"
				});
			}
		}

		[SwaggerWcfTag ("Candidates")]
		[SwaggerWcfResponse (HttpStatusCode.Created, "Candidate created, value in the response body with id updated")]
		public Candidate CreateCandidate (Candidate candidate)
		{
			WebOperationContext woc = WebOperationContext.Current;

			connection.Insert (candidate);
			woc.OutgoingResponse.StatusCode = HttpStatusCode.Created;

			return candidate;
		}

		[SwaggerWcfTag ("Candidates")]
		[SwaggerWcfResponse (HttpStatusCode.OK, "Candidates found, values in the response body")]
		[SwaggerWcfResponse (HttpStatusCode.NoContent, "No candidates found")]
		public Candidate[] ReadCandidates ()
		{
			WebOperationContext woc = WebOperationContext.Current;

			try {
				int count = connection.Table<Candidate> ().Count ();

				if (count > 0) {
					woc.OutgoingResponse.StatusCode = HttpStatusCode.OK;

					return connection.Query<Candidate> ("SELECT * FROM Candidates").ToArray ();
				} else {
					woc.OutgoingResponse.StatusCode = HttpStatusCode.NoContent;

					return new Candidate[0];
				}
			} catch (Exception ex) {
				Console.WriteLine ("ReadCandidates exception: {0}", ex);
				return new Candidate[0];
			}
		}

		[SwaggerWcfTag ("Candidates")]
		[SwaggerWcfResponse (HttpStatusCode.OK, "Candidate found, value in the response body")]
		[SwaggerWcfResponse (HttpStatusCode.NotFound, "Candidate not found")]
		public Candidate ReadCandidate (int id)
		{
			WebOperationContext woc = WebOperationContext.Current;

			try {
				woc.OutgoingResponse.StatusCode = HttpStatusCode.OK;

				return connection.Get<Candidate> (id);
			} catch (InvalidOperationException) {
				/* Not found */
				woc.OutgoingResponse.StatusCode = HttpStatusCode.NotFound;

				return null;
			}
		}

		[SwaggerWcfTag ("Candidates")]
		[SwaggerWcfResponse (HttpStatusCode.OK, "Candidate updated")]
		[SwaggerWcfResponse (HttpStatusCode.NotFound, "Candidate not found")]
		public Candidate UpdateCandidate (int id, Candidate candidate)
		{
			WebOperationContext woc = WebOperationContext.Current;

			if (id != candidate.Id) {
				woc.OutgoingResponse.StatusCode = HttpStatusCode.NotFound;
				woc.OutgoingResponse.StatusDescription = "Candidate ID mismatch";
				return null;
			}

			connection.Update (candidate);

			woc.OutgoingResponse.StatusCode = HttpStatusCode.OK;

			return candidate;
		}

		[SwaggerWcfTag ("Candidates")]
		[SwaggerWcfResponse (HttpStatusCode.NoContent, "Candidate deleted")]
		[SwaggerWcfResponse (HttpStatusCode.NotFound, "Candidate not found")]
		public void DeleteCandidate (int id)
		{
			WebOperationContext woc = WebOperationContext.Current;

			int rowcount = connection.Delete<Candidate> (id);
			if (rowcount > 0) {
				/* Item was deleted */
				woc.OutgoingResponse.StatusCode = HttpStatusCode.NoContent;
			} else {
				woc.OutgoingResponse.StatusCode = HttpStatusCode.NotFound;
				woc.OutgoingResponse.StatusDescription = "Candidate not found";
			}
		}

		[SwaggerWcfTag ("Clients")]
		[SwaggerWcfResponse (HttpStatusCode.Created, "Client created, value in the response body with id updated")]
		public Client CreateClient (Client client)
		{
			WebOperationContext woc = WebOperationContext.Current;

			connection.Insert (client);
			woc.OutgoingResponse.StatusCode = HttpStatusCode.Created;

			return client;
		}

		[SwaggerWcfTag ("Clients")]
		[SwaggerWcfResponse (HttpStatusCode.OK, "Clients found, values in the response body")]
		[SwaggerWcfResponse (HttpStatusCode.NoContent, "No clients found")]
		public Client[] ReadClients ()
		{
			WebOperationContext woc = WebOperationContext.Current;

			try {
				int count = connection.Table<Client> ().Count ();

				if (count > 0) {
					woc.OutgoingResponse.StatusCode = HttpStatusCode.OK;

					return connection.Query<Client> ("SELECT * FROM Clients").ToArray ();
				} else {
					woc.OutgoingResponse.StatusCode = HttpStatusCode.NoContent;

					return new Client[0];
				}
			} catch (Exception ex) {
				Console.WriteLine ("ReadClients exception: {0}", ex);
				return new Client[0];
			}
		}

		[SwaggerWcfTag ("Clients")]
		[SwaggerWcfResponse (HttpStatusCode.OK, "Client found, value in the response body")]
		[SwaggerWcfResponse (HttpStatusCode.NotFound, "Client not found")]
		public Client ReadClient (int id)
		{
			WebOperationContext woc = WebOperationContext.Current;

			try {
				woc.OutgoingResponse.StatusCode = HttpStatusCode.OK;

				return connection.Get<Client> (id);
			} catch (InvalidOperationException) {
				/* Not found */
				woc.OutgoingResponse.StatusCode = HttpStatusCode.NotFound;

				return null;
			}
		}

		[SwaggerWcfTag ("Clients")]
		[SwaggerWcfResponse (HttpStatusCode.OK, "Client updated")]
		[SwaggerWcfResponse (HttpStatusCode.NotFound, "Client not found")]
		public Client UpdateClient (int id, Client client)
		{
			WebOperationContext woc = WebOperationContext.Current;

			if (id != client.Id) {
				woc.OutgoingResponse.StatusCode = HttpStatusCode.NotFound;
				woc.OutgoingResponse.StatusDescription = "Client ID mismatch";
				return null;
			}

			connection.Update (client);

			woc.OutgoingResponse.StatusCode = HttpStatusCode.OK;

			return client;
		}

		[SwaggerWcfTag ("Clients")]
		[SwaggerWcfResponse (HttpStatusCode.NoContent, "Client deleted")]
		[SwaggerWcfResponse (HttpStatusCode.NotFound, "Client not found")]
		public void DeleteClient (int id)
		{
			WebOperationContext woc = WebOperationContext.Current;

			int rowcount = connection.Delete<Client> (id);
			if (rowcount > 0) {
				/* Item was deleted */
				woc.OutgoingResponse.StatusCode = HttpStatusCode.NoContent;
			} else {
				woc.OutgoingResponse.StatusCode = HttpStatusCode.NotFound;
			}
		}

		[SwaggerWcfTag ("Placements")]
		[SwaggerWcfResponse (HttpStatusCode.Created, "Placement created, value in the response body with id updated")]
		public Placement CreatePlacement (Placement placement)
		{
			WebOperationContext woc = WebOperationContext.Current;

			connection.Insert (placement);
			woc.OutgoingResponse.StatusCode = HttpStatusCode.Created;

			return placement;
		}

		[SwaggerWcfTag ("Placements")]
		[SwaggerWcfResponse (HttpStatusCode.OK, "Placements found, values in the response body")]
		[SwaggerWcfResponse (HttpStatusCode.NoContent, "No placements found")]
		public Placement[] ReadPlacements ()
		{
			WebOperationContext woc = WebOperationContext.Current;

			try {
				int count = connection.Table<Placement> ().Count ();

				if (count > 0) {
					woc.OutgoingResponse.StatusCode = HttpStatusCode.OK;

					return connection.Query<Placement> ("SELECT * FROM Placements").ToArray ();
				} else {
					woc.OutgoingResponse.StatusCode = HttpStatusCode.NoContent;

					return new Placement[0];
				}
			} catch (Exception ex) {
				Console.WriteLine ("ReadPlacements exception: {0}", ex);
				return new Placement[0];
			}
		}

		[SwaggerWcfTag ("Placements")]
		[SwaggerWcfResponse (HttpStatusCode.OK, "Placement found, value in the response body")]
		[SwaggerWcfResponse (HttpStatusCode.NotFound, "Placement not found")]
		public Placement ReadPlacement (int id)
		{
			WebOperationContext woc = WebOperationContext.Current;

			try {
				woc.OutgoingResponse.StatusCode = HttpStatusCode.OK;

				return connection.GetWithChildren<Placement> (id);
			} catch (InvalidOperationException) {
				/* Not found */
				woc.OutgoingResponse.StatusCode = HttpStatusCode.NotFound;

				return null;
			}
		}

		[SwaggerWcfTag ("Placements")]
		[SwaggerWcfResponse (HttpStatusCode.OK, "Placement updated")]
		[SwaggerWcfResponse (HttpStatusCode.NotFound, "Placement not found")]
		public Placement UpdatePlacement (int id, Placement placement)
		{
			WebOperationContext woc = WebOperationContext.Current;

			if (id != placement.Id) {
				woc.OutgoingResponse.StatusCode = HttpStatusCode.NotFound;
				woc.OutgoingResponse.StatusDescription = "Placement ID mismatch";
				return null;
			}

			connection.Update (placement);

			woc.OutgoingResponse.StatusCode = HttpStatusCode.OK;

			return placement;
		}

		[SwaggerWcfTag ("Placements")]
		[SwaggerWcfResponse (HttpStatusCode.NoContent, "Placement deleted")]
		[SwaggerWcfResponse (HttpStatusCode.NotFound, "Placement not found")]
		public void DeletePlacement (int id)
		{
			WebOperationContext woc = WebOperationContext.Current;

			int rowcount = connection.Delete<Placement> (id);
			if (rowcount > 0) {
				/* Item was deleted */
				woc.OutgoingResponse.StatusCode = HttpStatusCode.NoContent;
			} else {
				woc.OutgoingResponse.StatusCode = HttpStatusCode.NotFound;
			}
		}

		[SwaggerWcfTag ("Placements")]
		[SwaggerWcfResponse (HttpStatusCode.OK, "Candidate found, value in the response body")]
		[SwaggerWcfResponse (HttpStatusCode.NotFound, "Candidate not found")]
		public Candidate ReadPlacementCandidate (int id)
		{
			WebOperationContext woc = WebOperationContext.Current;

			try {
				woc.OutgoingResponse.StatusCode = HttpStatusCode.OK;

				Placement p = connection.GetWithChildren<Placement> (id);

				return p.Candidate;
			} catch (InvalidOperationException) {
				/* Not found */
				woc.OutgoingResponse.StatusCode = HttpStatusCode.NotFound;

				return null;
			}
		}

		[SwaggerWcfTag ("Placements")]
		[SwaggerWcfResponse (HttpStatusCode.OK, "Client found, value in the response body")]
		[SwaggerWcfResponse (HttpStatusCode.NotFound, "Client not found")]
		public Client ReadPlacementClient (int id)
		{
			WebOperationContext woc = WebOperationContext.Current;

			try {
				woc.OutgoingResponse.StatusCode = HttpStatusCode.OK;

				Placement p = connection.GetWithChildren<Placement> (id);

				return p.Client;
			} catch (InvalidOperationException) {
				/* Not found */
				woc.OutgoingResponse.StatusCode = HttpStatusCode.NotFound;

				return null;
			}
		}
	}
}
