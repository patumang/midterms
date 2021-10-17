$().ready(() => {

  const path = $(location).attr('pathname');

  // get event json via query (../routes/events.js)
  const getEvent = () => {

    $.get(`/api${path}`, null, (data, err) => {

      // console.log('data', data.events);

    });
  };

  getEvent();

});
