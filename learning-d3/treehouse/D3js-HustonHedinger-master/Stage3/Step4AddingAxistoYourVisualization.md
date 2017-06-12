# Stage 3 - Step 4, Adding axis to your visualization

## Description
Axes are a standard way to articulate spatial meaning in a chart.  However, creating axes from scratch would be really challenging!  The good news is that d3 has built in axis generators that allow you to create beautiful axes for your visualization in just a few lines of code.

## Script
Axis are incredibly important in almost any visualizations since axis are what give rich meaning to the most important aspect of your visualization - the layout.  Where the different components of your visualizations layout in space is the key to conveying the overall meaning of the data you are representing.

In our case, the x and y coordinates correspond to time and temperature respectively.  Giving users the ability to quickly interpret one of the dots in our scatter plot, is super important for us.

So let's take a look at how we do that in the context of our small but growing application.

**Begin Axis screencast**    
Here we have basically our same application.  However, take note that we've actually added a horizontal and vertical offset to the man 'g' element using our padding variable.  The axis simply won't layout correctly without this extra space, and this will become more clear in a couple of minutes.

The other thing we are going to set up outside of the callback is the axes themselves using the d3 built in.  As usual the d3 built in is a generator type function that has a number of potential examples associated.  Here for the x axis we simply pass in the xScale in to the scale function, and then we give the orient function the "bottom" parameter.  This tells the generator that the tick marks and labels for the axis should be oriented toward the bottom of the axis, as you'd want them when you are positioning the axis at the bottom of the visualization.

Additionally, we are going to limit the number of ticks to 8, in order to make sure that the axis is not cluttered with too many labels.

Jumping down to the yAxis, it looks really similar.  We are using the yScale as the scale for the axis and we are going to position the ticks and labels on the left.  Additionally, we are going to give it 20 ticks since we have a little bit more room on the y axis.  

Let's look into the callback.

We have the exact same code as before up until this point.

Now what we are going to do is actually make use of the x and y axes we've created with d3.  If you look at the xAxis in the console we git this big scary function, which again you can think of as a kind of generator.  In this case, the generator will be used by an svg group element to create the actual svg scale. 

In the code we are going to append an svg g element to the viz and we are going to define it's class attribute.  Additionally, we are going to position it at the bootom of the visualization using the transform attribute, and giving it a translate y position of to the bottom of the visualization using our height variable.  And now we are going to use the .call method on the selection to invoke the xAxis generator.  
On a side note,
```
viz.append('g').call(xAxis);
``` 
similiar to in our code, is actually exactly the same as this
```
xAxis(viz.append('g'));
```
The second way, is clearly much more elegant.

Now we are going to do exactly the same thing for the y axis, only we don't need to move it any where since we are positioning at its relative origin within the viz variable's 'g' element.

Now let's look at what we have.

Wow, we've got two axis, and our visualization, while not fantastically pretty yet, is starting to take on some meaning.

By quickly inspecting the axis html itself, we can see just how much work d3 took care of for us.    
**end screencast**

Keep an eye out in the rest of the examples and in the final application for this course as we will continue to fine tune the axes that may not be pointed out explicitly.  For now, let's look at two ways we can make these two axes a bit more useful.

**Begin screencast Axis2**    
One way to get a lot more "room" on the axis is to slightly rotate the labels.  I personally like this aestic as well, since the axis is demarcating space that moves across the visualization horizontally.

The way we do this is by altering the 'text' elements directly in the x axis.  The "transform" "rotate" attribute is going to do the most work here.  "rotate" is like "translate", except obviously here instead of moving the element along the x and y axis we rotate it around its relative origin.  Additionally, we alter some other attributes in order to get the label positioned how we want it.  Check out the Mozilla SVG documentation if you'd like to see more of what these attributes alter in the svg.  The link is below in the presenter notes.

Another thing I like to do on most visualizations, is give the visualization a "buffer", based on the data that is coming in.  There are more sophisticated ways to do this, but I find that this approach is a quick way to get the job done.  All we do is simply multiply the minimums and maximums of the domain by a constant to get a "longer" axis.  Let's look at the y axis first since it is more straight forward.

I can simply multiply the element in the accessor function.  So we'll multiply the elements by "1.1" which will give us a slight buffer around the minimum and maximum values.  Notice that it is not a perfect method since the constant multiplier produces a much larger overall value than we need for the max.  There is all sorts of logic you could implement to get these "buffers" where you want them, this is the quickest and easiest, even if it is not perfect.

For the x axis, things are a little bit more tricky since we are dealing with time.  

We are going to use the "parseTime" function that we already created with d3's time formatter.  From here, the "time" variable, is a JavaScript date object and we are going to use the "getMonth" and "setMonth" methods.  

For the minimum value, we are simply going to take the value of the month, and go one month backwards.  For the d3 max function we are going to go one month forward by adding 1 to the value of "time.getMonth()".    
**end screencast**    

As you can see, the axis add a ton of value to the visualization by creating a context for the data.  We'll now take a look at how to label the individual data points to give even more meaning and granularity to the information.

# Presenter Notes 
Mozilla Documentation for the SVG Text Element - https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text
Mozilla Documentation for 



