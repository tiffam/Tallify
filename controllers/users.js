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
    if (error) {
      response.end('Please try again');
    } else {
      if (queryResult.duplicate == true) {
        console.log(queryResult);
        response.send("The email has already been registered.");
      } else {
        response.cookie('loggedin', true);
          response.cookie('userid', queryResult.user_id);
          console.log(queryResult);
          response.redirect('/');
        };
      }
    });
};

//Get request for login form
const loginForm = (request, response) => {
  response.render('login');
};

//Post request for submitting completed login form
const logon = (request, response) => {
    allModels.users.logon(request.body, (error, queryResult) => {
      console.log("inside allmodels in request.body", request.body);
      if (queryResult.authenticated == false) {
        response.redirect('new');}
        else {
        response.cookie('loggedIn', true);
        response.cookie('userid', queryResult.user_id);
        let context = {
          name: queryResult.user_name
        };
        response.render('main', context);
      }
    })
  };


// const logged_on = (request, response) => {
//   response.render('main');
// };



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
	  create : createFunction,
	  // logout,
	  // loginForm,
    logon: logon,
	  loginForm: loginForm
	};

}