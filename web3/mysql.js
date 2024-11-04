// MySQL veritabanına bağlanma
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Gizem2002!',
  database: 'mydatabase'
});

connection.connect((err) => {
  if (err) {
    console.error('Bağlantı hatası:', err.message);
    return;
  }
  console.log('Veritabanına başarıyla bağlandı.');

  // Employee tablosunu oluşturma
  const createTableQuery = `CREATE TABLE IF NOT EXISTS Employee (
    employeId INT PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    DepartmentName VARCHAR(255)
  )`;

  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error('Tablo oluşturma hatası:', err.message);
      return;
    }
    console.log('Employee tablosu başarıyla oluşturuldu!');

    // Verileri tabloya tek tek ekleme
    const employees = [
      [1, 'Ken', 'Sanchez', 'Executive'],
      [2, 'Terri', 'Duffy', 'Engineering'],
      [3, 'Roberto', 'Tamburello', 'Engineering'],
      [4, 'Rob', 'Walters', 'Engineering'],
      [5, 'Gail', 'Erickson', 'Engineering'],
      [6, 'Jossef', 'Goldberg', 'Engineering'],
      [7, 'Dylan', 'Miller', 'Support'],
      [8, 'Diane', 'Margheim', 'Support'],
      [9, 'Gigi', 'Matthew', 'Support'],
      [10, 'Michael', 'Raheem', 'Support']
    ];

    employees.forEach((employee) => {
      const insertQuery = `INSERT INTO Employee (employeId, FirstName, LastName, DepartmentName)
                           VALUES (?, ?, ?, ?)`;

      connection.query(insertQuery, employee, (err) => {
        if (err) {
          console.error('Veri ekleme hatası:', err.message);
          return;
        }
        console.log('Veri başarıyla eklendi.');
      });
    });

    // DepartmentName'i "Engineering" olan çalışanları listeleme
    const selectEngineeringQuery = `SELECT * FROM Employee WHERE DepartmentName = 'Engineering'`;

    connection.query(selectEngineeringQuery, (err, results) => {
      if (err) {
        console.error('Sorgu hatası:', err.message);
        return;
      }
      console.log('Engineering departmanındaki çalışanlar:');
      results.forEach((employee) => {
        console.log(employee);
      });

      // İsmi "Terri" olan çalışanın DepartmentName’ini "Executive" olarak güncelleme
      const updateDepartmentQuery = `UPDATE Employee SET DepartmentName = 'Executive' WHERE FirstName = 'Terri'`;

      connection.query(updateDepartmentQuery, (err, result) => {
        if (err) {
          console.error('Güncelleme hatası:', err.message);
          return;
        }
        console.log(`Güncelleme başarılı: ${result.affectedRows} satır güncellendi.`);

        // Bağlantıyı kapatma
        connection.end((err) => {
          if (err) {
            console.error('Bağlantı kapama hatası:', err.message);
            return;
          }
          console.log('Veritabanı bağlantısı başarıyla kapatıldı.');
        });
      });
    });
  });
});
