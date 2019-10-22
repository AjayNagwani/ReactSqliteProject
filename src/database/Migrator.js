import Database from "./Database";
import SQLite from "react-native-sqlite-storage";


export default class Migrator {
    constructor(db,version) {
      //alert(version);
      console.warn("dbVer",version);
      db = db;
     
      this.dbver = version;
      console.log("10");
      this.initDB(db);
      this._migrationsMap = {};
      this._versions = [];
      this._cursor = 0;
    }
  
    _next = ()=> {
      console.log("Next Called");
      if (this._versions[this._cursor]) {
        const next = this._versions[this._cursor];
      //  alert(next);
        this._migrationsMap[next].execute(db, () => {
          this._cursor++;
          this._next();
        });
      } else {
        // done!
        this._cursor = 0;
        // update version stored in the database to current version
      db.transaction((txn) => {
          txn.executeSql("UPDATE version SET version = :version", [this.dbver]);
          console.warn("version updated",this.dbver);
        });
      }
    }

    initDB = (db) => {
      // let db;
      return new Promise((resolve) => {
        console.log("Plugin integrity check ...");
        console.log("Database OPEN");
        db.executeSql('SELECT 1 FROM Migrations LIMIT 1').then(() => {
            console.log("Database is ready ... executing query ...");
          //  for(let i = 1; i < migrations.length; i++){
            // db.transaction((tx) => {
            //  // console.log("Migration[1]",migrations[i].version + " " + migrations[i].sql);
            //   // tx.executeSql('INSERT INTO Migrations (version,migrations) VALUES (?,?)',[migrations[i].version,migrations[i].sql]).then(([tx, results]) => {
            //   //   resolve(results);
            //   //   console.log("Results",results);
            //   // })
            //   console.warn("result[0]",result.rows.item(0).version);
            //   this.currentVersion = result.rows.item(0).version;
            
            // }).then((result) => {
            //   this.closeDatabase(db);
            // }).catch((err) => {
            //   console.log(err);
            // });
         // }
        }).catch((error) =>{
            console.log("Received error: ", error);
            console.log("Database not yet ready ... populating data");
          //  console.log("Migration[0]",migrations[0]);
            db.transaction((tx) => {
                tx.executeSql(`
                CREATE TABLE IF NOT EXISTS Migrations(
                  version_id INTEGER PRIMARY KEY AUTOINCREMENT,
                  version INTEGER,
                  migrations TEXT
                );
                `);
            }).then(() => {
                console.log("Table created successfully");
                this.currentVersion = 0;
                this.closeDatabase(db);
            }).catch(error => {
                console.log(error);
            });
        });
        resolve(db);
        })
      };
      closeDatabase(db) {
        if (db) {
          console.log("Closing DB");
          db.close()
            .then(status => {
              console.log("Database CLOSED");
            })
            .catch(error => {
              this.errorCB(error);
            });
        } else {
          console.log("Database was not OPENED");
        }
      };
  
    // initialize = () => {
    //   db.transaction((txn) => {
    //     txn.executeSql("SELECT name FROM Migrations WHERE type='table' AND name=:name", ['version'], (tx, result) => {
    //       if (!result.rows.length) {
    //         console.log("1");
    //         tx.executeSql('CREATE TABLE IF NOT EXISTS version (version INTEGER)');
    //        alert("Version table created");
    //         tx.executeSql('CREATE INDEX IF NOT EXISTS version_idx ON version (version);');
    //         alert("Version Index table created");
    //         tx.executeSql('INSERT INTO version (version) VALUES (:version)', [0]);
    //         alert("Values inserted");
    //         tx.executeSql('CREATE TABLE IF NOT EXISTS executed_migrations (migration INTEGER)');
    //         alert("Executed Migrations table created");
    //         tx.executeSql('CREATE INDEX IF NOT EXISTS migration_idx ON executed_migrations (migration);')
    //         alert("Migration Index table created");
    //         this.currentVersion = 0;
    //       } else {
    //         console.log("7");
    //         tx.executeSql('SELECT version FROM version LIMIT 1', [], (tx, result) => {
    //          console.warn("result[0]",result.rows.item(0).version);
    //           this.currentVersion = result.rows.item(0).version;
    //         });
    //       }
    //     });
    //   }, error => console.error(error), this.migrate.bind(this));
    // }
  
    migrate = () => {
      alert(this.currentVersion)
      console.log("type",typeof this.currentVersion);
      if (typeof this.currentVersion === 'undefined') {
       
        return; // haven't initialized yet
      }
  
      if (this._cursor === 0 && this.currentVersion < this.dbver) {
        let found = false;
        for (let i = 0; i < this._versions.length && !found; i++) {
          if (this.currentVersion >= this._versions[i]) {
            this._cursor = i + 1;
          } else {
            found = true;
          }
        }
  
        // call migrations
        //alert(this.currentVersion);
        this._next();
      }
    }
  
    up = (migration) => {
      console.log("8");
      if (this._migrationsMap[migration.version]) throw new Error('Migration with that version number already exists');
      this._migrationsMap[migration.version] = migration;
      console.log("9");
      console.log("MigrationMap",this._migrationsMap[migration.version]);
      console.log("MigrationVer",migration.version);
      this._versions.push(migration.version);
      this._versions.sort((a, b) => a - b);
      console.log("migrations",this._migrationsMap);
    }
  }