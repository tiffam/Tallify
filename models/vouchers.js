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
	        	const queryString = 'INSERT INTO vouchers (company_id, value, expiry_date, remarks) VALUES ($1, $2, $3, $4) RETURNING id';
	        	const values = 
	        	[
	        	vouchers.company_id,
	        	vouchers.value,
			    vouchers.expiry_date,
			    vouchers.remarks
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