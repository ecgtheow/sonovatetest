using System;
using System.Runtime.Serialization;
using System.ComponentModel;

namespace sonovatetest
{
	[DataContract]
	[Description ("The type of placement")]
	public enum PlacementType
	{
		[EnumMember]
		Weekly,
		[EnumMember]
		Monthly
	}
}

