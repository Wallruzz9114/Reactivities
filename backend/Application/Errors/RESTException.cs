using System.Net;
using System;

namespace Application.Errors
{
    public class RESTException : Exception
    {
        public HttpStatusCode Code { get; set; }
        public object Errors { get; set; }

        public RESTException(HttpStatusCode code, object errors = null)
        {
            Code = code;
            Errors = errors;
        }
    }
}