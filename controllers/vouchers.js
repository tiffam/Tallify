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
		allModels.vouchers.saveVoucher(request.body, (error, queryResult) => {
		console.log('TEST below', queryResult);
					response.render('main', {vouchers: ["test voucher1", "test voucher2"], message: ["Added new voucher."], message2: ["more"]});
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
	}
}



	
