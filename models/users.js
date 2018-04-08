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
	        	const queryString = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id';
	        	const values = 
	        	[
                  users.name,
                  users.email,
                  hashed
			];

// execute query
	      		dbPool.query(queryString, values, (error, queryResult) => {
	      			// invoke callback function with results after query has executed
                              console.log("queryResult from models users", queryResult);
	      			callback(error, queryResult);
	      		});
	      	});
      	},

      	logon: (users, callback) => {
                  const queryStringCheck = `SELECT * FROM vouchers WHERE email='${users.email}'`;
                  const queryString = `SELECT vouchers.company_id, vouchers.id, vouchers.redeemed, vouchers.value, vouchers.expiry_date, vouchers.user_id, users.name, company.company_name, users.password, company.company_image, company.shop_listing FROM ((vouchers INNER JOIN users ON vouchers.user_id = users.id) INNER JOIN company ON vouchers.company_id = company.id) WHERE email='${users.email}'`;

      		dbPool.query(queryStringCheck, (errorCheck, queryResultCheck) => {
                        console.log("dbPool.query queryStringCheck", queryResultCheck);
                        if(errorCheck){console.log("error in dbpool query", error)};
      			if(queryResultCheck.rowCount ===0 ){
      				callback(errorCheck, {authenticated: false});
      			}
      			else {
                              dbPool.query(queryString, (error, queryResult) => {
      				bcrypt.compare(users.password, queryResult.rows[0].password, (err, res) => {
                                          callback(err, {authenticated: res, user_id: queryResult.rows[0].user_id, user_name: queryResult.rows[0].name, queryResult: queryResult.rows});
                                    })
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



      /*logon: (users, vouchers, callback) => {
                  const queryString2 = "SELECT vouchers.company_id, vouchers.value, vouchers.expiry_date, users.name, users.id users.email FROM vouchers INNER JOIN users ON vouchers.user_id = users.id WHERE email= '${users.email}'`;"
                  const queryString = `SELECT * FROM users WHERE email= '${users.email}'`;

                  dbPool.query(queryString, (error, queryResult) => {
                        if(queryResult.rowCount ===0 ){
                              callback(error, {authenticated: false});
                        }
                        else {
                              bcrypt.compare(users.password, queryResult.rows[0].password, (err, res) => {
                                    const queryString2 = "SELECT vouchers.company_id, vouchers.value, vouchers.expiry_date, users.name, users.id users.email FROM vouchers INNER JOIN users ON vouchers.user_id = users.id WHERE email= '${users.email}'`;"
                                    dbPool.query(queryString2, (error2, queryResult2) => {
                                          callback(err, {authenticated: res, user_id: queryResult.rows[0].id, user_name: queryResult.rows[0].name, company: queryResult2.rows[0].company_id});
                                    })
                              })
                        }
                  })
            }*/
 




 