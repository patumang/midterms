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

  //temporary
  const responses = {
    timeSlots: [
      { date: "Oct 12 2021", startTime: "10:00AM", endTime: "11:00AM"},
      { date: "Oct 13 2021", startTime: "1:00PM", endTime: "2:00PM"},
      { date: "Oct 15 2021", startTime: "11:00AM", endTime: "12:00PM"},
      { date: "Oct 19 2021", startTime: "2:00PM", endTime: "3:00PM"}
    ],
    totalVotes: [3, 2, 0, 1],
    visitors: [
      { name: "visitor1", answers: [true, true, false, false] },
      { name: "visitor2", answers: [true, true, false, true] },
      { name: "visitor3", answers: [true, false, false, false] }
    ]
  };

  if ($(location).attr("pathname") === "/") {
    $(".create-event-container").hide();
    $(".event-details-container").hide();
  } else if ($(location).attr("pathname") === "/events/new") {
    $(".create-event-container").show();
    $(".event-details-container").hide();
  } else {
    $(".create-event-container").hide();
    $(".event-details-container").show();

    /* temporary starts */
    const $responsesTable = $(".responses-table");

    /* row to display table header */
    const $headerRow = $("<div>").addClass("responses-table-header");

    $headerRow.append($("<div>").html("Participants").addClass("responses-header-cell"));

    for (const timeSlot of responses.timeSlots) {
      const $responsesHeaderCell = $("<div>").addClass("responses-header-cell");

      const date = timeSlot.date.split(' ');
      const $dateMonth = $("<div>").addClass("responses-header-month").html(date[0]);
      const $dateDay = $("<div>").addClass("responses-header-day").html(date[1]);
      const $dateYear = $("<div>").addClass("responses-header-year").html(date[2]);
      const $startTime = $("<div>").addClass("responses-header-start-time").html(timeSlot.startTime);
      const $endTime = $("<div>").addClass("responses-header-end-time").html(timeSlot.endTime);
      $responsesHeaderCell.append($dateMonth, $dateDay, $dateYear, $startTime, $endTime);

      $headerRow.append($responsesHeaderCell);
    }

    $responsesTable.append($headerRow);

    /* row to display total votes */
    const $totalVotesRow = $("<div>").addClass("responses-row-total-votes");

    $totalVotesRow.append($("<div>").html("Total").addClass("cell col-header"));

    for (const vote of responses.totalVotes) {
      const $responsesTotalVotesCell = $("<div>").html(vote).addClass("cell");

      $totalVotesRow.append($responsesTotalVotesCell);
    }

    $responsesTable.append($totalVotesRow);

    /* data rows */
    for (const visitor of responses.visitors) {
      const $votesRow = $("<div>").addClass("responses-row-votes");

      const $responsesVotesCell = $("<div>").html(visitor.name).addClass("cell col-header");
      $votesRow.append($responsesVotesCell);

      for (const ans of visitor.answers) {
        const $responsesVotesCell = $("<div>").addClass("cell");

        const $voteCheckbox = $("<input>").attr({
          type: 'checkbox',
          checked: ans
        });

        $responsesVotesCell.append($voteCheckbox);

        $votesRow.append($responsesVotesCell);
      }

      $responsesTable.append($votesRow);
    }

    const $responsesContainer = $(".responses-container");
    $responsesContainer.append(`
      <div class="form-group text-center  mt-4">
        <button type="submit" class="btn btn-outline-success btn-lg" name="send_response">Send</button>
      </div>
    `);

    /* temporary ends */
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
