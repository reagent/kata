$(document).ready(function(){
  
  test("should return 0 for an empty string", function() {
    equals(StringCalculator.add(''), 0);
  });
  
  test("should return the number when given a number", function() {
    equals(StringCalculator.add('1'), 1);
  });
  
  test("should return the sum of 2 numbers", function() {
    equals(StringCalculator.add('1,2'), 3);
  });
  
  test("should handle an unknown amount of numbers", function() {
    equals(StringCalculator.add('1,2,3,4'), 10);
  });
  
  test("should recognize a newline as an alternate delimiter", function() {
    equals(StringCalculator.add("1\n2,3"), 6);
  });
  
  test("should ignore trailing delimiters", function() {
    equals(StringCalculator.add("1,\n"), 1);
  });
  
  test("should be able to handle a different delimiter", function() {
    equals(StringCalculator.add("//;\n1;2"), 3);
  });
  
  test("should not allow negative numbers", function() {
    expect(1);
    try {
      StringCalculator.add('-1');
    } catch (e) {
      equals(e, "Negatives not allowed: -1");
    }
  });
  
  test("should report on the negative numbers", function() {
    expect(1);
    try {
      StringCalculator.add('1,-1,3,-2');
    } catch (e) {
      equals(e, "Negatives not allowed: -1, -2");
    }
  });
  
  

});
