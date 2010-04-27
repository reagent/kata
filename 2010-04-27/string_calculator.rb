class String
  
  def add
    raise_if_negative_number_given
    digits.inject(0) {|total, digit| total + digit }
  end
  
  def digits
    @digits ||= all_digits.reject {|d| d > 1000 }
  end
  
  def all_digits
    split(/[#{Regexp.escape(delimiter)}\n]/).map {|n| n.to_i }
  end
  
  def delimiter
    matches = match(%r{^//([^\n]+)\n})
    matches.nil? ? ',' : matches[1]
  end
  
  def raise_if_negative_number_given
    negatives = digits.select {|d| d < 0 }
    raise "Negatives not allowed: #{negatives.join(', ')}" if negatives.any?
  end
  
end