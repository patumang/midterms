$().ready(() => {

  const path = $(location).attr('pathname');

  console.log(path);

  // get event row via query
  const getEvent = () => {

    $.get(`/api${path}`, null, (data, err) => {

      console.log('data', data.events);

    });
  };

  getEvent();

});
