import { afterEach, describe, expect, it, vi } from "vitest";

function getLatest(index = messages.items.length - 1) {
  return messages.items[index];
}

const messages = {
  items: [
    { message: "Simple test message", from: "Testman" },
    { message: "Another test message", from: "Testwoman" },
    { message: "Yet another test message", from: "Testperson" },
    { message: "The last test message", from: "Testhuman" },
    { message: "The very last test message", from: "Testalien" },
    { message: "The very very last test message", from: "Testrobot" },
    { message: "The very very very last test message", from: "Testdog" },
  ],
  getLatest, // can also be a `getter or setter if supported`
};

describe("reading messages", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should get with a mock", () => {
    const mock = vi.fn().mockImplementation(getLatest);

    const called = mock();
    const sameAsCallingDirectly = messages.items[messages.items.length - 1];

    expect(called).toEqual(sameAsCallingDirectly);
    expect(mock).toHaveBeenCalledTimes(1);

    mock.mockImplementationOnce(() => "access-restricted");
    expect(mock()).toEqual("access-restricted");

    expect(mock).toHaveBeenCalledTimes(2);

    expect(mock()).toEqual(sameAsCallingDirectly);
    expect(mock).toHaveBeenCalledTimes(3);
  });
});
