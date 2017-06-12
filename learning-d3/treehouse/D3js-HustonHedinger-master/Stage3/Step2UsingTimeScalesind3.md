# Stage 3 - Step 2, Using Time Scales in d3.js

## Description
Another great thing about d3's scales, is that you can use them with time data just as easily as integer values!  In this video, we'll take a look at how to prep our time data for our x axis!

## Script
Almost as easily as d3 scales handle numbers, d3 can handle dates!  Let's look at how we can set up a scale to map date objects to corresponding positions along the x axis.

**begin screencast ./examples/TimeScales.html**    
In order to work with time, we are going to use something d3 offers out of the box, the d3 time scale.  The time scale is simply an extension of the linear scale that you saw in the last step, however the domain inputs are JavaScript date objects.  What this means is that we can easily map the DATE values from our data to x positions!  Here we'll map the earliest positions in our visualization to 0 pixels, and the max values to the width of the visualization.

There is one more step we need to take before we use the time in our date, and that is to transform the time strings in our data, into JavaScript date objects.  Again, d3 has some amazingly cool built ins to help us handle time.  JavaScript expects that you either know the native methods really well, OR that you are passing around neat date objects all over your code and that is also what you receive from the database. Meanwhile, d3 says, "hey, you.  You are a human, lets give you some tools to easily turn any format into a date object."  That is especially helpful to us, since with our data set we are getting the time in a clean format, even if it is not a data object.

Using the d3 dot timeformat generator, the parameter I pass in uses specifiers to indicate the format that I can expect from my data.  For us, we know that we are going to get a string that is precisely 8 digits long.  The first four digits are the year, the next two are the month, and the last two are the day of the month.  So, we simply use %Y%m%d to illustrate this format.  

Once we have this formatter, let's see how to use it.  Let's use a more current date, and pass it in to the formatter with `parseTime.parse("20150101")`.  Awesome, looks like the formatter gave me back the date object.

If our data was an 8 digit string, but month came first, for example:
```
01011974
```
for January, 1st, 1974.  We would use:
```

d3.time.format("%m%d%Y");
```
If our dates came in the format Year hyphen month hyphen day:
```
1974-01-01
```
We could do this:
```
d3.time.format("%Y-%m-%d");
```
The possibilities of how dates could be provided to you, and therefore how you would format them, are literally limitless with there being many possibilities outside of Year, month, and date specifiers.  You can check out all of the specifiers in the docs.  Links are in the teacher's notes.

The cool thing about d3's min and max methods are that they can handle dates!  We are actually going to skip the d3.min and d3.max functions and accomplish essentially the same thing with d3.extent.  Here I am going to again use an accessor function, but this time I am going to check for the "DATE" on the data element.  Now in the call back, I am going to use the parseTime function we already set up, and I am going to use the dot parse method to turning the strings into dates before evaluating the min or max value.  Let's throw the debugger in there real quick to see all of the work being done.  

 My element is the current data element, and the DATE value, is the string that we set up the time formatter to format.  So when I run `parseTime.parse(element.DATE)` I get back a JavaScript date object.

 I also want to quickly point out that you can go backwards with the time formatter, which can be quite useful.  In the console lets set up a variable called "now" which is simply the current date time.  Now, lets do `parseTime(now)`.  What we get back is the formatted representation of the current date, which would be useful to put back into our data.

Let's check on our xDomain values.  Looks good!  The min value is August 1st, 1973 and the max value is December 31st, 1974.  Awesome!


For cx, I take the DATE of the data, plug it into the scale and get back an x position.  Let's set our debugger and see this at work.  It gives me 0, makes sense, it is the earliest date.  Let's fast forward a bit.  Awesome now I get a pixel position that represents a real output.

A final point about time scales, is that they can also take an inverted value like the linear scale, and similiar to the time formatter we just used.  So, if pass a integer into `xScale.invert()`, it is going to give me back a date object.  This can be incredibly useful for looking at mouse or touch events, and then back tracking to see which data applies to wherever the even took place on the svg.  Let's try it, with a number outside of our range.  Let's do "width times 10", and looks like we get a date object all in 1987 in the month of September.

Now, one challenge is we still don't know if our data is accurately represented visually.  There are a few approaches you can take here - you can manually examine the dom elements to see if they have the correct data.  You can label the circles with text that reveal what the data point is.  I find that the simplest approach is to provide axis, then we can immediately see (as can your users) if the data is lining up correctly.  

Next we'll see exactly how to create axis from our scales!

**end screencast**

## Teacher's Notes
d3 time formatting documentation: https://github.com/mbostock/d3/wiki/Time-Formatting#format