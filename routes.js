

module.exports = (app, allModels) => {
  const usersControllerFunction = require('./controllers/users');
  const users = usersControllerFunction(allModels);

  //const users = require('./controllers/users')(allModels);
  // const vouchersControllerFunction = require('./controllers/vouchers');
  // const vouchers = vouchersControllerFunction(allModels);
  // const companyControllersFunction = require('./controllers/company');
  // const company = companyControllersFunction(allModels);
  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
    app.get('/users/new', users.newForm);
    // app.get('/users/login', users.login);
    
    app.post('/users/create', users.create);

      /*
   *  =========================================
   *  Vouchers
   *  =========================================
   */
  // CRUD vouchers

};