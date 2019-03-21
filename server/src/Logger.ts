export class Logger {
  private static GENERAL: number = 0;
  private static DEBUG: number = 1;
  private static WARNING: number = 2;

  private static LEVEL = Logger.WARNING;

  public static GitHub(text: string) {
    if(Logger.LEVEL >= Logger.DEBUG)
      console.log(`GitHub:\x1b[0m ${text}`);
  }

  public static General(text: string) {
    console.log(`\x1b[32mINFO:\x1b[0m ${text}`);
  }

  public static Debug(text: string) {
    if(Logger.LEVEL >= Logger.DEBUG)
      console.log(`\x1b[33mDEBUG:\x1b[0m ${text}`);
  }
  public static Warning(text: string) {
    console.log(`\x1b[31mWARNING:\x1b[0m ${text}`);
  }
}
