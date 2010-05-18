StringCalculator.add = function(numbers_to_add) {
  calculator = new StringCalculator(numbers_to_add);
  return calculator.add();
}

function StringCalculator(numbers_with_delimiter) {
  
  this.numbers_with_delimiter = numbers_with_delimiter;
  this.delimiter_pattern      = /^\/\/([^\n]+)\n/;

  this.add = function() {
    this.ensure_no_negative_numbers();
    
    var add = function(a, b) { return a + b; }
    return this.integers().reduce(add, 0);
  }
  
  this.negatives = function() {
    var is_negative = function(element) { return element < 0 }
    return this.integers().select(is_negative);
  }
  
  this.integers = function() {
    var to_integer = function(element) { return parseInt(element, 10); }
    return this.digits().map(to_integer);
  }
  
  this.delimiter = function() {
    var matches = this.numbers_with_delimiter.match(this.delimiter_pattern);
    var delimiter = (matches == null) ? ',' : matches[1];
    
    return new RegExp("[" + delimiter + "\n]");
  }
  
  this.numbers = function() {
    return this.numbers_with_delimiter.replace(this.delimiter_pattern, '');
  }
  
  this.digits = function() {
    var elements = this.numbers().split(this.delimiter());
    
    var not_empty = function(element) { return element != ''; }
    return elements.select(not_empty);
  }
  
  this.ensure_no_negative_numbers = function() {
    var negatives = this.negatives();
    if (negatives.length > 0) { throw("Negatives not allowed: " + negatives.join(', ')); }
  }
  
}

Array.prototype.select = function(callback) {
  var accepted = [];
  for (var i = 0; i < this.length; i++) {
    if (callback(this[i])) { accepted.push(this[i]) }
  }
  return accepted;
}

Array.prototype.map = function(callback) {
  var mapped = [];
  
  for (var i = 0; i < this.length; i++) {
    mapped.push(callback(this[i]));
  }
  
  return mapped;
}
