$(document).ready(function(){
  
  test("should return 0 when adding an empty string", function() {
    equals("".add(), 0);
  });
  
  test("should return the number when given only 1 number", function() {
    equals("1".add(), 1);
  });

  test("should add 2 numbers", function() {
    equals("1,2".add(), 3);
  });
  
  test("should be able to add arbitrary numbers", function() {
    equals("1,2,3".add(), 6);
  });
  
  test("should treat a newline as a delimiter", function() {
    equals("1,2\n3".add(), 6);
  });
  
  test("should ignore trailing delimiters", function() {
    equals("1,\n".add(), 1);
  });
  
  test("should be able to accept a different delimiter", function() {
    equals("//;\n1;2".add(), 3);
  });
  
  test("should raise an exception when adding negative numbers", function() {
    expect(1);
    try {
      "-1".add();
    } catch(e) {
      equals(e, "Negatives not allowed: -1");
    }
  });
  
  test("should report on all negative numbers provided", function() {
    expect(1);
    try { 
      "-1,2,-3".add();
    } catch(e) {
      equals(e, "Negatives not allowed: -1, -3");
    }
  });

});
