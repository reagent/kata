String.prototype.add = function() {
  var calculator = new StringCalculator(this);
  return calculator.sum();
};

Array.prototype.map = function(callback) {
  var result = [];
  for(var i = 0; i < this.length; i++) { result.push(callback(this[i])); }
  return result;
}

Array.prototype.select = function(callback) {
  var values = [];
  for (var i = 0; i < this.length; i++) {
    if (callback(this[i])) { values.push(this[i]); }
  }
  return values;
}

var StringCalculator = function(numbersWithDelimiter) {

  var calculator = this;

  var splitPattern = function() {
    return new RegExp("[" + delimiter() + "\n]");
  };

  var delimiter = function() {
    var matches = numbersWithDelimiter.match(/^(?:\/\/([^\n])\n)/);
    return (matches == null) ? ',' : matches[1];
  };

  var numbers = function() {
    return numbersWithDelimiter.split(splitPattern());
  };

  var toInteger = function(value) {
    var castedValue = parseInt(value, 10);
    return (isNaN(castedValue)) ? 0 : castedValue;
  }

  var integers = function() {
    return numbers().map(toInteger);
  }

  var negatives = function() {
    return integers().select(function(e) { return e < 0; });
  }

  var raiseIfNegativeNumbersSupplied = function() {
    if (negatives().length > 0) { throw("Negatives not allowed: " + negatives().join(', ')); }
  }

  this.sum = function() {
    raiseIfNegativeNumbersSupplied();
    return integers().reduce(function(a, b) { return a + b; }, 0);
  }

}