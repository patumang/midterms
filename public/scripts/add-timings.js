/* eslint-disable no-undef */
$(() => {
  const timingsLimit = 5;
  let timingsCounter = 0;


  $("#add_timings").click(function() {
    //destroy datepicker so it can select newly created time_slot_date box
    $(".time-slot-date").datepicker("destroy");

    if (timingsCounter >= 5) {
      //fadeOut bug: because of dynamically created element, fadeOut only binds to first instance of error msg
      //fadeOut bug: error msg re-appears after fadeOut animation completes
      $(".timings_error").html(`You exceeded limit of ${timingsLimit}`).fadeOut(2500);

      //initialize datepicker
      datePicker();

      return;
    }

    // $(".timings_error").html()



    const $createTimeSlot = $("<div>").addClass("form-row mt-2 time-slot").attr("id", `time-slot-${timingsCounter + 1}`);
    const $timeSlotDate = $("<input>").attr({
      name: "time_slot_date",
      class: "col-md-6 time-slot-date",
      placeholder: "Date",
      autocomplete: "off"
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

    // initialize datepicker
    datePicker();

    //shows remove_timings btn
    $("#remove_timings").removeAttr("hidden");

  });

  $("#remove_timings").on("click", function() {

    $(`#time-slot-${timingsCounter}`).remove();
    timingsCounter--;

    //empty timing error message
    if (timingsCounter < 5) {
      $(".timings_error").empty();
    }

  });

});

const datePicker = () => {
  $(".time-slot-date").datepicker({
    showAnim: "fadeIn",
    dateFormat: "yy-mm-dd",
    minDate: 0,
    showOtherMonths: true,
    selectOtherMonths: true
  });
};

