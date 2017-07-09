using System;
using System.ServiceModel;
using System.Runtime.Serialization;
using System.ComponentModel;

using SQLite.Net.Attributes;
using SQLiteNetExtensions.Attributes;
using SwaggerWcf.Attributes;

namespace sonovatetest
{
	[Table ("Placements")]
	[DataContract (Name = "placement")]
	[Description ("A placement")]
	public class Placement
	{
		public Placement ()
		{
		}

		[PrimaryKey, AutoIncrement]
		[DataMember (Name = "id")]
		[Description ("Placement ID")]
		public int Id {get; set;}

		[DataMember (Name = "jobtitle")]
		[Description ("Placement job title")]
		public string JobTitle { get; set; }

		[DataMember (Name = "startdate")]
		[Description ("Placement start date as ms since the Unix epoch")]
		public Int64 Start { get; set; }

		[DataMember (Name = "enddate")]
		[Description ("Placement end date as ms since Unix epoch")]
		public Int64 End { get; set; }

		[DataMember (Name = "placementtype")]
		[Description ("Placement type")]
		public PlacementType PlacementType { get; set; }

		[DataMember (Name = "candidate")]
		[Description ("Placement candidate")]
		[ManyToOne(CascadeOperations = CascadeOperation.All)]
		public Candidate Candidate { get; set; }

		[DataMember (Name = "client")]
		[Description ("Placement client")]
		[ManyToOne(CascadeOperations = CascadeOperation.All)]
		public Client Client { get; set; }

		[ForeignKey(typeof(Client))]
		[DataMember (Name = "clientid")]
		[Description ("Placement client ID")]
		public int ClientId { get; set; }

		[ForeignKey(typeof(Candidate))]
		[DataMember (Name = "candidateid")]
		[Description ("Placement candidate ID")]
		public int CandidateId { get; set; }
	}
}
