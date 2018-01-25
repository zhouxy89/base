import static spark.Spark.get;
import static spark.Spark.init;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.secure;
import static spark.Spark.staticFiles;

import spark.Request;
import spark.Response;

/* The simplest form of web server.
 */
public class MicroServer extends WebServer {
  /**
   * Loads static files from a known location and provide micro-services.
   */
  MicroServer(int portNumber) {

    port(portNumber);
    //secure(keyFile,keyPass,trustFile,trustPath);
    // allow static files
    staticFiles.externalLocation("/Users/davematt/OneDrive - Colostate/cs314/eclipse/webclient/public");


    // register all micro-services and the function that services them.
    get("/about", this::about);
    get("/echo", this::echo);
    get("/hello/:name", this::hello);
    post("/plan", this::plan);

    init();
  }

  private String about(Request request, Response response) {
    response.type("text/html");
    return "<html><head></head><body><h1>Welcome to the CS314 T00 Micro Server</h1></body></html>";
  }

  private String echo(Request request, Response response) {
    response.type("text/plain");
    return "attributes:" + request.attributes()
        + "\nbody:" + request.body()
        + "\ncontentLength:" + request.contentLength()
        + "\ncontentType:" + request.contentType()
        + "\ncontextPath:" + request.contextPath()
        + "\ncookies:" + request.cookies()
        + "\nheaders:" + request.headers()
        + "\nhost:" + request.host()
        + "\nip:" + request.ip()
        + "\nparams:" + request.params()
        + "\npathInfo:" + request.pathInfo()
        + "\nport:" + request.port()
        + "\nprotocol:" + request.protocol()
        + "\nqueryMap:" + request.queryMap()
        + "\nqueryParams:" + request.queryParams()
        + "\nraw:" + request.raw()
        + "\nrequestMethod:" + request.requestMethod()
        + "\nscheme:" + request.scheme()
        + "\nservletPath:" + request.servletPath()
        + "\nsession:" + request.session()
        + "\nsplat:" + request.splat()
        + "\nuri():" + request.uri()
        + "\nurl():" + request.url()
        + "\nuserAgent:" + request.userAgent();
  }

  private String hello(Request request, Response response) {
    response.type("text/html");
    return Greeting.hello(request.params(":name"));
  }


  private String plan(Request request, Response response) {
    response.type("application/json");
    return "{\"title\" : \"worldsmall - 49 cities\",\"destinations\" : [\"AR-0515\",\"TNCA\",\"YGTP\",\"FLRU\"]}";
  }
}