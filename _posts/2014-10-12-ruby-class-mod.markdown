---
layout: post
title:  "Modifying existing classes in ruby"
date:   2014-10-12 09:00:00
categories: programming
icon: fas fa-gem
tags:
- learning
- ruby
- coding
- monkey patching
- wtf
---

I'm currently refreshing my ruby skills as it's not something I've looked at for a while (I primarily work with php and javascript).
One of the features that I always find interesting in ruby is the ability to open up an existing class and modify it.
For example in one of the programming exercises I was doing I needed to apply a regex to each line of a file.
I wanted to include the line number of any matches but the grep method in the File class didn't provide for this. So:

``` Ruby
class File

  def grep_with_line_number (pattern, &block)
    # This bit filters with the pattern but has the index
    lines = enum_for(:each_with_index).select do |line,|
      line =~ pattern
    end

    # grep executes a block, so this method should too
    if block_given?
      lines.each do |line, number|
        block.call(line, number)
      end
    end

    lines
  end

end
```

This is cool I can now trivially find matching lines with:

``` Ruby
File.open('blah.txt', 'r') do|input_file|
  input_file.grep_with_line_number /Steve/i do |line, line_number|
    puts "line #{line_number + 1}   ===>  #{line}"
  end
end
```

This means we can monkey patch ruby with basically anything we want.
From a code maintenance point of view I'm not sure I'd want to do this on any large project but it's a nice feature to have for smaller things.
As always though with this much power comes great responsibility:

``` Ruby
class Fixnum
  def ==(other)
    other < self
  end

  def +(numeric)
    self
  end
end

puts 1 == 1 # false
puts 2 == 1 # true
puts 1 + 2 # 1
puts 1 + 3 # 1
```

Yup. This is a thing. Bye bye maths!