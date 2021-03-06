/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = (dbPool) => {
	return {
		saveVoucher: (vouchers, callback) => {
			// console.log("saveVoucher in models", vouchers.body);
			// console.log("saveVoucher in models", vouchers.cookies.userid);

		// `dbPool` is accessible within this function scope

			const queryString = 'INSERT INTO vouchers (user_id, company_id, value, expiry_date, remarks, voucher_type, redeemed) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
			const values = 
			[
			vouchers.cookies.userid,
			vouchers.body.company_id,
			vouchers.body.value,
			vouchers.body.expiry_date,
			vouchers.body.remarks,
			vouchers.body.voucher_type,
			"No"
			];

// execute query
			dbPool.query(queryString, values, (error, queryResult) => {
				// console.log("queryResult inside voucher models db query", queryResult);
				// console.log("queryString inside voucher models db query", queryString);
				if (error) { callback(error); 
				}
				else {
					// console.log("vouchers.cookies.userid from vouchers", vouchers.cookies.userid);
					// const queryString2 = `SELECT vouchers.company_id, vouchers.redeemed, vouchers.value, vouchers.expiry_date, vouchers.user_id, users.name, company.company_name, company.company_image, company.shop_listing FROM ((vouchers INNER JOIN users ON vouchers.user_id = users.id) INNER JOIN company ON vouchers.company_id = company.id) WHERE vouchers.user_id='${vouchers.cookies.userid}';`;
					const queryString2 = `SELECT vouchers.company_id, vouchers.value, vouchers.id, vouchers.redeemed, vouchers.voucher_type, vouchers.expiry_date, vouchers.user_id, company.company_name, company.company_image FROM ((vouchers INNER JOIN users ON vouchers.user_id = users.id) INNER JOIN company ON vouchers.company_id = company.id) WHERE vouchers.user_id='${vouchers.cookies.userid}';`;

					dbPool.query(queryString2, (error2, queryResult2) => {
						// console.log("queryString2 inside db query 2 for vouchers model", queryString2);
						// console.log("queryResult2 inside db query 2 for vouchers model", queryResult2);
						if (error2) { callback(error2); 
						}
						else {
				      		// invoke callback function with results after query has executed
				      		callback(error2, queryResult2);
				      		// console.log(queryResult2);
				      	};
				      })
				}
			})
		},

		usedVoucher: (vouchers, callback) => {
			console.log("usedVoucher in models", vouchers.body);
			const queryString = `UPDATE vouchers SET redeemed =$1 WHERE id = $2`;
			const values = ["Yes", Object.keys(vouchers.body)[0]];

			dbPool.query(queryString, values, (error, queryResult) => {
							console.log("queryResult inside usedVoucher", queryResult);
							if (error) { callback(error);}
							else {
								const queryString2 = `SELECT vouchers.company_id, vouchers.value, vouchers.id, vouchers.voucher_type, vouchers.redeemed, vouchers.expiry_date, vouchers.user_id, company.company_name, company.company_image FROM ((vouchers INNER JOIN users ON vouchers.user_id = users.id) INNER JOIN company ON vouchers.company_id = company.id) WHERE vouchers.user_id='${vouchers.cookies.userid}';`;
								dbPool.query(queryString2, (error2, queryResult2) => {
									// console.log("queryString2");
									if (error2) { callback(error2); 
									}
									else {
				      		// invoke callback function with results after query has executed
						      		callback(error2, queryResult2);
						      		// console.log(queryResult2);
						      	}
						      })
							}
						})
		}
	}
}
	     
	  