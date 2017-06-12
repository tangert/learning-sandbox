# Step 6 - Weather app walkthrough

## Description
This is a complete, line by line walk through of a (fake) d3 weather application!

## Script

You've come a long way with d3!

Let's see all of those skills at work, and take a look at our final app!

Like you might remember from earlier in the course, this app uses the same NOAA weather data we have been looking at.  You already saw the app working, so let's jump into the code!

**Screencast app walkthrough**
Starting from the top in the styles, our custom css is all below this comment.  

Some of the css here is not specifically for the visualization, but for the header.  But, some applies to the visualization.  Here I'd like to point out a fundamental design decision that you should make.  If you have a lot of colors and other styles changing dynamically in the visualization, then you should try to keep all of your styles as variables in the JavaScript.  This will make your life a lot easier!

For us, it is fine to style our app with css for the most part.  

This is because we have a relatively small app and really none of our styles are dynamically changing.

We are not going through the css in detail.  However, feel free to inspect the elements in your browser, and see how the styles are working.

Let's jump down to the HTML.  Here we've set up the graph to be contained within this div.  

Additionally, we've set up this placeholder "info" div to hold our color key.  The info section also holds the text that will display daily temperature and rainfall information.  For the most part, it is best and easiest to do this kind of work in HTML, rather than SVG.  SVG can do some pretty incredible things.  However, some of the easier things (like building a color key) bring in unnecessary overhead.

Jumping down to our JavaScript, we set up some global variables here at the top.  We'll use these variables to create an SVG within our "graph" div.  The important thing here is to give the svg a little bit more width and height than the width and height variables.  That is because these variables will be used through out the app, and will be relative to the inner group element.  The selection with the variable viz.

Moving down, we set up our two y scales and our x scale ahead of time.  At this point the temp scale and rain scale look identical, but that will change.  Next, we have our three axis.

On the xAxis, I'd like to point out how we use the d3 time formatter to display the month abbreviation followed be the year.  Check out the d3 documentation to see all of the possibilities for time formatting, as well as tick formatting.

The other thing I will point out is this nasty code we had to write to get the axis looking like it needs to.  Feel free to comment the code out to see the problems with the original way the scale was working.  Additionally, you can explore the string operations in the console to see what these methods are up to.  Big lesson here - you don't always get the data the way you want it.  So, the best thing to do is come up with a work around that doesn't leave your users thinking, "What's up?"

We'll get back to this line generator and the bisectDate function.  

These simply fill in our keys with the appropriate colors.  This could have been done with css, and is a good example of where things can go either way.

Jumping down into our callback, the first thing we do is apply the data domain to the scales that we have set up.  

To do this we use the d3 built ins to find min and max values like you have already seen earlier in the course.  Keep in mind that your accessor functions need to compare integers and not strings.

Additionally, in our data accessor function we use the createDate function.  By creating a date object, d3 will be able to compare native time objects.  This is exactly like we did earlier in the course.  

Now we apply the temperature and rain domain values.  Remeber that we want a little bit of padding on our axes to make them look nicer.  But for the x axis, we have to deal with time.  Feel free to throw your debugger in the function to better understand how we create a date one day earlier and later.  Also, take a look at the Mozilla documentation on JavaScript dates.

Here we use the xAxis to generate an axis.  When then use a sub-selection to select all of the text, and make things look how we need them to.

We create the svg for our two vertical axis in a very similiar way.  Notice that the temp axis is placed on the right by moving the axis the entire width of the visualization.

Now we are ready to create the main part of the visualization.  First, we are going to bind the data to 'g' elements in the dom.  We give these elements the variable name "bars" since they will be a vertical bar representing a range.  And we give them the class "bars" so that we can style them.  Each bar, receives an x position based on the date.  But pay attention here - the y position it receives is the "TMIN" value, which will be the bottom of the bar.

Now we are going to append an svg line element to each 'g' element in the bars selection.  The line is going to be vertical, so 'x1' and 'x2' are simply 0.  However, the y value is going to be the y position of the "TMAX" value.  But keep in mind that the origin is the x and y value of the parent "g" element.  For this reason, we are actually going to subtract the TMIN value from the TMAX pixel value.  It sounds really complicated.  As usual, throw your debugger in there and play around with what variable or function is doing what.

That was pretty much it for the bars!  So if we comment out the rest of the code, we'll see that our bars appear in the visualization!  Yay, awesome.

Moving down this rain line is not something we have covered.  We are not going to cover svg path elements in detail.  Check out the Mozilla docs if you are interested in learning more.  In the meantime, I'd like to point out two things about this block of code.  The first is that we are manually binding the data.  This will only have one path element, so we are actually binding all of the data to one element!  The second thing I want to point out, is that there is only one attribute we really care about wiht paths.  That is the magical "d" attribute.  Let's jump up and look at what the line generator needs from us in order to create this line.

The `d3.svg.line()` generator function works a lot like the axes generators we used.  You can see all of the possibilities in the d3 docs.  The biggest thing we care about are the dot x and dot y methods.  The line generator has access to the data we bound to the path.  So, we tell the generator that the x position is a function of the date at that data.  Then like normal, we use the xScale to compute that position in pixels.  The same exact thing is done for the dot y method.  The only difference is that here we take the "P-R-C-P" data for the precipitation.  Let's check out what this function does.  It generates this huge gnarly string of code.  Imagine if you had to do this by hand - ew.  But we don't, so we won't worry about it.  The only thing to rememeber is that paths work when you supply the proper coordinates to the 'd' attribute.

Here we add some labels to our axis.  Labels are awesome, and really stinking important for folks to make sense of your viz.  There is a lot more of the same here in creating these labels.  One thing that is kind of slick, is the way we got the degree celcius symbol.  Here we used what is called the unicode.  The browser reads this in the SVG and says, "ok I will display the degree celcius sign instead of u-2-1-0-3."  Check out the unicode resources in the teachers notes.

Now for the grand finally, our one interaction!  This is the cursor, and associated detail information in the info bar.

Calling the interaction is actually really simple.  Every time the mouse moves, do this function.  So let's take a look at the function.

The `d3.mouse(this)` is able to find the position of the mouse relative to the element where the event is being fired.  Pretty handy!!  Now, we are going to go backwards, and actually find out what date corresponds to the x position of the mouse.  Next, we convert the date object into a string that will match our original data.  Here's where things get crazy.  We use the "d3.bisect" method to quickly find the original data that matches the dateString we have.  We won't go into detail about how this method works, or the different parameters - but check out the docs!

The bisector returns the index of the data that corresponds to our x position.  We can then use this data to power the rest of the interaction.

We move the cursor to our current position.  Then, with this little bit of code, we actually check to make sure that the line exists.  This `selection.empty()` method is the built in way to check if a selection exists or not.  If the cursor doesn't exist, we create it.  

This strange looking bit of code here, is meant to display the data in a more accurate, palatable way for the user.  Remember that our data is coming to us as celcius degrees, but in tenths of degrees.  Let's take a look at that.  When I type it into the console, I get a value that is different than the one I want to show users.  So again, I will let you play with the variables and methods in your browser to see how things are working.  All this code here is doing is adding a decimal point as the second to last character.  Now using these variables, I create this string that gets displayed on the info bar.  The string tells me the rain fall, and the high and low temperature on a given day.  The other thing we did with the date, was create a new d3 time formatter. This formatter spits out a much easier to read date format.

That's it, that's the whole app in a nut shell!
**end screencast**

Congratulations on making it to the end of the course!  You've learned tons about d3.  You should have the confidence to build your own application.  If you don't keep in mind that mastering d3 is a journey, and diving into all of the examples out there is what is going to propel you forward from here.  Bl.ocks, open source libraries, etc. that deal with d3, will all be within striking distance of your new skillset!

Let's wrap up with a code challenge.  Again, congrats!

## Teacher's Notes
Tick Formatting for Axis: https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_tickFormat
Time Formatting in d3: https://github.com/mbostock/d3/wiki/Time-Formatting
Why you have to compare integers and not strings: http://stackoverflow.com/questions/10863092/why-is-string-11-less-than-string-3
Dates in Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
Mozilla svg path element tutorial: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
`d3.svg.line` docs: https://github.com/mbostock/d3/wiki/SVG-Shapes#line
Read this: http://www.joelonsoftware.com/articles/Unicode.html
All unicode characters on one page!: http://unicode-table.com/
`d3.mouse`: https://github.com/mbostock/d3/wiki/Selections#d3_mouse
`d3.bisect`: https://github.com/mbostock/d3/wiki/Arrays#d3_bisect
