validatePost = function (post) {
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
 }
