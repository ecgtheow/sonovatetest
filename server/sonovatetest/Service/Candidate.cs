using System.ServiceModel;
using System.Runtime.Serialization;
using System.ComponentModel;
using System.Collections.Generic;

using SQLite.Net.Attributes;
using SQLiteNetExtensions.Attributes;
using SwaggerWcf.Attributes;

namespace sonovatetest
{
	[Table ("Candidates")]
	[DataContract (Name = "candidate")]
	[Description ("A placement candidate")]
	public class Candidate
	{
		public Candidate ()
		{
		}

		[PrimaryKey, AutoIncrement]
		[DataMember (Name = "id")]
		[Description ("Candidate ID")]
		public int Id {get; set;}

		[DataMember (Name = "name")]
		[Description ("Candidate name")]
		public string Name { get; set; }

		[DataMember (Name = "placements")]
		[Description ("Placements filled by this candidate")]
		[OneToMany(CascadeOperations = CascadeOperation.All)]
		public List<Placement> Placements { get; set; }
	}
}

