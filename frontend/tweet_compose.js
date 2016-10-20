class TweetCompose {
  constructor($el) {
    this.$el = $el;
    this.charsLeft();
    this.addMentionedUser();
    this.submit();
  }

  submit() {
    this.$el.on("submit", (e) => {
      e.preventDefault();
      let formData = $(e.currentTarget).serializeJSON();
      $(":input").prop("disabled", true);
      $.ajax ({
        url: "tweets",
        type: "POST",
        data: formData,
        dataType: "json",
        success: (tweet) => {
          this.handleSuccess(tweet);
        }
      });
    });
  }

  handleSuccess(tweet) {
    this.clearInput();
    $(":input").prop("disabled", false);
    let tweetText = JSON.stringify(tweet);
    let $li = $(`<li>${tweetText}</li>`);
    $("#feed").prepend($li);
  }

  clearInput() {
    $("textarea").val("");
  }

  charsLeft() {
    $("textarea").on("input", (e) => {
      let content = $("textarea").val();
      let length = content.length;
      $("strong").html(`${140 - length} characters left`);
    });
  }

  addMentionedUser () {
    $(".add-mentioned-user").on("click", () => {
      $(".mentioned-users").append($($(".mentions-script").html()));
    });
  }

  removeMentionedUser() {
    $("remove-mentioned-user").on("click", () => {

    });
  }
}

module.exports = TweetCompose;
