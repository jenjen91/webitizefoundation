Meteor.methods({
  getimages: function(){
    var fs = Npm.require('fs');
    var imageArray = [];
    var test = ['ei', 'aa', 'bbb'];

    fs.readdir('C:\\webapplications\\webitizefoundation\\public\\images', function (err, files) {
      if (err) {
        throw new Meteor.Error('readerror', 'Could not read from image folder')
      } else {
        console.log('files constructor: ' + files.constructor);
        console.log('files: ' + files);
        imageArray.push('files');
      }
    });
      return imageArray;
  },
  imageUpload: function(image){
    if (!Meteor.user())
      throw new Meteor.Error(999, "Du har ikke tilatelse til å slette dette innlegget");

    console.log('imageUpload.js: ' + image)
    var fs = Npm.require('fs');
    fs.readFile(image, function (err, data) {
      if (err) {throw err};
      console.log(data);
      fs.writeFile('C:\\webapplications\\webitizefoundation\\public\\images\\' + image, data, function(err){
        if (err) {
        console.log(err);
        throw err;
        }
        console.log('File saved.')
      });
      });



      return 'upload';

  }
});
