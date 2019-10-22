import React, { Component } from 'react'
import { ActivityIndicator, View, StyleSheet, AppState } from 'react-native'
import ProductScreen from './ProductScreen';
import MigrationDataBase from '../database/MigrationDatabase';
import Migration from '../database/Migration'
import Migrator from '../database/Migrator'
import SQLite from "react-native-sqlite-storage";
import Database from '../database/Database';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Reactoffline.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;
const db = new MigrationDataBase();


const makeTable = ` CREATE TABLE IF NOT EXISTS user(
                     user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                      name TEXT,
                      phone TEXT
                    );
                    `;

const alterTable = `ALTER TABLE user ADD COLUMN another_field TEXT`;

const alterTable1 = `ALTER TABLE user ADD COLUMN another_field1 TEXT`;
const alterTable2 = `ALTER TABLE user ADD COLUMN another_field2 TEXT`;
const alterTable3 = `ALTER TABLE user ADD COLUMN another_field3 TEXT`;
const alterTable4 = `ALTER TABLE user ADD COLUMN another_field4 TEXT`;
const migrations = [
     new Migration(1, makeTable),
     new Migration(2,alterTable),
     new Migration(3,alterTable1),
     new Migration(4,alterTable2),
     new Migration(5,alterTable3),
     new Migration(6,alterTable4),
      

];




export default class MigrationScreen extends Component {
    constructor() {
        super();       
     //  this.initDB();
       //this.migrationCheck();
      db.initDB(migrations);
        
      }

  // initDB = () => {
  //   let db;
  //   return new Promise((resolve) => {
  //     console.log("Plugin integrity check ...");
  //     SQLite.echoTest()
  //       .then(() => {
  //         console.log("Integrity check passed ...");
  //         console.log("Opening database ...");
  //         SQLite.openDatabase(
  //           database_name,
  //           database_version,
  //           database_displayname,
  //           database_size
  //         )
  //           .then(DB => {
  //             db = DB;
  //             const migrator = new Migrator(DB,database_version);
  //             migrator.up(migrations[0])
  //             migrator.up(migrations[1])
  //             migrator.migrate();

  //             resolve(db);
  //           })
  //           .catch(error => {
  //             console.log(error);
  //           });
  //       })
  //       .catch(error => {
  //         console.log("echoTest failed - plugin not functional");
  //       });
  //     });
  //   };


    //   migrationCheck = () =>{
    
    //     setTimeout(() => 
    //     {
    //        // alert("Hello");
    //         this.props.navigation.navigate('Product'); 
    //     }, 3000);
    //  //   this.props.navigation.navigate(ProductScreen);
    //   };
    render() {
        return (
            <View style={styles.container}>
                    
                    
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
