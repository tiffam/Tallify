module.exports = (allModels) => {

/**
 * ===========================================
 * Controller logic
 * ===========================================
 */

 //Get request for new registration form
const newForm = (request, response) => {
  response.render('new');
};

//Post request for new user creation

const createFunction =  (request, response) => {
		console.log("request.body", request.body);
		allModels.users.create(request.body, (error, queryResult) => {
      // if (error) {
      //   response.end('Please try again');
      // } else {
      //   if (queryResult.duplicate == true) {
      //     response.send("The email has already been registered.");
      //   } else {
      //     response.cookie('loggedin', true);
      //     // response.cookie('userid', queryResult.user_id);
      		console.log(queryResult);
      		response.redirect('/');
      	});
}

//Get request for login form
const login = (request, response) => {
  response.render('login');
};



//Get homepage after logging in
// const welcome = (request, response) => {
// 	//add cookie after logging in successfully
//   response.cookie('registered_user', 'true')
// }

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
	return {
	  newForm : newForm,
	  create : createFunction
	  // logout,
	  // loginForm,
	  // login
	};

}