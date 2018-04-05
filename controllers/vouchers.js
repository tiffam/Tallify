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
				response.end("Error");
			} else {
				let array = [];
				for(i=0; i<queryResult2.rows.length; i++){
					array.push(queryResult2.rows[i]);
				};
				let context = {
					array: array,
					message: "added new voucher",
					message2: "more",
					name: array[0].name
				}
					

					response.render('main', context);
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
		saveVoucher: saveVoucherFunction
	}
}



	
