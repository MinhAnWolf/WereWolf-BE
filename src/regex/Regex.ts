class Regex {
  public static username = "^[a-zA-Z][a-zA-Z0-9_]{2,19}$";
  public static password =
    "/^(?=.*[A-Z])(?=.*[a-z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/";
}
