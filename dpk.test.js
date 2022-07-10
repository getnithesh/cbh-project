const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the correct trivial key for the given input", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: 10});
    expect(trivialKey).toBe("10");

    const trivialKeyComplex = deterministicPartitionKey({partitionKey: {k:10}});
    expect(trivialKeyComplex).toBe("{\"k\":10}");

    const trivialKeyMax = deterministicPartitionKey({partitionKey: Number.MAX_SAFE_INTEGER});
    expect(trivialKeyMax).toBe(Number.MAX_SAFE_INTEGER.toString());

    const trivialKeyMin = deterministicPartitionKey({partitionKey: Number.MIN_SAFE_INTEGER});
    expect(trivialKeyMin).toBe(Number.MIN_SAFE_INTEGER.toString());
  });

  it("Returns the a random hash when no partitionkey has given", () => {
    const trivialKey = deterministicPartitionKey({noPartitionKey: 10});
    expect(trivialKey).not.toBe("0");
  });

});
