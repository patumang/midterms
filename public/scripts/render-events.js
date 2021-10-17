$().ready(() => {

  // get event row via query
  const getEvent = () => {

    $.get('/api/events/123456', null, (data, err) => {

      console.log('data', data.events['0']);

    });
  };

  getEvent();

});
