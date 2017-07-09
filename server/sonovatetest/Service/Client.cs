using System;
using System.ServiceModel;
using System.Runtime.Serialization;
using System.ComponentModel;
using System.Collections.Generic;

using SQLite.Net.Attributes;
using SQLiteNetExtensions.Attributes;
using SwaggerWcf.Attributes;

namespace sonovatetest
{
	[Table ("Clients")]
	[DataContract (Name = "client")]
	[Description ("A client that owns placements")]
	public class Client
	{
		public Client ()
		{
		}

		[PrimaryKey, AutoIncrement]
		[DataMember (Name = "id")]
		[Description ("Client ID")]
		public int Id {get; set;}

		[DataMember (Name = "name")]
		[Description ("Client name")]
		public string Name { get; set; }

		[DataMember (Name = "placements")]
		[Description ("Placements owned by this client")]
		[OneToMany(CascadeOperations = CascadeOperation.All)]
		public List<Placement> Placements { get; set; }
	}
}
