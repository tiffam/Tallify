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
	        	const values = 
	        	[
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
      	},

      	logon: (users, callback) => {
      		const queryString = `SELECT * FROM users WHERE email= '${users.email}'`;

      		dbPool.query(queryString, (error, queryResult) => {
      			if(queryResult.rowCount ===0 ){
      				callback(error, {authenticated: false});
      			}
      			else {
      				bcrypt.compare(users.password, queryResult.rows[0].password, (err, res) => {
      					callback(err, {authenticated: res, user_id: queryResult.rows[0].id});
      				})
      			}
      		})
      	}
    }
}


      			//if( res === true ){
				//   console.log("same");
				// }else{
				//   console.log("not same");
				// }
				// invoke callback function with results after query has executed

      				
      			
      		
      	
      
  // }
     

      	// logged_on: (users, callback) => {
      	// 	const queryString = `SELECT * FROM users WHERE email='${users.email}'`;
      	// 	var welcome_name = queryResult.rows[0].name;
      	// }



      
 




 