Template.updatepost.onRendered(function () {
  var purl = Router.current().params.post_url;
  var featuredValue = Posts.findOne({post_url: purl}).post_featured;

  var leng =   document.getElementsByClassName('radio').length;

  var i = 0;
  while(i < leng) {
    console.log(document.getElementsByClassName('radio')[i].value)
    var ddf =   document.getElementsByClassName('radio')[i].value

    if (ddf == featuredValue)
      document.getElementsByClassName('radio')[i].checked = true;
    i++
  }
  console.log(featuredValue);
});
