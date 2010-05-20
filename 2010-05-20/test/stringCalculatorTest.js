eval(loadFile('lib/StringCalculator.js'));

testCases(test,
  
  function shouldReturnZeroWhenGivenEmptyString() {
    assert.that(''.add(), eq(0));
  },
  
  function shouldReturnIntegerValueWhenGivenOneNumber() {
    assert.that('1'.add(), eq(1));
  },
  
  function shouldAddTwoNumbers() {
    assert.that('1,2'.add(), eq(3));
  },
  
  function shouldAllowNewlineAsDelimiter() {
    assert.that("1,2\n3".add(), eq(6));
  },
  
  function shouldIgnoreTrailingDelimiters() {
    assert.that("1,\n".add(), eq(1));
  },
  
  function shouldAllowAnAlternateDelimiter() {
    assert.that("//;\n1;2".add(), eq(3));
  },
  
  function shouldNotAllowNegatives() {
    var thrown  = false;
    var message = null;
    
    try {
      "-1".add();
    } catch(e) {
      thrown  = true;
      message = e;
    }
    
    assert.that(thrown, eq(true));
    assert.that(message, eq("Negatives not allowed: -1"));    
  },
  
  function shouldIncludeAllNegativeNumbersInTheErrorMessage() {
    var thrown = false;
    var message = null;
    
    try {
      "-1,2,-3".add();
    } catch(e) {
      thrown = true;
      message = e;
    }
    
    assert.that(thrown, eq(true));
    assert.that(message, eq("Negatives not allowed: -1, -3"));
  }
  
);