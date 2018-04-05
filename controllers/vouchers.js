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
		console.log("request.cookies.userid", request.cookies.userid);
		allModels.vouchers.saveVoucher(request, (error, queryResult) => {
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



	
