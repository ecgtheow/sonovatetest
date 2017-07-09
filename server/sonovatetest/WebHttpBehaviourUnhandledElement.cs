using System;
using System.ServiceModel.Web;
using System.ServiceModel.Dispatcher;
using System.ServiceModel.Description;
using System.ServiceModel.Configuration;
using System.ServiceModel.Channels;

namespace sonovatetest
{
	public class WebHttpBehaviourUnhandledElement: BehaviorExtensionElement
	{
		public override Type BehaviorType {
			get {
				return typeof(WebHttpBehaviourUnhandled);
			}
		}

		protected override object CreateBehavior ()
		{
			return new WebHttpBehaviourUnhandled ();
		}
	}

	public class WebHttpBehaviourUnhandled: WebHttpBehavior
	{
		public override void ApplyDispatchBehavior (ServiceEndpoint endpoint, EndpointDispatcher dispatcher)
		{
			base.ApplyDispatchBehavior (endpoint, dispatcher);

			dispatcher.DispatchRuntime.Operations.Remove (dispatcher.DispatchRuntime.UnhandledDispatchOperation);
			dispatcher.DispatchRuntime.UnhandledDispatchOperation = new DispatchOperation (dispatcher.DispatchRuntime, "*", "*", "*") {
				Invoker = new UnhandledOperationInvoker (),
				DeserializeRequest = false,
				SerializeReply = false
			};
		}
	}

	internal class UnhandledOperationInvoker: IOperationInvoker
	{
		public bool IsSynchronous {
			get {
				return true;
			}
		}

		public object[] AllocateInputs ()
		{
			return new object[1];
		}

		public object Invoke (object instance, object[] inputs, out object[] outputs)
		{
			Message result = Message.CreateMessage (MessageVersion.None, "*", "Endpoint not found");
			WebOperationContext.Current.OutgoingResponse.ContentType = "text/xml";

			outputs = new object[0];

			return result;
		}

		public IAsyncResult InvokeBegin (object instance, object[] inputs, AsyncCallback callback, object state)
		{
			throw new System.NotImplementedException ();
		}

		public object InvokeEnd (object instance, out object[] outputs, IAsyncResult result)
		{
			throw new System.NotImplementedException ();
		}
	}
}

