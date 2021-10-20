/* eslint-disable no-undef */

const getEventData = (path, refresh) => {
  $.get(`/api${path}`, null)
    .then((res) => {
      $(".lbl-unique-link").html(`http://localhost:8080/events/${res.event_details.unique_url}`);
      $(".lbl-title").html(`${res.event_details.title}`);
      $(".lbl-organizer").html(`Organizer: ${res.event_details.creator_name}`);
      $(".lbl-venue").html(`Venue: ${res.event_details.venue}`);
      $(".lbl-event-desc").html(res.event_details.description);
      createGrid(res);

      // corresponds with send-button;
      if (!refresh) {
        appendSendButton();
      }
    })
    .then(() => {
      startCheckBoxListener()
    })
    .catch((err) => {
      console.log('get');
      console.log(err);
    });
};


const postVisitorResponses = function() {
  let newVisitorName = "";
  const newResponses = [];
  $(".cell-new").each(function() {
    if ($(this).children().is("input[type='text']")) {
      newVisitorName = $("#new-visitor-name").val();
      newVisitorEmail = $("#new-visitor-email").val();
    } else if ($(this).children().is("input[type='checkbox']")) {
      newResponses.push({
        timingId: $(this).attr("data-timing"),
        answer: $(this).children().prop("checked")
      });
    }
  });

  // const updatedResponses = [];
  // $(".cell-old").each(function() {
  //   if ($(this).children().is("input[type='checkbox']")) {
  //     updatedResponses.push({
  //       visitorId: $(this).attr("data-visitor"),
  //       timingId: $(this).attr("data-timing"),
  //       answer: $(this).children().prop("checked")
  //     });
  //   }
  // });

  const uniqueId = $(location).attr("pathname").split("/")[2];
  const responsesObj = {
    uniqueId,
    newVisitorName,
    newVisitorEmail,
    newResponses,
    // updatedResponses
  };
  // console.log(responsesObj);

  if (newVisitorName) {
    $.post("/api/responses", responsesObj)
      .catch((err) => {
        console.log(err);
      });
  }

};

// accepts data from checkbox parent
const updateResponses = (response) => {

  const updatedResponses = {
    visitorId: $(response).attr("data-visitor"),
    timingId: $(response).attr("data-timing"),
    answer: $(response).children().prop("checked")
  };

  // console.log(updatedResponses);

  $.post('/api/responses/update', updatedResponses);
};

const startCheckBoxListener = () => {
  $(".response-cbox").change((event) => {
    updateResponses($(event.target).parent());
  });
};

const createGrid = (gridData) => {

  // reset table
  $('.responses-table').empty();

  const $responsesTable = $(".responses-table");

  /* row to display table header */
  const $headerRow = $("<div>").addClass("responses-table-header");

  $headerRow.append($("<div>").html("Participants").addClass("responses-header-cell"));

  for (const timeSlot of gridData.timeSlots) {
    const $responsesHeaderCell = $("<div>").attr({
      "class": "responses-header-cell cell-time",
      "data-timing": timeSlot.timing_id
    });

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
    const $responsesTotalVotesCell = $("<div>").html(item.total_votes).attr({
      "class": "cell cell-time cell-total",
      "data-timing": item.timing_id
    });

    $totalVotesRow.append($responsesTotalVotesCell);
  }

  $responsesTable.append($totalVotesRow);

  /* row to input new visitor */
  const $newVisitorRow = $("<div>").addClass("responses-row-new-visitor");
  $newVisitorCell = $("<div>").addClass("cell cell-new col-header").css({
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center"
  });
  $newVisitorNameTxtBox = $("<input>").attr({
    type: "text",
    placeholder: "Your Name",
    id: "new-visitor-name"
  }).css("width", $(".col-header").width() - 10);
  $newVisitorEmailTxtBox = $("<input>").attr({
    type: "text",
    placeholder: "Your Email",
    id: "new-visitor-email"
  }).css({
    "width": $(".col-header").width() - 10,
    "margin-top": "10px"
  });
  $newVisitorCell.append($newVisitorNameTxtBox, $newVisitorEmailTxtBox);
  $newVisitorRow.append($newVisitorCell);

  for (const timeSlot of gridData.timeSlots) {
    const $responsesNewVoteCell = $("<div>").attr({
      "class": "cell cell-new cell-time",
      "data-timing": timeSlot.timing_id
    });

    const $voteCheckbox = $("<input>").attr({
      type: 'checkbox',
      class: 'response-cbox'
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
        "class": "cell cell-old cell-time",
        "data-visitor": visitor.visitor_id,
        "data-timing": ans.timing_id
      })
      ;

      const $voteCheckbox = $("<input>").attr({
        type: 'checkbox',
        class: 'response-cbox',
        checked: ans.answer
      });

      $responsesVotesCell.append($voteCheckbox);

      $votesRow.append($responsesVotesCell);
    }

    $responsesTable.append($votesRow);
  }

  // const $responsesContainer = $(".responses-container");
  // $responsesContainer.append(`
  //     <div class="form-group text-center  mt-4">
  //       <button type="submit" class="btn btn-outline-success btn-lg" id="send_response" name="send_response">Send</button>
  //     </div>
  //   `);

  // // when clicked; post request to api/responses, then refresh page
  // $("#send_response").click(() => {
  //   postVisitorResponses();
  //   getEventData($(location).attr("pathname"));
  // });

  $(".response-cbox").change(function() {
    $(this).parent().css("background-color", "green");
    const currentTimingId = $(this).parent().attr("data-timing");
    console.log("outside:", $(this).parent().attr("data-timing"));
    updateResponses($(this).parent());
    if ($(this).prop("checked")) {
      $(".cell-total").each(function() {
        if ($(this).attr("data-timing") === currentTimingId)
          $(this).html(Number($(this).html()) + 1);
      });
      $(".cell-time").each(function() {
        if ($(this).attr("data-timing") === currentTimingId)
          $(this).css("background-color", "#92e6a7");
      });
    } else {
      $(".cell-total").each(function() {
        if ($(this).attr("data-timing") === currentTimingId)
          $(this).html(Number($(this).html()) - 1);
      });
      $(".cell-time").each(function () {
        if ($(this).attr("data-timing") === currentTimingId)
          $(this).css("background-color", "#e9ecef");
      });
    }

  });
};

const appendSendButton = () => {
  const $responsesContainer = $(".responses-container");
  $responsesContainer.append(`
      <div class="form-group text-center  mt-4">
        <button type="submit" class="btn btn-outline-success btn-lg" id="send_response" name="send_response">Send</button>
      </div>
    `);

  // when clicked; post request to api/responses, then refresh page
  $("#send_response").click(() => {
    postVisitorResponses();
    setTimeout(getEventData($(location).attr("pathname"), 'refresh'), 4000);
  });
};

$(() => {

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
    if (path[1] !== 'events' || path.length !== 3) {
      $(".event-details-container").html("Invalid Event link!");
    } else {
      getEventData($(location).attr("pathname"));
      $(".event-details-container").show();
    }
  }

});
