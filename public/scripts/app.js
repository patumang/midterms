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

    const $timeSlotDiv = $(".timings_container").children("#time-slot-1");
    const $timeSlotInput = $timeSlotDiv.children(".hasDatepicker");

    // checks if there is a value in the first time_slot_date input
    if ($timeSlotInput.val()) {

      const data = Object.fromEntries(new FormData(event.target).entries());
      // generate random string as url;
      data.event_url = Math.random().toString(20).substr(2, 10);

      const serializedData = $(this).serialize();
      $.post("/api/events", serializedData, (res) => {
        $form.trigger("reset");

        // refresh page after request
        window.location.replace(`/events/${res}`);
        })
        .catch((err) => {
          console.log(err);
        });

    }

    // return error message if no date is chosen
    console.log("Not there");

    // form input as object;

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
