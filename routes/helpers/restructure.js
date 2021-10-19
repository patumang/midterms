module.exports = visitors => {
  // restructures objects array to remove duplicates and compile object.responses under the same object
  // corresponds with events.js for fetching events api;

  const distinctVisitors = [];

  const fetchVisitorById = (visitorsArray, id) => {
    // if match, return visitor object;
    for (const visitor of visitorsArray) {
      console.log('element', visitor);
      console.log(visitor.id, '?==', id);
      if (visitor.id === id) {
        return visitor;
      }
    }
    return false;
  };

  for (const visitor of visitors) {
    const id = visitor.id;
    const response = visitor.response;
    const visitorExists = fetchVisitorById(distinctVisitors, id);

    if (!visitorExists) {
      const name = visitor.visitor_name;
      const email = visitor.visitor_email;
      const newVisitor = {
        name,
        email,
        response: [response],
        id
      };
      distinctVisitors.push(newVisitor);
      console.log('push visitor');
    } else {
      visitorExists.response.push(response);
    }
  }
  return distinctVisitors;
}; // dead
