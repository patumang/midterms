/* eslint-disable no-undef */
$(() => {
  const timingsLimit = 5;
  let timingsCounter = 0;



  $("#add_timings").click(function() {
    //destroy datepicker so it can select newly created time_slot_date box
    $(".time-slot-date").datepicker("destroy");

    if (timingsCounter >= 5) {
      $(".timings_error").html(`You exceeded limit of ${timingsLimit}`);
      //initialize datepicker
      $(".time-slot-date").datepicker({
        showAnim: "fadeIn",
        dateFormat: "yy-mm-dd"
      });
      return;
    }
    $(".timings_error").html();

    const $createTimeSlot = $("<div>").addClass("form-row mt-2 time-slot").attr("id", `${timingsCounter + 1}`);
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
    console.log("add- timingscounter:", timingsCounter)

    // initialize datepicker
    $(".time-slot-date").datepicker({
      showAnim: "fadeIn",
      dateFormat: "yy-mm-dd"
    });

    $("#remove_timings").removeAttr("hidden");

  });


  $("#remove_timings").on("click",function() {

    $(`#${timingsCounter}`).remove()
    timingsCounter--;

    if(timingsCounter === 0) {
      $("#remove_timings").attr("hidden", "true")
    }

  })

});

