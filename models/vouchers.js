/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */


module.exports = (dbPool) => {
	return {
		// `dbPool` is accessible within this function scope
		saveVoucher: (vouchers, callback) => {
	
	        	console.log("saveVoucher in models");
	        	const queryString = 'INSERT INTO vouchers (user_id, company_id, value, expiry_date, remarks) VALUES ($1, $2, $3, $4, $5) RETURNING id';
	        	const values = 
	        	[
	        	vouchers.cookies.userid,
	        	vouchers.body.company_id,
	        	vouchers.body.value,
			    vouchers.body.expiry_date,
			    vouchers.body.remarks
			    ];

// execute query
	      		dbPool.query(queryString, values, (error, queryResult) => {
	      			if (error) console.error('error!', error);
	      			console.log(queryResult);// invoke callback function with results after query has executed
	      			callback(error, queryResult);
	      		});
	      	}
      	}
    } 