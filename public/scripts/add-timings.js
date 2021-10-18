/* eslint-disable no-undef */
$(() => {
  const timingsLimit = 5;
  let timingsCounter = 0;

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
});
