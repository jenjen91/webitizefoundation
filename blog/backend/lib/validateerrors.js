validatePost = function (post) {
  var errors = {};

  // 1. Check if title is filled inn
  if (!post.post_title)
   errors.post_title = 'Fyll inn tittel';

  // 2. Chekc if url is filled inn
  if (!post.post_url)
   errors.post_url = 'Fyll inn url';

  // 3. Check if url contains illagal characters
  var chechforillagchars = post.post_url.search(/[^A-Za-z0-9_]/g);
  if (chechforillagchars != -1)
    errors.post_url = 'URL addressen inneholder ulovelig karakterer';

  // 4. chekc if content is filled inn
  if (!post.post_text)
    errors.post_text =  'Fyll inn blogg text';

  // 5. Check if featured is selected
  if (!post.post_featured)
    errors.post_featured =  'Velg om innlegg skal vises på forside';


     // Debugging
     console.log('valiadateerrors.js - post: ' + post);
     console.log('valiadateerrors.js -post.post_title: ' + post.post_title);
     console.log('valiadateerrors.js - post.post_url: ' + post.post_url);
     console.log('valiadateerrors.js - post.post_text: ' + post.post_text);
     console.log('valiadateerrors.js - ERRORS: ' + errors);

  return errors;
 };
validatePost2 = function (post) {
  var errors = {};

  if (!post.post_title)
   errors.post_title = 'Fyll inn tittel';

   var chechforillagchars = post.post_url.search(/\[^A-Za-z0-9_]/g);
  if (chechforillagchars > 0)
    errors.post_url = 'URL addressen inneholder ulovelig karakterer';

  if (!post.post_url)
   errors.post_url = 'Fyll inn url';

  var postWithSameLink = Posts.findOne({post_url: post.post_url}).post_url;
  var currenturl = post.currenturl;

  if (postWithSameLink && currenturl != postWithSameLink) {
    errors.post_url = 'Det finnes allerede et innlegg med denne URL-addressen';
  }
  if (!post.post_text)
    errors.post_text =  'Fyll inn';

  if (!post.post_featured)
    errors.post_featured =  'Velg om innlegg skal vises på forside';


     // Debugging
     console.log('post: ' + post);
     console.log('post.post_title: ' + post.post_title);
     console.log('post.post_text: ' + post.post_text);
     console.log('ERRORS: ' + errors);

   return errors;
 };
 validateImageUpload = function(image) {
   var errors = {};
   var chechforillagchars = image.search(/\[^A-Za-z0-9_]/g);


    if(! Meteor.userId) {
      errors.nouser = 'Not authorized. Ikke logget inn'
    } else if (chechforillagchars != -1) {
        errors.illigal = 'Bilde-addressen inneholder ulovelig karakterer';
    }
  return errors;
 }
