export default (error) => {
  let errorMessage = error.message;
  const eRes = error.response;
  if (eRes && typeof eRes.data !== 'string' && eRes.data.error.message) errorMessage = eRes.data.error.message;
  return errorMessage;
};
