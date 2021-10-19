/* eslint-disable no-undef */

const getEventData = (path) => {
  $.get(`/api${path}`, null)
    .then((res) => {
      console.log(res);
      createGrid(res);
    })
    .catch((err) => {
      console.log(err);
    });
};


const postVisitorResponses = function() {
  const updatedResponses = [];
  $(".cell").each(function(index) {
    if ($(this).children().is("input[type='checkbox']")) {
      updatedResponses.push({
        visitorId: $(this).attr("data-visitor"),
        timingId: $(this).attr("data-timing"),
        answer: $(this).children().prop("checked")
      });
    }
  });
  $.post("/api/responses", updatedResponses)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createGrid = (responses) => {
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
      const $responsesVotesCell = $("<div>").attr({
        "class": "cell",
        "data-visitor": visitor.visitorId,
        "data-timing": ans.timingId
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

  //temporary
  const responses = {
    timeSlots: [
      { timingId: 1, date: "Oct 12 2021", startTime: "10:00AM", endTime: "11:00AM" },
      { timingId: 2, date: "Oct 13 2021", startTime: "1:00PM", endTime: "2:00PM" },
      { timingId: 3, date: "Oct 15 2021", startTime: "11:00AM", endTime: "12:00PM" },
      { timingId: 4, date: "Oct 19 2021", startTime: "2:00PM", endTime: "3:00PM" }
    ],
    totalVotes: [3, 2, 0, 1],
    visitors: [
      { visitorId: 1, name: "visitor1", answers: [{ timingId: 1, answer: true }, { timingId: 2, answer: true }, { timingId: 3, answer: false }, { timingId: 4, answer: false }] },
      { visitorId: 2, name: "visitor2", answers: [{ timingId: 1, answer: true }, { timingId: 2, answer: true }, { timingId: 3, answer: false }, { timingId: 4, answer: true }] },
      { visitorId: 3, name: "visitor3", answers: [{ timingId: 1, answer: true }, { timingId: 2, answer: false }, { timingId: 3, answer: false }, { timingId: 4, answer: false }] }
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
