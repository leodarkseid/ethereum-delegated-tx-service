import asyncErrorHandler from "express-async-handler";

export const handler = (app) => app.post("/confirm", asyncErrorHandler(async (req, res) => {
  const error = await validateRequest(req);
  if (error) {
    return res.status(400).send({ error });
  }
  const { requestId, signatureStandard, signature } = req.body;
  
}));

async function validateRequest (req) {
  let { requestId, signatureStandard, signature } = req.body;
  if (typeof(requestId) !== "string") {
    return `Provided 'requestId'=${ requestId } must be a string`;
  }
  if (typeof(signatureStandard) !== "string") {
    return `Provided 'signatureStandard'=${ signatureStandard } must be a string`;
  }
  if (typeof(signature) !== "string" || !/^0x[0-9a-f]+$/i.test(signature)) {
    return `Provided 'signature'=${ signature } must be a HEX string ('0x...')`;
  }
  return "";
}