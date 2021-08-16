const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
}

async function connect(){
  if(global.connection && global.connection.state !== 'disconnected')
      return global.connection;

  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection(config);
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return connection;
}

exports.findAll = async function () {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM people");
  return rows;
}

exports.create = async function (name) {
  const conn = await connect();
  await conn.query("INSERT INTO people (name) VALUES (?)", [name]);
}