eval(loadFile('lib/StringCalculator.js'));

testCases(test,
  
  function shouldReturnZeroForEmptyString() {
    assert.that(''.add(), eq(0));
  },
  
  function shouldReturnIntegerValueWhenGivenASingleNumber() {
    assert.that('1'.add(), eq(1));
  },
  
  function shouldAddTwoNumbers() {
    assert.that('1,2'.add(), eq(3));
  },
  
  function shouldAddThreeNumbers() {
    assert.that('1,2,3'.add(), eq(6));
  },
  
  function shouldAcceptAlternatDelimiter() {
    assert.that("1\n2".add(), eq(3));
  },
  
  function shouldIgnoreTrailingDelimiters() {
    assert.that("1,\n".add(), eq(1));
  },
  
  function shouldAllowSpecificationOfAlternateDelimiter() {
    assert.that("//;\n1;2".add(), eq(3));
  },
  
  function shouldThrowAnExceptionWhenAddingNegatives() {
    var thrown  = false;

    try {
      "-1".add();
    } catch(e) {
      thrown  = true;
    }
    
    assert.that(thrown, eq(true));
  },
  
  function shouldIncludeNegativeNumbersInErrorMessage() {
    var message = null;
    
    try {
      "-1,2,-3".add();
    } catch(e) {
      message = e;
    }
    
    assert.that(message, eq("Negatives not allowed: -1, -3"));
  }
  
);