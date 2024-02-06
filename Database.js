import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = 'MyDatabase.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;

export const initDB = () => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase({
      name: database_name,
      version: database_version,
      displayName: database_displayname,
      size: database_size,
    })
      .then(DB => {
        DB.transaction(
          tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS Roles (' +
                'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                'role TEXT UNIQUE);',
            );
            tx.executeSql(
              'INSERT OR IGNORE INTO Roles (role) VALUES ("Admin"), ("Editor"), ("User");',
            );
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS Users (' +
                'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                'role_id INTEGER, ' +
                'email TEXT UNIQUE, ' +
                'password TEXT, ' +
                'FOREIGN KEY (role_id) REFERENCES Roles(id));',
            );
            tx.executeSql(
              'SELECT id FROM Roles WHERE role = "Admin";',
              [],
              (_, {rows}) => {
                if (rows.length > 0) {
                  const adminRoleId = rows.item(0).id;
                  tx.executeSql(
                    'INSERT OR IGNORE INTO Users (role_id, email, password) VALUES (?, ?, ?);',
                    [adminRoleId, 'admin', '123'],
                  );
                }
              },
            );
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS Choices (' +
                'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                'user_ID INTEGER, ' +
                'choiceA TEXT, ' +
                'choiceB TEXT, ' +
                'FOREIGN KEY (user_ID) REFERENCES Users(id));',
            );
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS Votes (' +
                'Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
                'user_ID INTEGER, ' +
                'choices_ID INTEGER, ' +
                'selected_choice TEXT, ' +
                'FOREIGN KEY (user_ID) REFERENCES Users(id), ' +
                'FOREIGN KEY (choices_ID) REFERENCES Choices(id));',
            );
          },
          error => {
            console.error('Transaction Error: ', error);
            reject(error);
          },
          () => {
            console.log('All tables created successfully');
            resolve(DB);
          },
        );
      })
      .catch(error => {
        console.error('Error opening database', error);
        reject(error);
      });
  });
};

export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    initDB().then(db => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Users WHERE email = ? AND password = ?;',
          [email, password],
          (_, {rows}) => {
            if (rows.length > 0) {
              let user = rows.item(0);
              resolve(user);
            } else {
              reject('No matching user found');
            }
          },
          (txObj, error) => {
            reject(error);
          },
        );
      });
    });
  });
};

export const addChoice = (choiceA, choiceB) => {
  return new Promise((resolve, reject) => {
    initDB()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO Choices (choiceA, choiceB) VALUES (?, ?);',
            [choiceA, choiceB],
            (_, resultSet) => {
              // Kayıt başarılı olduğunda çağrılan callback
              resolve(resultSet);
            },
            (_, error) => {
              // Kayıt sırasında bir hata oluştuğunda çağrılan callback
              reject(error);
            },
          );
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};

// Database.js içinde
// Diğer fonksiyonlarınızın altına bu fonksiyonu ekleyin

export const getRandomChoice = () => {
  return new Promise((resolve, reject) => {
    initDB().then(db => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Choices ORDER BY RANDOM() LIMIT 1;',
          [],
          (_, {rows}) => {
            if (rows.length > 0) {
              resolve(rows.item(0)); // Rastgele seçilen tercihi döndür
            } else {
              reject('No choices found');
            }
          },
          (_, error) => {
            reject(error); // Hata durumunda hata mesajı döndür
          },
        );
      });
    });
  });
};

export default {
  initDB,
  loginUser,
  addChoice,
  getRandomChoice,
};
