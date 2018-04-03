const bcrypt = require('bcrypt');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = (dbPool) => {
	return {

// `dbPool` is accessible within this function scope
  		create: (users, callback) => {

// run user input password through bcrypt to obtain hashed password
      		bcrypt.hash(users.password, 1, (err, hashed) => {
      			if (err) console.error('error!', err);

// set up query
	        	const queryString = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
		        const values = [
			        users.name,
			        users.email,
			        hashed
		        ];

// execute query
	      		dbPool.query(queryString, values, (error, queryResult) => {
// invoke callback function with results after query has executed
	      			callback(error, queryResult);
	      		});
	      	});
      	}
      }
  };


 // module.exports = (dbPool) => {
 // 	return {
 // 		create: (user, callback) => {
 // 			const checkDuplicate = `SELECT * FROM users WHERE email = '${users.email}';`
 // 			dbPool.query(checkDuplicate, (err, results) => {
 // 				if (results.rowCount > 0) {
 // 					callback(err, { duplicate: true });
 // 				} else {
 // 					bcrypt.hash(user.password, 1, (err2, hash) => {
 // 						const queryString = `INSERT INTO users (name, email, password) VALUES ('${users.name}', '${users.email}', '${hash}') RETURNING id;`;
 // 						dbPool.query(queryString, (err3, results3) => {
 // 							callback(err3, { duplicate: false,
 // 								user_id: results3.rows[0].id
 // 							});
 // 						})
 // 					})
 // 				}
 // 			})
 // 		}
 // 	}
 // }