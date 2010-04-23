require 'rubygems'
require 'spec'

require File.dirname(__FILE__) + '/string_calculator'

describe String do
  
  it "returns 0 when no numbers are supplied" do
    "".add.should == 0
  end
  
  it "returns the number as integer" do
    "1".add.should == 1
  end
  
  it "returns the sum of 2 numbers" do
    "1,2".add.should == 3
  end
  
  it "returns the sum of 3 numbers" do
    "1,2,3".add.should == 6
  end
  
  it "treats newlines as a delimiter" do
    "1\n2".add.should == 3
  end
  
  it "handles a mix between newlines and commas as delimiters" do
    "1,2\n3".add.should == 6
  end
  
  it "allows the specification of an alternate delimiter" do
    "//;\n1;2".add.should == 3
  end
  
  it "raises an exception when given a negative number" do
    lambda { "-1".add }.should raise_error
  end
  
  it "includes the negative number in the error report" do
    lambda { "-1".add }.should raise_error("Negatives not allowed: -1")
  end
  
  it "includes multiple negative numbers in the error report if found" do
    lambda { "-1,1,-2".add }.should raise_error("Negatives not allowed: -1, -2")
  end
  
end