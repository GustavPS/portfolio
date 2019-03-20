const mysql = require('mysql');

export class SqlHandler {
  private static pool: any = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "pluto971005",
    database: "portfolio"
  });

  public static getConnection(callback): void {
    SqlHandler.pool.getConnection((err, connection) => {
      if(err) throw err;
      callback(connection);
    });
  }
}
