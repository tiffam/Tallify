var moment = require('moment');

module.exports = (allModels) => {

	/**
 * ===========================================
 * Controller logic
 * ===========================================
 */

	//Get request for new voucher form
	const voucherForm = (request, response) => {
		response.render('newVouchers');
	};

	const saveVoucherFunction = (request, response) => {

		allModels.vouchers.saveVoucher(request, (error2, queryResult2) => {
			if(error2){
				response.end("Error2");
			} else {
				let array = [];
				for(i=0; i<queryResult2.rows.length; i++){
					// console.log("inside savevoucherfunction queryResult2.rows[i].redeemed", queryResult2.rows[i].redeemed);
					queryResult2.rows[i].expiry_date = moment(queryResult2.rows[i].expiry_date).format('DD MMM YY');
					if(queryResult2.rows[i].redeemed==="No"){
						array.push(queryResult2.rows[i]);
					 
					// console.log("queryResult2.rows[i].expiry_date", queryResult2.rows[0].expiry_date);

						let context = {
							array: array,
							message: "added new voucher"
						};
						response.render('main', context);
					}
				}
			}
		})
	}
	

		const usedVoucher = (request, response) => {

		allModels.vouchers.usedVoucher(request, (error2, queryResult2) => {
			if(error2){
				response.end("Error");
			} else {
				let array = [];
				for(i=0; i<queryResult2.rows.length; i++){
					queryResult2.rows[i].expiry_date = moment(queryResult2.rows[i].expiry_date).format('DD MMM YY');
					// console.log("queryResult2.rows[i]", queryResult2.rows[0]);
					if(queryResult2.rows[i].redeemed==="No") {
						array.push(queryResult2.rows[i])};
					

					let context = {
						array: array,
						message: "Updated used voucher"
					};
					response.render('main', context);
				}
			}
		})
	}




/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

 	return {
		voucherForm: voucherForm,
		saveVoucher: saveVoucherFunction,
		usedVoucher: usedVoucher
	}
}



	
