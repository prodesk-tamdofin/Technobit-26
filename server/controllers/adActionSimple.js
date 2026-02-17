const getSettings = async (req, res) => {
  return res.json({
    succeed: true,
    result: [
      {
        caRegPermit: true,
        parRegPermit: true,
      },
    ],
  });
};

module.exports = { getSettings };
