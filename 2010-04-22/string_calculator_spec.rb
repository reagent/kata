require 'rubygems'
require 'spec'

require File.dirname(__FILE__) + '/string_calculator'

describe StringCalculator do
  
  it "returns zero when no numbers are supplied" do
    StringCalculator.add("").should == 0
  end
  
  it "returns the number as integer when a number is supplied" do
    StringCalculator.add("1").should == 1
  end
  
  it "adds 2 numbers together" do
    StringCalculator.add("1,2").should == 3
  end
  
  it "adds more than 2 numbers" do
    StringCalculator.add("1,2,3,4,5").should == 15
  end
  
  it "handles newlines between numbers" do
    StringCalculator.add("1,2\n3").should == 6
  end
  
  it "ignores newlines at the end of numbers" do
    StringCalculator.add("1,\n").should == 1
  end
  
  it "allows the specification of a new delimiter" do
    StringCalculator.add("//;\n1;2").should == 3
  end
  
  it "raises an exception when adding a negative number" do
    lambda { StringCalculator.add("-1,2") }.should raise_error("negatives not allowed -1")
  end
  
  it "raises an exception when adding multiple negative numbers" do
    lambda { StringCalculator.add("-1,3,-2") }.should raise_error("negatives not allowed -1 -2")
  end

  it "adds numbers equal to 1000" do
    StringCalculator.add("1,1000").should == 1001
  end
  
  it "ignores numbers larger than 1000" do
    StringCalculator.add("1,1001").should == 1
  end
  
  it "allows delimiters longer than 1 character" do
    StringCalculator.add("//**\n1**2").should == 3
  end
  
  it "allows multiple delimiters" do
    StringCalculator.add("//[*][%]\n1*2%3").should == 6
  end
  
  it "allows multiple delimiters with length greater than one" do
    StringCalculator.add("//[**][%%]\n1**2%%3").should == 6
  end
  
end