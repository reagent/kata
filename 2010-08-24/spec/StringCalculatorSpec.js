describe("A String", function() {

  it("should return 0 when adding no numbers", function() {
    expect("".add()).toEqual(0);
  });

  it("returns the integer value when adding a single number", function() {
    expect("1".add()).toEqual(1);
  });

  it("adds 2 numbers", function() {
    expect("1,2".add()).toEqual(3);
  });

  it("handles more than 2 numbers", function() {
    expect("1,2,3".add()).toEqual(6);
  });

  it("treats newlines as delimiters", function() {
    expect("1\n2".add()).toEqual(3);
  });

  it("ignores extraneous newlines", function() {
    expect("1,\n".add()).toEqual(1);
  });

  it("allows specification of a different delimiter", function() {
    expect("//;\n1;2".add()).toEqual(3);
  });

  it("produces an error when negatives are supplied", function() {
    expect(function() { "-1".add(); }).toThrow("Negatives not allowed: -1");
  });

  it("produces an error that includes all negative numbers", function() {
    expect(function() { "-1,-2".add(); }).toThrow("Negatives not allowed: -1, -2");
  });

  it("reports on only the negative numbers", function() {
    expect(function() { "-1,2,-3".add(); }).toThrow("Negatives not allowed: -1, -3");
  });

});