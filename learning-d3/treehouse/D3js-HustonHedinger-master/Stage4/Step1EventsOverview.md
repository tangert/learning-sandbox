# Stage 4 - Step 1, Adding Event Listeners to a d3 Selection

## Description
Making visualizations interactive adds an entirely different dimension, and opens up a new realm of possibilities for your app.  In this video, you'll learn the fundamentals for adding almost any type of interaction to your app.

## Script
d3 offers some really nifty built in behaviors to handle certain interactions.  We are going to look at the zoom behavior a bit later.  In addition to the the behavior that handles zooming, d3 allows you to add basically any event listener supported in your browser, directly to a selection.  And, yes, the incredible thing about this is that you can use the data bound to that element to make the interaction different based on the data itself!

Let's take a look at how to add interactions to our selections.

**Begin interactions.html screencast**    
Going through the same exact code you have already seen, lets move down to where we append the text to the svg group element.  Here we are going to make a minor change by adding the display none style to the text itself.  What this means is that the text elements will still exist, but by default thei will be invisible to the user.

Now, we are going to change the style of the text, when we mouseover the dot.  We do this by using the selection's "on" method to add an event.  In this case we can use the "mouseenter" or "mouseover" event type.  

The second parameter in the on method is the event listener function that can do just about anything in your application.  In this case, we are simply going to display the text.  The listener has access to the datum of the current element as well as the index of the data.  Both can be used in the interaction, and are incredibly powerful.

You also have access to the d3.event global, which can tell you usefule information like the x and y position of the event, if the ctrl key was used, and even if there was any data stored to the clipboard.

Additionally, the "this" context of the event listener is simply the html element that contains the listener.  Using "this" we can turn the element into a d3 selection.  `d3.select(this)`.  Now that we have the dot, or the 'g' element as a selection.  We can use a subselection to select the text.  We will give this sub selection a display style of block.  And let's take a look at how this works.
Awesome, we are now getting the data we expect, but what if we want to remove it?    
**transition to next screencast**    
**begin interactions2.html screencast**    
We can easily do this by adding a second event listener on the "dots".  In this case we will add a "mouseleave" event, and then we will basically do the exact opposite of what we did on mouseenter.  We are going to again select the text of the current element, with slightly different syntax.  Then we are going to restore the display, none style property to make the text dissapear.  Now, let's take a look to make sure it worked.  Awesome.    
**end screencast interactions2 screencast**
<!-- 3:09 -->

Here we took a fairly complicated approach to making text appear and dissapear.  This could have been solved a few other ways.  Some of these ways are mentioned in the stackoverflow question that you can find from the Teacher's Notes. It can even be solved with pure css styling.  

Let's take a look at a slightly more complex interaction.  Now we are going to change the radius of the circles based on the data coming from a mouse interaction.  Additionally, we get to see how we set up a scale for something other the x and y 
coordinates.

**begin interactions3.html**    
The first the we are going to do is set up the scale for the radius of the circles.  This is going to be a linear scale.  Here, instead of the range being the maximum and minimum x or y coordinates, the range is actually going to be the smallest and largest that we want our circles to be.  I can set these to variables of course, but here I am just going to turn them into constants, 5 and 50.  

We've also set a variable for the default radius here which is actually smaller than the radius that any of the circles will receive in our interactions.

One if the not so obvious reasons that we need to use a scale here, as that our data points don't map directly to a valid value for the circle r attribute.  Notice that several of the "TMAX" data points are actually negative values.  

One of the less obvious things about the way that we calculate the circle radius is a much finer point.  We actually consider our data to represent the area of the circle, rather than the radius of the circle.  So, we create a simple equation to solve for the radius of the circle based on the TMAX data.  Even though it is high school math, it may seem a little complicated, so lets walk through it.  Basically, I know that the area of the circle is going to be the absolute value of the TMAX data point.  We have to use the JavaScript built in Math.abs, since we have negative values.  Now, here's the math.  The radius is going to be the square root of the area of the circle divided by pi, and I am using JavaScript built ins to help me here.

Moving down, I am going to use this equation as I create the domain for the rScale in the same way that we would for other scales.  And then, I am going to use this equation in the actual interaction.

Just like when I toggled the display value on the text, I make a subselection in the even listener of the circle.  Here I am going to use the solve for r equation, as well as the rScale to calculate the radius of the circle.  Let's take a look at it in action.

Awesome, it looks like it is working!    
**end interactions3.html screencast**

**begin interactions3.html picture in picture**     
One other thing to take note of is that the area of the circles actually gets bigger the farther the negative temperatures are from "0".  This is of course because you can't solve the radius for the area of a negative value.  More generally, "area" and size of a circle, may not be the best way to actually represent this data.  Or, if we were stuck on using this method, we could change the domain of the scale to start at the smallest negative number.  This would be much more accurate than starting the scale at 0, like we did in our code.    
**end interactions3.html picture in picture**    

In any case, this should have been a useful demonstration of how basic interactions can change the visualization dramatically.

Moving forward we are going to take a look at how zoom and pan can add dramatic effects to your visualization.  Additionally, zoom and pan can extend the granularity of the data that you show the user.

## Teacher's Notes
The d3.selection.on documentation: https://github.com/mbostock/d3/wiki/Selections#on
The Mozilla documentation for event listeners: https://developer.mozilla.org/en-US/docs/Web/Events
d3.event documentation: https://github.com/mbostock/d3/wiki/Selections#d3_event
Other ways to add captions to SVG elements: http://stackoverflow.com/questions/10805184/d3-show-data-on-mouseover-of-circle