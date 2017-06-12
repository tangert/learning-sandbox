# Step 4 - Registering conflicting event listeners

## Description
JavaScript is beautiful, but registering multiple events in the browser's HTML tree presents some challenges common to any application.  In this video, check out some of the ways that you can work around these challenges.

## Script
We have been diving deep into d3, and you've made a lot of progress.  

**Sidebar**    
Really quick, give yourself a pat on the back.    
**endsidebar**

Now we are going to go over a common scenario.  What do you do with your interactions, when they both require very similar events?  For instance, a mouse down event in the browser, may be the beginning to a zoom even on the svg or drag event on an individual element.  Let's take a look at how we'd tackle this!

**screencast stopPropagation.html**     
Just like with the zoom and pan behavior, we are going to use a d3 built in.  

We set up the behavior in the same pattern you are now used to, before the callback.  `circleDrag = d3.behavior.drag;`.  From the d3 documentation, we know that we have access to 3 events - "dragstart", "drag", and "dragend".

"dragstart", you guessed it, fires when the drag gesture is initiated by the user.  

"drag" occurs throughout the gesture as long as the user holds the mouse down and continues the drag.

There is a third event, called "dragend".  We are not using it here, but there are a lot of times where it is valuable.  For instance, in starting a chain of new interactions after the drag ends.

Moving down, lets tie the behavior to the dots.  Remember, the dots variable represents the d3 selection of the `g` elements.  

The way we bind the behavior to the dots, is elegant and simple.  With the dot call method.  Remember, `dots.call(circleDrag)` is exactly the same as running `circleDrag(dots)`.  Because of d3's method chaining convention, I find using the dot call method to be the best approach.  

Feel free to go whichever direction you'd like!

Now, let's check out where the real work is being done.  Here are the functions we created for the "dragstart" and "drag" events.

One one of the things we do when the drag starts, is we use the stopPropogation method on the event.  This is one of those times where what is happening is exactly what it sounds like is happening!!  

Remember the drag started because the user "mouseddown".  Now unfortunately, our application does not know the difference between if the mousedown was for the svg to be panned, as in our zoom behavior.  Or, if the mousedown was actually meant to start the drag in the mouse behavior, like we want it to.  

This is called "bubbling up" and dealing with it is a common pattern in JavaScript!  Basically, the click is passed to the element that was clicked, and then bubbles up to every element higher in the DOM tree.  By DOM tree we mean these nested HTML elements.

The good news is that the stopPropogation method is an easy way to stop this bubbling up behavior.  

We are now going to select the element that was clicked, and then subselect the circle.  We are giving the circle a fill of red.  Take note that there is no code to remove the red fill.  That means that once a circle has been dragged it will remain red!  This could be good or bad.  It really depends on what you are building.

Now if you remember, our "dragged" function fires as the user is holding the mousedown and moving it.  So in our drag function, we are going to actually change the "transform" attribute of the g element to match where the mouse is being dragged.  

Now let's throw the debugger in here, and look at one more thing.

Notice that we have access to the datum, which is called "d" here.

Let's actually store the x and y positions in the data by simply assigning them here. `d.x = d3.event.x` and `d.y = d3.event.y`.

Awesome!  Now you have access to that data for use in your application.  Let's do something more, which is getting pret-ty cra-zy.  Let's actually change the data itself based on what interaction the user has done.  

We can accomplish this pretty easily.  We are going to use our xScale to find the date that corresponds with where ever the user has dragged the element.  Now we use our good ole d3 time formatter to turn the date object into a string.  Why, because this is the way that our backend team is expecting it.  No, I don't have a better reason.

Now I do the same exact thing for the y position, and I spit out a corresponding "TMAX" value.

Finally, lets log the changed values so that we can see this all at work!

Let's inspect these here.  Looks like the values have changed - great!     
**end screencast**

You guys have come a long way!  Congratulations!  Next, we are going to take a look at our completed weather app.  The weather app is going to have a few differences, most importantly it just looks really good!  

## Teacher's Notes
d3.behavior.drag: https://github.com/mbostock/d3/wiki/Drag-Behavior
SO question on "bubbling up" pattern in JavaScript: http://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing
