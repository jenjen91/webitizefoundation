Template.postSettings.events({
  "click #delete-post": function(event){
    event.preventDefault();

   // retrieve the input field values
    var postData = {
      owner: this.owner,
      _id: this._id
      }

      // Comfirm
      if (confirm("Er du sikker på at du vil slette dette innlegget?")){
        callbackMessage = {};

        Meteor.call("deletepost", postData, function(error, result){
          if (error)
            callbackMessage.reason = error.reason;
            return Session.set('callbackMessage', callbackMessage);

          console.log('result: ' + result);
          if (result)
            callbackMessage.success = this.post_title + ' har blitt slettet'
            return Session.set('callbackMessage', callbackMessage);

        });
      } else {
        return 'Not deleted'
      }

  }
});
