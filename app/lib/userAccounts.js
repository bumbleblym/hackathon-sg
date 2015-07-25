AccountsTemplates.configure({
  // Behavior
  enablePasswordChange: true,

  // Appearance
  showForgotPasswordLink: true
});

_.each([
  'changePwd',
  'forgotPwd',
  'resetPwd',
  'signIn',
  'signUp',
  'verifyEmail',
  'resendVerificationEmail'
], function(routeCode) {
  AccountsTemplates.configureRoute(routeCode);
});
