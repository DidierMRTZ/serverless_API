exports.GetUser = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "usuario creado",
    }),
  };
};

