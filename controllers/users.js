var moment = require('moment');

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
        console.log(queryResult);
        response.cookie('userid', queryResult.rows[0].id);
        console.log(queryResult);
        let context = {
          message: "Welcome!"}

        response.render('main', context);
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
  allModels.users.logon(request.body, (error2, queryResult2) => {
    // console.log("inside allmodels in queryResult", queryResult);
    if (queryResult.authenticated == false) {
      console.log(queryResult.authenticated);
      response.redirect('new');}
      else {
        response.cookie('loggedIn', true);
        response.cookie('userid', queryResult2.queryResult[0].user_id);
        let array = [];
        for(let i=0; i<queryResult2.queryResult.length; i++){
          if(queryResult2.queryResult[i].redeemed==="No")
          {queryResult2.queryResult[i].expiry_date = moment(queryResult2.queryResult[i].expiry_date).format('DD MMM YY');
          array.push(queryResult2.queryResult[i]);
        };
      }
        

        let context = {
          name: queryResult2.user_name,
          array: array,
          message: "Welcome Back!",
        };

        response.render('main', context);
      }
    })
};

const logout = (request, response) => {
  console.log("inside logout");
  response.clearCookie('loggedIn');
  response.clearCookie('userid');
  response.render('logout');
}


/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
	return {
	  newForm : newForm,
	  create : createFunction,
	  logout: logout,
	  // loginForm,
    logon: logon,
	  loginForm: loginForm
	};

}