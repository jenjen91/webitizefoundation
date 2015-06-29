var blockedEmail = '';
var blockedIp = '';


if(Meteor.isClient){
  // Find ip
  $.getJSON("http://ip-api.com/json/?callback=?", function(data) {
    console.log('ip: ' + data.query);
    Session.set("ipAd", data.query);
    return data.query;
  });

  var ipData = [];
  ipData.push(Session.get("ipAd"));
}

  if(Meteor.isServer){
  validate = function (post) {
    var errors = {};
    // check for blocked emails
    var blockedEmail = Lobes.findOne({email: post.from});

    // check if server is able to retrive ip info
    console.log('ipData: ' + ipData);
    var blockedIp = Lobes.findOne({ip:  ipData});

    if (!post.from)
     errors.from = true;

    if (!post.message)
      errors.message =  true;

    if (blockedEmail || blockedIp)
      errors.blocked = true;

       // Debugging
       console.log('post: ' + post);
       console.log('post.to: ' + post.to);
       console.log('post.from: ' + post.from);
       console.log('post.subject: ' + post.subject);
       console.log('post.message: ' + post.message);
       console.log('blockedEmail: ' + blockedEmail);
       console.log('blockedIp: ' + blockedIp);
       console.log('ERRORS: ' + errors);

     return errors;
   }

   Meteor.methods({
     checkContactForm: function (ContactFormAttributs) {

       check(ContactFormAttributs, {
       to: String,
       from: String,
       subject: String,
       message: String,
      });

      // Debugging
       console.log('ContactFormAttributs: ' + ContactFormAttributs);
       console.log('to: ' + ContactFormAttributs.to);
       console.log('from: ' + ContactFormAttributs.from);
       console.log('subject: ' + ContactFormAttributs.subject);
       console.log('message: ' + ContactFormAttributs.message);


       // handle errros
      var errors = validate(ContactFormAttributs);

      // Return error messages
      if (errors.from)
        throw new Meteor.Error('invalid-form', "Vennligst fyll inn din epost");

      if (errors.message)
       throw new Meteor.Error('invalid-form', "Vennligst fyll melding");

      if(errors.blocked)
        throw new Meteor.Error('blocked', "Denne epost- eller ip-addressen er blokkert");

      var submission = _.extend(ContactFormAttributs, {
         sendtAt: new Date()
      });

      // Debugging
      console.log('ERRORS: ' + errors);
      console.log('Error.from : ' + errors.from);
      console.log('Error.subject : ' + errors.subject);
      console.log('Error.message : ' + errors.message);
      console.log('Error.blocked : ' + errors.blocked);


      // insert contact form
      var contactSubId = ContactSubmissions.insert(submission);

      this.unblock();

      // send the form
      Email.send({
       to: ContactFormAttributs.to,
       from: ContactFormAttributs.from,
       subject: ContactFormAttributs.subject,
       text: ContactFormAttributs.message
      });

      return {   _id: contactSubId };


    } // End checkContactForm function



  }); // End meteor.methods
  }
