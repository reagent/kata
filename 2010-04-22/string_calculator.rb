class StringCalculator
  
  def self.add(numbers_with_optional_delimiter)
    numbers, delimiter = split_input(numbers_with_optional_delimiter)
    integers(numbers, delimiter).inject(0) {|sum, i| sum += i }
  end
  
  private

  def self.split_input(numbers_with_optional_delimiter)
    matches = numbers_with_optional_delimiter.match(%r(^//([^\n]+)\n))
    delimiter = matches.nil? ? ',' : matches[1]
    
    [numbers_with_optional_delimiter, delimiter]
  end
  
  def self.integers(input, delimiter)
    integers = input.split(/[\n#{Regexp.escape(delimiter)}]/).map {|n| n.to_i}
    integers.reject! {|i| i > 1000}
    
    negatives = integers.select {|i| i < 0}
    raise "negatives not allowed #{negatives.join(' ')}" unless negatives.empty?
    
    integers
  end
  
end