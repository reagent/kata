String.prototype.add = function() {
  return new StringCalculator(this).add();
}

Array.prototype.sum = function() {
  var sum = 0;
  for (var i = 0; i < this.length; i++) { sum += this[i]; }
  return sum;
}

Array.prototype.map = function(callback) {
  var mapped = [];
  for (var i = 0; i < this.length; i++) {
    mapped.push(callback(this[i]));
  }
  return mapped;
}

Array.prototype.select = function(callback) {
  var accepted = [];
  for (var i = 0; i < this.length; i++) {
    if (callback(this[i])) { accepted.push(this[i]); }
  }
  return accepted;
}

String.prototype.toInteger = function() {
  var integer = parseInt(this, 10);
  return (isNaN(integer)) ? 0 : integer ;
}

function StringCalculator(numbers_with_delimiter) {
  
  var calculator = this;

  calculator.delimiter = function() {
    var matches = numbers_with_delimiter.match(/^\/\/([^\n])\n/);
    var delimiter = (matches == null) ? ',' : matches[1] ;

    return new RegExp("[" + delimiter + "\n]");
  }
  
  calculator.numbers = function() {
    return numbers_with_delimiter.split(calculator.delimiter());
  }
  
  calculator.integers = function() {
    return calculator.numbers().map(function(e) { return e.toInteger(); });
  }
  
  calculator.negatives = function() {
    return calculator.integers().select(function(e) { return e < 0; });
  }

  calculator.ensureNoNegativeNumbers = function() {
    var negatives = calculator.negatives();
    if (negatives.length > 0) { throw("Negatives not allowed: " + negatives.join(', ')); }
  }
  
  calculator.add = function() {
    calculator.ensureNoNegativeNumbers();
    return calculator.integers().sum();
  }
  
}