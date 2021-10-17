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

  const timingsLimit = 5;
  let timingsCounter = 0;

  if ($(location).attr("pathname") === "/") {
    $(".create-event-container").hide();
    $(".event-details-container").hide();
  } else if ($(location).attr("pathname") === "/events/new") {
    $(".create-event-container").show();
    $(".event-details-container").hide();
  } else {
    $(".create-event-container").hide();
    $(".event-details-container").show();
  }

  $("#toggle-create-event-container").click(function() {
    $(".event-details-container").hide();
    changeURL({
      url: 'http://localhost:8080/events/new',
      title: 'Create New Event'
    });
    $(".create-event-container").show();
  });

  $("#add_timings").click(function() {

    if (timingsCounter >= 5) {
      $(".timings_error").html(`You exceeded limit of ${timingsLimit}`);
      return;
    }
    $(".timings_error").html();

    const $createTimeSlot = $("<div>").addClass("form-row mt-2 time-slot");
    const $timeSlotDate = $("<input>").attr({
      name: "time_slot_date",
      class: "col-md-6 time-slot-date",
      placeholder: "Date"
    });
    const $timeSlotStartTime = $("<input>").attr({
      name: "time_slot_start_time",
      class: " col-md-3 time-slot-start-time",
      placeholder: "Start Time"
    });
    const $timeSlotEndTime = $("<input>").attr({
      name: "time_slot_end_time",
      class: "col-md-3 time-slot-end-time",
      placeholder: "End Time"
    });

    $createTimeSlot.append($timeSlotDate, $timeSlotStartTime, $timeSlotEndTime);
    $(".timings_container").append($createTimeSlot);
    timingsCounter++;
  });


  //create form event listener for submit
  const $form = $("#create-event-form");
  $form.on("submit", function(event) {
    //prvent default submit behaviour
    event.preventDefault();

    const serializedData = $(this).serialize();
    $.post("/api/events", serializedData)
      .then((res) => {
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

});
