String.prototype.add = function() {
  var calculator = new StringCalculator(this);
  return calculator.add();
}

Array.prototype.map = function(callback) {
  var transformed = [];
  for (var i = 0; i < this.length; i++) {
    transformed.push(callback(this[i]))
  }
  return transformed;
}

Array.prototype.select = function(callback) {
  var accepted = [];
  for (var i = 0; i < this.length; i++) { 
    if (callback(this[i])) { accepted.push(this[i]); }
  }
  return accepted;
}

function StringCalculator(numbers_with_delimiter) {
  
  function is_number(value) {
    var integer_value = parseInt(value, 10);
    return !isNaN(integer_value);
  }
  
  this.delimiter = function() {
    matches = numbers_with_delimiter.match(/^\/\/([^\n])\n/);
    return (matches == null) ? ',' : matches[1];
  }
  
  this.numbers = function() {
    pattern = new RegExp("[" + this.delimiter() + "\n]");
    return numbers_with_delimiter.split(pattern);
  }
  
  this.negative_numbers = function() {
    return this.integers().select(function(e) { return e < 0; });
  }

  this.raise_if_negative_numbers = function() {
    var negative_numbers = this.negative_numbers();
    if (negative_numbers.length > 0) {
      throw("Negatives not allowed: " + negative_numbers.join(', ')); 
    }
  }

  this.digits = function() {
    return this.numbers().select(function(e) { return is_number(e); });
  }
  
  this.integers = function() {
    return this.digits().map(function(e) { return parseInt(e, 10); });
  }
  
  this.add = function() {
    this.raise_if_negative_numbers();
    return this.integers().reduce(function(a, b) { return a + b; }, 0);
  }
  
}