require 'rubygems'
require 'spec'

require File.dirname(__FILE__) + "/string_calculator"

describe String, "when adding" do
  
  it "returns 0 when given no numbers" do
    "".add.should == 0
  end
  
  it "adds 1 number" do
    "1".add.should == 1
  end
  
  it "adds 2 numbers" do
    "1,2".add.should == 3
  end
  
  it "adds more than 2 numbers" do
    "1,2,3,4".add.should == 10
  end
  
  it "recognizes a newline as a delimiter" do
    "1\n2,3".add.should == 6
  end
  
  it "ignores invalid delimiter sequences" do
    "1,\n".add.should == 1
  end
  
  it "allows the user to specify his own delimiter" do
    "//;\n1;2".add.should == 3
  end
  
  it "should throw an exception when given a negative number" do
    lambda { "-1".add }.should raise_error
  end
  
  it "should include the number in the exception when given a negative" do
    lambda { "-1".add }.should raise_error("Negatives not allowed: -1")
  end
  
  it "should report on multiple negative numbers" do
    lambda { "-1,1,-2".add }.should raise_error("Negatives not allowed: -1, -2")
  end
  
  it "should ignore numbers greater than 1000" do
    "1,1001".add.should == 1
  end
  
  it "should allow multi-character delimiters" do
    "//[**]\n1**2".add.should == 3
  end
  
  it "should allow multiple delimiters" do
    "//[**][%%]\n1**2%%3".add.should == 6
  end
  
end