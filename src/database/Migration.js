export default class Migration {
  
  constructor(version, sql) {
      this.version = version;
      this.sql = sql;
     // alert(sql);
    }
  
    execute = (db, next) => {
      console.warn("DB",db)
      function exec(tx, sql) {
        tx.executeSql(sql);
      }
  
      db.transaction(txn => {
        console.log("Migration Started..",this.version)
        txn.executeSql("SELECT migration FROM executed_migrations WHERE migration=:migration", [this.version], (tx, result) => {
         console.log("Length",this.version);
         console.log("Sql",this.sql);
          if (this.version > 0) {
            if (Array.isArray(this.sql)) {
              this.sql.forEach(s => exec(tx, s));
            } else {
              exec(tx, this.sql);
            }
            console.log("Migration Version",this.version);
            tx.executeSql('INSERT INTO executed_migrations (migration) VALUES (:migration)', [this.version]);
            console.log("Inserted",this.version);
          }
        });
      }, error => {
        Sentry.captureException(error, { logger: 'sqlite.migrations' });
        next(error);
      }, next);
    }
  }