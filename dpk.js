const crypto = require("crypto");
const TRIVIAL_PARTITION_KEY = "0";

/**
 * Accepts the event input and return the corresponding candidate partition key.
 * @param {Object} event 
 * @returns 
 */
exports.deterministicPartitionKey = (event) => {
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = getCandidateFromEvent(event);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = getCryptoHash(candidate);
  }

  return candidate;
};

/**
 * Returns the crypto hash for the given string input.
 * @param {String} data 
 * @returns 
 */
const getCryptoHash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex")
}

/**
 * Accepts the event object and returns the candidate key.
 * @param {Object} event 
 * @returns 
 */
const getCandidateFromEvent = (event) => {
  if(event) {
    return JSON.stringify(event?.partitionKey) || getCryptoHash(JSON.stringify(event))
  }

  return TRIVIAL_PARTITION_KEY;
}