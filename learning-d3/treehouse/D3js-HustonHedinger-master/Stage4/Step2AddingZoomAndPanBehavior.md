# Step 2 - Adding Zoom and Pan Behavior

## Description
Zoom and pan interactions can be an incredibly powerful way for users to explore the data in your application.  D3's built in behavior makes it fairly easy to add zooming and panning to your viz, in what would other wise require a lot of overhead and extra code on your part.

## Script
d3 actually makes adding zoom and pan behavior fairly straightforward.  However, keep in mind that how d3 is working with the SVG, may be very confusing at first.  Let's take a look at how to add zoom and pan our application.

**begin zoompan.html screencast**    
In order to add zoom and pan, we are going to use the d3 'zoom' behavior.  One of the key things to understand about using the zoom behavior is that the behavior itself is used by the containing svg element. The event data collected by the behavior is then applied to the elements within the svg.  This will become obvious in just a minute. 

First we create the zoom behavior, which is another "generator" type function, that is also an objects with methods and parameters.  The only parameter we are going to use is the scaleExtent parameter which is going to limit how far in and out we can zoom.  Also, as you might notice, we tell the behavior that when there is an event of type "zoom" the "zoomed" function should run.  We'll take a look at that function in just a couple of moments.  What you should notice here, is that the event listener you apply doesn't actually have to be "zoom".  It could be "click", "dblclick" or any other event that a browser or mobile device is capable of listening for.  

Now we are going to rename a couple of variables to accommodate the zoom behavior.  The containing svg is actually where zoom events are going to register and store data to the d3 events globals and apply whatever zoom function we define.  So we rename this to svg, and then we call the zoom behavior.  Additionally, we rename the viz variable where we broke the original chain up.

Now let's throw the debugger in the "zoomed" function to see what is going on as the zoom behavior works.  I will use my mousewheel to zoom, and now I see that the d3 zoom behavior has registered data to the "d3.event" global.  There is all sorts of rich interactions we could do with the "d3.event.sourceEvent" data.  The source event is a mouseWheel prototype.  It would allow you to create different interactions based on all sort of other variables such as if the control key was held, and others as we already discussed.  Additionally, if an event type other than "zoom" had been used, the event data registered would have different and potentially more information.

The two things that we are going to pay attention to are the "event.translate" and "event.scale".  The translate is an array which stores that position of the cursor during the mouse event.  This allows our zoom in to be specific to where the mouse cursor is at that point.  It also allows registration of the pan behavior.

The scale data tells the svg how "low" or "high" to zoom in.  The number returned by the event.scale is bounded by the "scaleExtent" parameter we already added to the behavior.

Let's again take a look at our visualization.  This is great, because it allows us to get very granular with the data.    
**end screencast**

Again, this may not be the perfect use case for a zoom and pan interaction, however you now have the power to add it to your visualizations!  Next, we'll take a look at how to use other event handlers, with zoom and pan.

## Teacher's Notes
d3 Zoom Behavior: https://github.com/mbostock/d3/wiki/Zoom-Behavior
The Mozilla documentation for event listeners: https://developer.mozilla.org/en-US/docs/Web/Events