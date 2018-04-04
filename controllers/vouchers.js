module.exports = (allModels) => {
	//Get request for new voucher form
	const voucherForm = (request, response) => {
		response.render('voucherForm');
	};



/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

 	return {
		voucherForm: voucherForm
	};
};


	
