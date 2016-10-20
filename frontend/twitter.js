const FollowToggle = require("./follow_toggle");
const UsersSearch = require("./users_search");
const TweetCompose = require("./tweet_compose");

$( () => {
  $('.follow-toggle').each(function(index, button) {
    new FollowToggle($(button));
  });

  $('.users-search').each(function(index, textBox) {
    new UsersSearch($(textBox));
  });

  $('.tweet-compose').each(function(index, button) {
    new TweetCompose($(button));
  });
});
