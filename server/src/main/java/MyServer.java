/** The main class for the application.
 *
 * Command line arguments are of the form:
 * [port] [path] [name]...
 *
 * Example:
 * 31400 ./ t00 Double Aughts
 */
public class MyServer {

  /** Mainprogram starts a web microserver on the specified network port
   *
   * @param args command line arguments optionally containing port, path, and name for server.
   */
  public static void main(String[] args) {

    MicroServer server = new MicroServer(getPort(args), getPath(args), getName(args));

  }

  /** Obtain the port number from the command line arguments.  Defaults if non-provided.
   *
   * @param args
   * @return
   */
  private static int getPort(String[] args) {

    if (args.length > 0)
      return Integer.parseInt(args[0]);
    else
      return 8088; // some default
  }

  /** Obtain the file path from the command line arguments.  Defaults if non-provided.
   *
   * @param args
   * @return
   */
  private static String getPath(String[] args) {

    if (args.length > 1)
      return args[1];
    else
      return "./"; // some default
  }

  /** Obtain the name from the command line arguments.  Defaults to an empty string.
   *
   * @param args
   * @return
   */
  private static String getName(String[] args) {
    if (args.length > 2) {
      String name = args[2];
      for (int i = 3; i < args.length; i++)
        name = name + " " + args[i];
      return name;
    }
    else
      return "";
  }

}