import { validateURL } from '../js/validateURLInput';

describe("Validate URL", () => {
  test("it should return true for a valid URL", () => {
    const input = "https://www.cnn.com/2020/05/26/tech/spacex-nasa-launch-may-27-scn/index.html";
    const output = true;
    expect(validateURL(input)).toEqual(output);
  });

  test("it should return false for an invalid URL", () => {
    const input = "acex-nasa-launch-may-27-scn/index.html";
    const output = false;
    expect(validateURL(input)).toEqual(output);
  })
});
