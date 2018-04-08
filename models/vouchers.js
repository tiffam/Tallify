/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = (dbPool) => {
	return {
		saveVoucher: (vouchers, callback) => {
			console.log("saveVoucher in models", vouchers.body);

		// `dbPool` is accessible within this function scope

			const queryString = 'INSERT INTO vouchers (user_id, company_id, value, expiry_date, remarks, voucher_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
			const values = 
			[
			vouchers.cookies.userid,
			vouchers.body.company_id,
			vouchers.body.value,
			vouchers.body.expiry_date,
			vouchers.body.remarks,
			vouchers.body.voucher_type
			];

// execute query
			dbPool.query(queryString, values, (error, queryResult) => {
				console.log("queryResult", queryString);
				if (error) { callback(error); 
				}
				else {
					const queryString2 = `SELECT vouchers.company_id, vouchers.value, vouchers.expiry_date, vouchers.user_id, users.name, company.company_name, company.company_image, company.shop_listing FROM ((vouchers INNER JOIN users ON vouchers.user_id = users.id) INNER JOIN company ON vouchers.company_id = company.id) WHERE vouchers.user_id='${vouchers.cookies.userid}';`;
					dbPool.query(queryString2, (error2, queryResult2) => {
						console.log("queryString2");
						if (error) { callback(error2); 
						}
						else {
				      		// invoke callback function with results after query has executed
				      		callback(error2, queryResult2);
				      		console.log(queryResult2);
				      	};
				      })
				}
			})
		}
	}
}
	     
	  