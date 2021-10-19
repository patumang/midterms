/* eslint-disable no-undef */
// Client facing scripts here

const changeURL = (next) => {
  const nextState = { additionalInformation: 'Updated the URL with JS' };
  // This will create a new entry in the browser's history, without reloading
  window.history.pushState(nextState, next.title, next.url);

  // This will replace the current entry in the browser's history, without reloading
  window.history.replaceState(nextState, next.title, next.url);
};

$(() => {
  $(".link-copied").hide();
  //shows create event container
  $("#toggle-create-event-container").click(function() {
    $(".event-details-container").hide();
    $(".app-description").hide();
    changeURL({
      url: 'http://localhost:8080/events/new',
      title: 'Create New Event'
    });
    $(".create-event-container").show();
  });
  //shows app description
  $("#how-to-btn").on("click", function() {
    $(".event-details-container").hide();
    $(".create-event-container").hide();
    $(".app-description").show();
  });

  //create form event listener for submit
  const $form = $("#create-event-form");
  $form.on("submit", function(event) {
    //prvent default submit behaviour
    event.preventDefault();

    const serializedData = $(this).serialize();
    $.post("/api/events", serializedData)
      .then((res) => {
        $form.trigger("reset");
        changeURL({
          url: 'http://localhost:8080/unique_id',
          title: 'Event Details'
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    //serialize data to make querystring
    // const serializedData = $(this).serialize();
    // console.log('serializedData',serializedData);
    // $.post("/events", serializedData)
    //   .then((res) => {
    //     changeURL({
    //       url: 'http://localhost:8080/unique_id',
    //       title: 'Event Details'
    //     });
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

  });

  $(".btn-clipboard").click(function() {
    $(".link-copied").show().fadeOut(2500);

    const value = $(".lbl-unique-link").html();

    const $temp = $("<input>");
    $("body").append($temp);
    $temp.val(value).select();
    document.execCommand("copy");
    $temp.remove();
  });

});
