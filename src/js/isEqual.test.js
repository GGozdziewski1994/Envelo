import isEqual from "./isEqual.js";

let value = '12345';
let inputLength = 5;

test('isEqual test result', () => {
    expect(isEqual(value, inputLength)).toBe(true);
});