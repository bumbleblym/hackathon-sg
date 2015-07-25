AccountsTemplates.configure({
  // Behavior
  enablePasswordChange: true,

  // Appearance
  showForgotPasswordLink: true
});

_.each([
  'changePwd',
  'enrollAccount',
  'forgotPwd',
  'resetPwd',
  'signIn',
  'signUp',
  'verifyEmail',
  'resendVerificationEmail'
], function(routeCode) {
  AccountsTemplates.configureRoute(routeCode);
});
