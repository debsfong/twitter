const FollowToggle = require("./follow_toggle");

class UsersSearch {
  constructor($el) {
    this.$el = $el;
    this.$input = $("nav.users-search > input");
    this.$ul = $("nav.users-search > ul");
    this.handleInput();
  }

  handleInput () {
    this.$input.on("input", (e) => {
      var formData = $(e.currentTarget).serialize();
      $.ajax ({
        url: "/users/search",
        type: "GET",
        dataType: "json",
        data: formData,
        success: (response) => {
          console.log(response);
          this.renderResults(response);
        }
      });
    });
  }

  renderResults (results) {
    this.$ul.empty();
    results.forEach(result => {
      let userId = result.id;
      let followState = "";
      if (result.followed) {
        followState = "followed";
      } else {
        followState = "unfollowed";
      }
      let $button = $(`<button type='button' class='follow-toggle' data-user-id='${userId}' data-initial-follow-state='${followState}'></button>`);
      new FollowToggle($button);
      let $li = $(`<li><a href='${userId}'>${result.username}</a></li>`);
      $li.append($button);
      this.$ul.append($li);
    });
  }
}

module.exports = UsersSearch;
