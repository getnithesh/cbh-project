const crypto = require("crypto");
const TRIVIAL_PARTITION_KEY = "0";

exports.deterministicPartitionKey = (event) => {
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = getCandidateFromEvent(event);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = getCryptoHash(candidate);
  }

  return candidate;
};

const getCryptoHash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex")
}

const getCandidateFromEvent = (event) => {
  if(event) {
    return JSON.stringify(event?.partitionKey) || getCryptoHash(JSON.stringify(event))
  }

  return TRIVIAL_PARTITION_KEY;
}