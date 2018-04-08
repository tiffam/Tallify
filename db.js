const pg = require('pg');

const users = require('./models/users');
const company = require('./models/company');
const vouchers = require('./models/vouchers');

const url = require ('url');

if( process.env.DATABASE_URL ){
	const params = url.parse(process.env.DATABASE_URL);
  	const auth = params.auth.split(':');

  //make the configs object
  var configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };

  } 
  else {
  	const configs = {
	  user: 'smu',
	  host: '127.0.0.1',
	  database: 'Tallify',
	  port: 5432
	};
}


const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

module.exports = {
  pool: pool,
  users: users(pool),
  vouchers: vouchers(pool)
  // company: company(pool)
};


