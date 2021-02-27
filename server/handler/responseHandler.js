module.exports = (res, onfulfilled, onrejected) => {
  try {
    return res.send(onfulfilled);
  } catch (err) {
    return res.send(onrejected);
  }
};
