class FollowToggle {
  constructor($el) {
    this.userId = $el.attr("data-user-id");
    this.followState = $el.attr("data-initial-follow-state");
    this.$el = $el;
    this.render();
    this.handleClick();
  }

  render() {
    if (this.followState === "following" || this.followState === "followed") {
      this.$el.prop("disabled", false);
      this.followState = "followed";
      this.$el.html("Unfollow!");
    } else if (this.followState === "unfollowing" || this.followState === "unfollowed") {
      this.$el.prop("disabled", false);
      this.followState = "unfollowed";
      this.$el.html("Follow!");
    }
  }

  handleClick() {
    this.$el.on("click", (e) => {
      e.preventDefault();
      this.$el.prop("disabled", true);
      if (this.followState === "unfollowed") {
        this.followUserRequest();
      } else {
        this.unfollowUserRequest();
      }
    });
  }

  followUserRequest() {
    $.ajax({
      url: `/users/${this.userId}/follow`,
      type: "POST",
      dataType: "json",
      success: () => {
        this.toggleFollowState();
        this.render();
      }
    });
  }

  unfollowUserRequest() {
    $.ajax({
      url: `/users/${this.userId}/follow`,
      type: "DELETE",
      dataType: "json",
      success: () => {
        this.toggleFollowState();
        this.render();
      }
    });
  }

  toggleFollowState() {
    if (this.followState === "unfollowed") {
      this.$el.data("initial-follow-state", "followed");
      this.followState = "following";
    } else {
      this.$el.data("initial-follow-state", "unfollowed");
      this.followState = "unfollowing";
    }
  }
}

module.exports = FollowToggle;
