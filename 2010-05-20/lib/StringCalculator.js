String.prototype.add = function() {
  return new StringCalculator(this).add();
}

function StringCalculator(numbers_with_delimiter) {
  
  var calculator = this;
  
  calculator.possibleNumbers = function() {
    return numbers_with_delimiter.split(this.delimiterPattern());
  }
  
  calculator.numbers = function() {
    var isNumeric = function(e) { return e.match(/^-?\d+$/); }
    return this.possibleNumbers().select(isNumeric);
  }
  
  calculator.delimiterPattern = function() {
    var matches = numbers_with_delimiter.match(/^\/\/([^\n])\n/);
    var delimiter = (matches == null) ? ',' : matches[1] ;

    return new RegExp("[" + delimiter + "\n]");
  }
  
  calculator.ensureNonNegativeNumbers = function() {
    var negatives = this.integers().select(function(e) { return e < 0; });
    if (negatives.length > 0) { throw("Negatives not allowed: " + negatives.join(', ')); }
  }
  
  calculator.add = function() {
    this.ensureNonNegativeNumbers();
    return this.integers().sum();
  }
  
  calculator.integers = function() {
    return this.numbers().map(function(e) { return parseInt(e, 10); });
  }
  
  Array.prototype.select = function(callback) {
    var selected = [];
    for (var i = 0; i < this.length; i++) {
      if (callback(this[i])) { selected.push(this[i]); }
    }
    return selected;
  }
  
  Array.prototype.map = function(callback) {
    var mapped = [];
    for (var i = 0; i < this.length; i++) {
      mapped.push(callback(this[i]));
    }
    return mapped;
  }
  
  Array.prototype.sum = function() {
    var sum = 0;
    for (var i = 0; i < this.length; i++) { sum += this[i]; }
    return sum;
  }
  
}