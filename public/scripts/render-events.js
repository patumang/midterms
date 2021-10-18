// DOM manipulation - render event page
$().ready(() => {

  const getEvent = () => {
    // fetch pathname - append to GET request
    const path = $(location).attr('pathname');

    // GET request to event json (see /routes/events)
    $.get(`/api${path}`, null, (data, err) => {
      // console.log('data', data.events['0']);
    });
  };

  getEvent();

});
