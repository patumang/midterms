module.exports = db => {
  const updateResponse = (response) => {
    const {
      visitorId,
      timingId,
      answer
    } = response;

    const queryString = `
      UPDATE responses
      SET response = $1
      WHERE timing_id = $2
      AND visitor_id = $3;
    `;

    const queryParams = [ answer, timingId, visitorId ];
    return db.query(queryString,queryParams)
  };

  return { updateResponse };
};
