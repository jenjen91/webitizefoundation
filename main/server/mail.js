  Meteor.startup(function () {
    // smtp
    var username = 'postmaster@sandbox43fde40a22224c64be34d5d4f2ca6f2f.mailgun.org';
    var password = 'f7aa1d3661173c758fdef9a4260f42ce';
    var host = 'smtp.mailgun.org';
    var port = 25;

    process.env.MAIL_URL = 'smtp://' + username + ':' + password + '@' + host + ':' + port;
    // process.env.MAIL_URL = 'smtp://your_username:your_password@host:port';

    console.log(process.env);
  });
