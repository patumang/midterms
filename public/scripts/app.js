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
    //  prvent default submit behaviour
    event.preventDefault();

    // form input as object
    const data = Object.fromEntries(new FormData(event.target).entries());
    data.event_url = Math.random().toString(20).substr(2, 10);

    $.post("/api/events", data, (res) => {
      $form.trigger("reset");
      changeURL({
          url: `http://localhost:8080/events/${data.event_url}`,
          title: 'Event Details'
      });

      // display handling; ported from a different file; refactor later
      if ($(location).attr("pathname") === "/") {
        $(".app-description").show();
        $(".create-event-container").hide();
        $(".event-details-container").hide();
      } else if ($(location).attr("pathname") === "/events/new") {
        $(".app-description").hide();
        $(".create-event-container").show();
        $(".event-details-container").hide();
      } else {
        $(".app-description").hide();
        $(".create-event-container").hide();
        const path = $(location).attr("pathname").split("/");
        console.log(path);
        if (path[1] !== 'events' || path.length !== 3) {
          $(".event-details-container").html("Invalid Event link!");
        } else {
          getEventData($(location).attr("pathname"));
          $(".event-details-container").show();
        }
      };
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
