class String
  
  def add
    raise_error_on_negative_numbers
    digits.inject(0) {|total, digit| total + digit }
  end
  
  def digits
    self.split(/[#{delimiter}\n]/).map {|n| n.to_i }
  end
  
  def delimiter
    matches = self.match(%r{^//(.?)\n})
    matches.nil? ? ',' : matches[1]
  end
  
  def negatives
    digits.select {|d| d < 0 }
  end
  
  def raise_error_on_negative_numbers
    raise "Negatives not allowed: #{negatives.join(', ')}" unless negatives.empty?
  end
  
end