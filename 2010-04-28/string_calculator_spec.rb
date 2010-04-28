require 'rubygems'
require 'spec'
require File.dirname(__FILE__) + "/string_calculator"

describe StringCalculator do
  
  before { String.send(:include, StringCalculator) }
  
  it "returns 0 for an empty string" do
    "".add.should == 0
  end
  
  it "returns the number as integer when given one number" do
    "1".add.should == 1
  end
  
  it "can add 2 numbers together" do
    "1,2".add.should == 3
  end
  
  it "can add more than 2 numbers together" do
    "1,2,3".add.should == 6
  end
  
  it "treats newlines as delimiters between numbers" do
    "1\n2".add.should == 3
  end
  
  it "handles newlines mixed with delimiters" do
    "1,2\n3".add.should == 6
  end
  
  it "ignores trailing newlines and delimiters" do
    "1,2,\n".add.should == 3
  end
  
  it "allows the specification of a different delimiter" do
    "//;\n1;2".add.should == 3
  end
  
  it "raises an exception when given a negative number" do
    lambda { "-1".add }.should raise_error
  end
  
  it "reports the negative number when an error is raised" do
    lambda { "-1".add }.should raise_error("Negatives not allowed: -1")
  end
  
  it "reports on multiple negative numbers in the error message" do
    lambda { "-1,2,-3".add }.should raise_error("Negatives not allowed: -1, -3")
  end
  
  it "should ignore numbers greater than 1000" do
    "1001".add.should == 0
  end
  
  it "should handle adding numbers 1000 or less" do
    "1,1000".add.should == 1001
  end
  
  it "should allow delimiters of any length" do
    "//**\n1**2".add.should == 3
  end
  
  it "should allow multiple delimiters" do
    "//[*][%]\n1*2%3".add.should == 6
  end
  
  it "should allow multiple delimiters with a length greater than one character" do
    "//[**][%%]\n1**2%%3".add.should == 6
  end
  
end