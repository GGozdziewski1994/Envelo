import isRequired from "./isRequired";

let value = '';
let valueTrue = 'true';

test('isRequired test result', () => {
    expect(isRequired(value)).toBe(false);
});

test('isRequired test result', () => {
    expect(isRequired(valueTrue)).toBe(true);
});
