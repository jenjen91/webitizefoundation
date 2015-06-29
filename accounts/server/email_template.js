sitesettings = { sitesettings: function() {
  return Sts.find({});
}
}

Accounts.emailTemplates.siteName = sitesettings.title;
Accounts.emailTemplates.from = sitesettings.title + '<' + sitesettings.email + '>';


// email template for enrollAccount

Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return 'Hei, \n\n' + user.profile.name + '. Velkommen til ' + sitesettings.title + '!';
};
Accounts.emailTemplates.enrollAccount.text = function (user, url) {
   return " Aktiver din konto ved å følg linken nedenfor:\n\n"
     + url;
  };

// email template  for resetPassword
Accounts.emailTemplates.resetPassword.text = function (user, url) {
   return "Hei , \n\n For å bytte passord, følg liken nedenfor: \n"
     + url;
};
