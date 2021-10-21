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


    const $timeSlotInput = $(".timings_container").find(".hasDatepicker");

    // checks if there is a value in the first time_slot_date input
    if ($timeSlotInput.val()) {

      const data = Object.fromEntries(new FormData(event.target).entries());
      console.log(data);

      const serializedData = $(this).serialize();
      $.post("/api/events", serializedData, (url) => {

        $form.trigger("reset");
        // send url to /email
        if (data.event_link_for_self) {
          $.post('/email', url);
        }
        // refresh page after request
        window.location.replace(`/events/${url}`);
        })
        .catch((err) => {
          console.log(err);
        });



      return;
    }

    // return error message if no date is chosen
    $(".timing-error").show().html("At least 1 date is required").fadeOut(2500);

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
