/* eslint-disable no-undef */

const getEventData = (path) => {
  $.get(`/api${path}`, null)
    .then((res) => {
      console.log(res);
      $(".lbl-unique-link").html(`http://localhost:8080/events/${res.event_details.unique_url}`);
      $(".lbl-organizer").html(`Organizer: ${res.event_details.creator_name}`);
      $(".lbl-venue").html(`Venue: ${res.event_details.venue}`);
      $(".lbl-event-desc").html(res.event_details.description);
      createGrid(res);
    })
    .catch((err) => {
      console.log(err);
    });
};


const postVisitorResponses = function() {
  let newVisitorName = "";
  const newResponses = [];
  $(".cell-new").each(function() {
    if ($(this).children().is("input[type='text']")) {
      newVisitorName = $("#new-visitor-name").val();
    } else if ($(this).children().is("input[type='checkbox']")) {
      newResponses.push({
        timingId: $(this).attr("data-timing"),
        answer: $(this).children().prop("checked")
      });
    }
  });
  const updatedResponses = [];
  $(".cell-old").each(function() {
    if ($(this).children().is("input[type='checkbox']")) {
      updatedResponses.push({
        visitorId: $(this).attr("data-visitor"),
        timingId: $(this).attr("data-timing"),
        answer: $(this).children().prop("checked")
      });
    }
  });
  const uniqueId = $(location).attr("pathname").split("/")[2];
  const responsesObj = { uniqueId, newVisitorName, newResponses, updatedResponses};
  console.log(responsesObj);

  $.post("/api/responses", responsesObj)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createGrid = (gridData) => {
  const $responsesTable = $(".responses-table");

  /* row to display table header */
  const $headerRow = $("<div>").addClass("responses-table-header");

  $headerRow.append($("<div>").html("Participants").addClass("responses-header-cell"));

  for (const timeSlot of gridData.timeSlots) {
    const $responsesHeaderCell = $("<div>").addClass("responses-header-cell");

    const date = new Date(timeSlot.date);
    const $dateMonth = $("<div>").addClass("responses-header-month").html(date.toLocaleString('default', { month: 'short' }));
    const $dateDay = $("<div>").addClass("responses-header-day").html(date.getDate() + 1);
    const $dateYear = $("<div>").addClass("responses-header-year").html(date.getFullYear());
    const $startTime = $("<div>").addClass("responses-header-start-time").html(timeSlot.start_time);
    const $endTime = $("<div>").addClass("responses-header-end-time").html(timeSlot.end_time);
    $responsesHeaderCell.append($dateMonth, $dateDay, $dateYear, $startTime, $endTime);

    $headerRow.append($responsesHeaderCell);
  }

  $responsesTable.append($headerRow);

  /* row to display total votes */
  const $totalVotesRow = $("<div>").addClass("responses-row-total-votes");

  $totalVotesRow.append($("<div>").html("Total").addClass("cell col-header"));

  for (const item of gridData.totalVotes) {
    const $responsesTotalVotesCell = $("<div>").html(item.total_votes).addClass("cell");

    $totalVotesRow.append($responsesTotalVotesCell);
  }

  $responsesTable.append($totalVotesRow);

  /* row to input new visitor */
  const $newVisitorRow = $("<div>").addClass("responses-row-new-visitor");

  $newVisitorRow.append($("<div>").addClass("cell cell-new col-header").append($("<input>").attr({
    type: "text",
    placeholder: "Your Name",
    id: "new-visitor-name"
  }).css("width", $(".col-header").width() - 10)));

  for (const timeSlot of gridData.timeSlots) {
    const $responsesNewVoteCell = $("<div>").attr({
      "class": "cell cell-new",
      "data-timing": timeSlot.timing_id
    });

    const $voteCheckbox = $("<input>").attr({
      type: 'checkbox'
    });

    $responsesNewVoteCell.append($voteCheckbox);

    $newVisitorRow.append($responsesNewVoteCell);
  }

  $responsesTable.append($newVisitorRow);

  /* data rows */
  for (const visitor of gridData.responses) {
    const $votesRow = $("<div>").addClass("responses-row-votes");

    const $responsesVotesCell = $("<div>").html(visitor.visitor_name).addClass("cell col-header");
    $votesRow.append($responsesVotesCell);

    for (const ans of visitor.answers) {
      const $responsesVotesCell = $("<div>").attr({
        "class": "cell cell-old",
        "data-visitor": visitor.visitor_id,
        "data-timing": ans.timing_id
      })
      ;

      const $voteCheckbox = $("<input>").attr({
        type: 'checkbox',
        checked: ans.answer
      });

      $responsesVotesCell.append($voteCheckbox);

      $votesRow.append($responsesVotesCell);
    }

    $responsesTable.append($votesRow);
  }

  const $responsesContainer = $(".responses-container");
  $responsesContainer.append(`
      <div class="form-group text-center  mt-4">
        <button type="submit" class="btn btn-outline-success btn-lg" id="send_response" name="send_response">Send</button>
      </div>
    `);
  $("#send_response").click(postVisitorResponses);
};

$(() => {

  if ($(location).attr("pathname") === "/") {
    $(".create-event-container").hide();
    $(".event-details-container").hide();
  } else if ($(location).attr("pathname") === "/events/new") {
    $(".create-event-container").show();
    $(".event-details-container").hide();
  } else {
    $(".create-event-container").hide();
    const path = $(location).attr("pathname").split("/");
    console.log(path);
    if (path[1] !== 'events' || path.length !== 3) {
      $(".event-details-container").html("Invalid Event link!");
    } else {
      getEventData($(location).attr("pathname"));
      $(".event-details-container").show();
    }
  }
});

{
  uniqueId: '345678',
  newVisitorName: 'abc',
  newResponses: [
    { timingId: '5', answer: false },
    { timingId: '6', answer: true },
    { timingId: '7', answer: true },
    { timingId: '8', answer: false }
  ],
  updatedResponses: [
    { visitorId: '3', timingId: '5', answer: true },
    { visitorId: '3', timingId: '6', answer: false },
    { visitorId: '3', timingId: '7', answer: false },
    { visitorId: '3', timingId: '8', answer: false },
    { visitorId: '4', timingId: '5', answer: true },
    { visitorId: '4', timingId: '6', answer: false },
    { visitorId: '4', timingId: '7', answer: false },
    { visitorId: '4', timingId: '8', answer: false },
    { visitorId: '5', timingId: '5', answer: false },
    { visitorId: '5', timingId: '6', answer: false },
    { visitorId: '5', timingId: '7', answer: false },
    { visitorId: '5', timingId: '8', answer: false }
  ]
}
