const pg = require('pg');
const user = require('./models/users');
const company = require('./models/company');
const voucher = require('./models/vouchers');

const configs = {
  user: 'smu',
  host: '127.0.0.1',
  database: 'Tallify',
  port: 5432
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

module.exports = {
  pool: pool,
  users: users(pool),
  vouchers: vouchers(pool),
  company: company(pool)
};


