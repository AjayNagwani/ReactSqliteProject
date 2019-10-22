import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);


const database_name = "Reactoffline.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;


export default class MigrationDatabase {
  initDB = (migrations) => {
    let db;
    return new Promise((resolve) => {
      console.log("Plugin integrity check ...");
      SQLite.echoTest()
        .then(() => {
          console.log("Integrity check passed ...");
          console.log("Opening database ...");
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size
          )
            .then(DB => {
              db = DB;
              var len;
              console.log("Database OPEN");
              db.executeSql('SELECT 1 FROM Migrations LIMIT 1').then(() => {
                console.log("Database is ready... Executing Queries..")
                db.transaction((tx) => {
                  tx.executeSql('SELECT version FROM Migrations', []).then(([tx,results]) => {
                    console.log("Query completed");
                     len = results.rows.length;
                
                   console.log("Length",len);
                   console.log("Length Migrations",migrations.length);
                  });
                  const resultsComplete = []
                  db.transaction((tx) => {
                   for(let i = len; i < migrations.length; i++){
                    tx.executeSql(`${migrations[i].sql}`);
                      console.log("Migration[1]",migrations[i].version + " " + migrations[i].sql);
                      tx.executeSql('INSERT INTO Migrations (version,migrations) VALUES (?,?)',[migrations[i].version,migrations[i].sql]).then(([tx, results]) => {
                       
                        console.log("Results",results);
                        resultsComplete.push(results);

                      })
                    
                      
                      
                    }
                    console.log("For loop ended");
                  
                }).then((result) => {
                  resolve(resultsComplete);
                  console.log("Result", result)
                  this.closeDatabase(db);
                })
             
              
                  }).then((result) => {
                   
                  }).catch((err) => {
                    console.log(err);
                  });
                 
              }).catch((error) => {
                  console.log("Received error: ", error);
                  console.log("Database not yet ready ... populating data");
                  console.log("Migration[0]",migrations[0]);
                  const resultsComplete = []
                  db.transaction((tx) => {
                  for(let i = 0; i < migrations.length; i++){
                    if(i === 0){
                      console.log("Outer tx",tx);
                        tx.executeSql(`
                        CREATE TABLE IF NOT EXISTS Migrations(
                          version_id INTEGER PRIMARY KEY AUTOINCREMENT,
                          version INTEGER,
                          migrations TEXT
                        );
                        `).then(([tx,result]) => {
                          console.log("Table created successfully");
                          console.log("Inner tx",tx);
                          console.log("Inner result",result);
                          
                        });
                        tx.executeSql(`${migrations[i].sql}`);
                        // db.transaction((tx) => {
                       
                        // }).then(() => {
                        //   console.log("User Table created successfully");
                        // })
                        tx.executeSql('INSERT INTO Migrations (version,migrations) VALUES (?,?)',[migrations[i].version,migrations[i].sql]).then(([tx, results]) => {
                          resultsComplete.push(results);

                          console.log("Results",results);
                        })
                       
                    }
                    else{
                      console.log(`Migration[0] '${migrations[i].sql}'`,migrations[i].version + " " + migrations[i].sql);
                     tx.executeSql(`${migrations[i].sql}`);
                      tx.executeSql('INSERT INTO Migrations (version,migrations) VALUES (?,?)',[migrations[i].version,migrations[i].sql]).then(([tx, results]) => {
                        resultsComplete.push(results);
                        console.log("Results",results);
                      })
                      // tx.executeSql(migrations[i].sql).then(() => {
                      
                      // })
                    
                  }
                }
              }).then((result) => {
                resolve(resultsComplete);
                console.log("Result", result)
                  this.closeDatabase(db);
              }).catch(error => {
                  console.log(error);
              });
             // resolve(db);
            })
            .catch(error => {
              console.log("Error",error);
            });
        })
        .catch(error => {
          console.log("echoTest failed - plugin not functional");
        });
      })
    });
  }

//   initDB1 = (migrations) => {
//     let db;
//     return new Promise((resolve) => {
//       console.log("Plugin integrity check ...");
//       SQLite.echoTest()
//         .then(() => {
//           console.log("Integrity check passed ...");
//           console.log("Opening database ...");
//           SQLite.openDatabase(
//             database_name,
//             database_version,
//             database_displayname,
//             database_size
//           )
//             .then(DB => {
//               db = DB;
//               var len;
//               console.log("Database OPEN");
//               db.executeSql('SELECT 1 FROM Migrations LIMIT 1').then(() => {
//                 console.log("Database is ready... Executing Queries..")
//                 db.transaction((tx) => {
//                   tx.executeSql('SELECT version FROM Migrations', []).then(([tx,results]) => {
//                     console.log("Query completed");
//                      len = results.rows.length;
                
//                    console.log("Length",len);
//                    console.log("Length Migrations",migrations.length);
//                   });

//                    for(let i = len; i < migrations.length; i++){
                   
//                       console.log("Migration[1]",migrations[i].version + " " + migrations[i].sql);
//                       tx.executeSql('INSERT INTO Migrations (version,migrations) VALUES (?,?)',[migrations[i].version,migrations[i].sql]).then(([tx, results]) => {
//                       console.log("Results",results);
//                       })
                     
                  
//                 }
//                 resolve(results);
                
//                   }).then((result) => {
//                     this.closeDatabase(db);
//                   }).catch((err) => {
//                     console.log(err);
//                   });
                 
//               }).catch((error) => {
//                   console.log("Received error: ", error);
//                   console.log("Database not yet ready ... populating data");
//                   const promiseArray = [];
//                   for(let i = 0; i < migrations.length; i++){
//                     return new Promise((resolve, reject) => {
        
//                     })
//                   }
//                 })
//         })
//         .catch(error => {
//           console.log("echoTest failed - plugin not functional");
//         });
//       })
//     });
//   })
// }
//      getPromise = async ((i) => {
//       return new Promise((resolve, reject) => {
        
//       })
//      })
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

      listProduct() {
        return new Promise((resolve) => {
          const products = [];
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('SELECT p.prodId, p.prodName, p.prodImage FROM Product p', []).then(([tx,results]) => {
                console.log("Query completed");
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  console.log(`Prod ID: ${row.prodId}, Prod Name: ${row.prodName}`)
                  const { prodId, prodName, prodImage } = row;
                  products.push({
                    prodId,
                    prodName,
                    prodImage
                  });
                }
                console.log(products);
                resolve(products);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }

      productById(id) {
        console.log(id);
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('SELECT * FROM Product WHERE prodId = ?', [id]).then(([tx,results]) => {
                console.log(results);
                if(results.rows.length > 0) {
                  let row = results.rows.item(0);
                  resolve(row);
                }
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }
      addMigrationToTable = () => {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
                  console.log("Query completed");
                  var len = results.rows.length;
                  console.log("Length",len);
                  resolve(results);
                    })
                  
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          }); 
      }
      addMigration = (migration) => {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
                    console.log("Migration[1]",migrations.version + " " + migrations.sql);
                    tx.executeSql('INSERT INTO Migrations (version,migrations) VALUES (?,?)',[migrations.version,migrations.sql]).then(([tx, results]) => {
                      resolve(results);
                      console.log("Results",results);
                    })
                  
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }
      updateProduct(id, prod) {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('UPDATE Product SET prodName = ?, prodDesc = ?, prodImage = ?, prodPrice = ? WHERE prodId = ?', [prod.prodName, prod.prodDesc, prod.prodImage, prod.prodPrice, id]).then(([tx, results]) => {
                resolve(results);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }
      deleteProduct(id) {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('DELETE FROM Product WHERE prodId = ?', [id]).then(([tx, results]) => {
                console.log(results);
                resolve(results);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }
      

}