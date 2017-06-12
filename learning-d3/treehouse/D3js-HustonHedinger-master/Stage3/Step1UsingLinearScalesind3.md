# Stage 3 - Step 1, Using Linear Scales in d3.js

## Description
D3's built in scales are incredibly helpful for mapping data to a visual domain.  Scales are useful for layouts, coloring, and sizing of elements.  In this video you'll see how to use scales and prep them for use with axes.

## Script
Congratulations again on all you have accomplished so far!

Everything we did so far laid the ground work for what we are going to talk about moving forward.  You've already learned the hardest concepts in working with d3.  Now it is time to continue to build on those skills.

We left off with this amazing scatter plot.  
**Screen shot of scatterplot example from Stage 2**
Now, there is one big problem with this as a data visualization.  Sure, we could make it prettier.  We coule make things happen when you click the circles.  We could make it responsive and fit on a mobile device.  But, there is something more fundamental missing.  It does not convey any meaning or insight!  The main purpose of almost any visualization is to offer up an easier format or medium to interpret data.  Let's check out d3's scales and how they allow us to layout, size, and even color our data to give our visualizations rich meaning.

**begin screencast ./examples/LinearScales.html**    
As always, you can follow along in the workspaces.

I have the LinearScales.html file open, and here we have very similiar code to what you looked at in the last example.  The new stuff starts here with the yScale.  Remember we are setting up variables that don't depend on the data callback ahead of time.  In d3, scales are used to map a domain in your data, to a visual range.  The range can be a pixel position, size (like the `r` attribute of a circle), and even colors.  Here, we are setting up our scale for the y axis using the d3 linear scale.  You can think of these scales as classes that have different methods, as well as attributes.  Here we've explicitly said that the range is going go from height, to 0.  This means that the miniumum domain value we'll set in a few seconds will map to the height variable, and the maximum value will map to 0.  This may feel a little awkward.  However, remember that 0 is the top of the page, while height, would give you a position at the bottom of your visualization.  Setting up y scale in this slightly less intuitive way will save us a lot of mental judo down the road.

Now that we have the app set up and we are ready to jump into the callback and work with the data.

Here I have my yMax, and yMin functions ready to set the domain of the scale, based on the data.  Sometimes, you may get data that already has these kinds of stats calculated for you and sitting nicely with the data for you ready to use.  Realistically, you probably won't, and so it is helpful to use the d3.max and d3.min functions to find the minimum and maximum values of parameters in your data.  

In the yMax function, we are using d3.max to say, "For the data, we'd like to find the maximum value of the 'TMAX' value in each element."  Now make sure to use the JavaScript native 'parseInt' function here.  `element.TMAX` returns a string, and using d3.max with strings, will check the order (their index) that they appear in the array, rather than the value.  Using `parseInt` makes sure d3.max checks for the maximum numeric value across the data.  Another way to coerce a number from a string is to add a plus sign in front of the string.  e.g.:
```
+"100"
```
Just be careful.  Unlike parseInt, the + won't work if there is a non numeric character.  For instance:
```
+"100 degrees Fahrenheit"
```
Returns "NaN", where as:
```
parseInt("100 degrees Fahrenheit")
```
Returns 100.

Now using d3.min, we are doing the exact same thing, but to return, you guessed it, the minimum value across all of the data.  Let's just test these two values.  Ok, cool, we have yMin and yMax, and they look to be accurate.

We accomplished what we needed to, let's look at an even quicker way to do this.  

I am going to uncomment this code, and use the d3.extent method.  This is exactly the same as running d3.max and d3.min simultaneously.  If you have a large data set, it could have positive performance implications, since you are only iterating over the data once.

The accessors function looks exactly the same as our other code, and lets check out what we get back.  Awesome, it looks like the yDomain matches what we had calculated, and it is already in the format we can plug into our scales.

And, now lets do that by calling the dot domain method in the yScale and plugging in the variables we just calculated.  Keep in mind that if we were still using the min and max variables we could plug them into the scale like this:
```
yScale.domain([yMin, yMax]);
```

Now, the moment you've all been waiting for, lets actually use the scale!

Notice that we've gotten rid of a bunch of nasty code for the cy attribute.  And we've also eliminated the sizing of the circles based on the temperature, and the color of the circles based on year, in favor of layout and styles that will be much more meaningful.

And with an incredibly simplified set of code for the cy position, I use the scale to position the circles.  For cy, I take the "TMAX" of the data element, plug it into the yScale and get back a y pixel position.  Let's set our debugger and see this at work.  It gives me a pixel position of _____.

A final point about scales, is that they can also take an inverted value like the time formatter we created.  So, if pass a integer into `yScale.invert()`, the yScale takes this as a number in the domain and spits back the corresponding range value.  In other words, when I pass in a number that corresponds to vertical position, the invert method will give me back the temperature value that it is mapped to.  This can be incredibly useful for looking at mouse or touch events, and then back tracking to see which data applies to wherever the event took place on the svg.  

So, let's see what we did!  Awesome, there is an output that represents our data.  Let's jump right in next, where we can use scales to work with dates, and give these circles a meaningful x position!    
**end screencast**