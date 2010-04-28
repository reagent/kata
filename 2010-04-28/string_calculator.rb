module StringCalculator
  
  def add
    ensure_no_negative_numbers
    allowed_digits.inject(0) {|sum, integer| sum + integer }
  end
  
  def allowed_digits
    digits.select {|d| d <= 1000 }
  end
  
  def digits
    split(/[#{Regexp.escape(delimiter)}\n]/).map {|number| number.to_i }
  end
  
  def negatives
    digits.select {|d| d < 0 }
  end
  
  def delimiter
    matches = match(%r{^//([^\n]+)\n})
    matches.nil? ? ',' : matches[1]
  end
  
  def ensure_no_negative_numbers
    raise "Negatives not allowed: #{negatives.join(', ')}" if negatives.any?
  end
  
end