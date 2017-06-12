# Stage 3 - Step 5, Using the SVG Group Element

## Description
The SVG group element is essential in structuring your code and application so that you have to write minimal JavaScript and styles.  Here you'll learn how to use the 'g' element to simplify your code.

## Script
You've actually already seen the SVG group element at work!

In our visualization, **screenshot of g element highlighted in main app's dev tools** we are already using it to hold all of the elements of the svg, and create some padding with the parent "svg" element.  Here, we are already seeing the primary utility for the "g" element at work.  By grouping svg elements together within a "g" element, positioning, styles, and other attributes applied to the g element are passed down to the children of the svg.  As usual, check out the Mozilla documentation for the "g" element to see some of the nuance.  There is a link below in the teacher's notes.

Now, we are going to use the g element to create a group for each of the points in our scatter plot. In addition to the g element that holds almost everything in side the svg, we are going to use a bunch of smaller g elements to hold our axis and scatter plot points.  This will allow us to apply positioning, and later events, to the group elements instead of repeating ourselves and writing code for each element we want to move independently.

**Begin screencast g.html**    
Building on the example application you are becoming very familiar with lets jump right down to where our "circles" used to live and check out all of the changes.

Perhaps the biggest change is that we are now binding the data to the g elements, rather than to the circles themselves.  Using the data binding pattern that was already introduced, we bring the 'g' elements into our visualization, and we give all of them the class 'dots'.  

One of the things that may seem strange about svg, is all of the different attributes for position for the different elements.  For the g element, we now position the element by using the "tranform" attribute and then giving it a "translate" x and y parameter.  

Notice here that the logic to get the x and y parameters is exactly the same as how we got the x and y parameters when we were positioning the circle elements directly using the "cx" and "cy" attributes.  The difference here is that the "translate" value is being passed in as one long string, and as such the x and y values are not directly accessible.  This is generalizable as one long string "translate(x,y)" which is given to the transform attribute.

We can now apply styles directly to the g element, like we are doing with stroke and fill here.

Now in order to draw something we still need to get "circle" elements into the visualization.  We do this by appending them to the dots selection, and then giving the circles a radius of 5.

Now using the g element we are also going to add text captions.  We do this by appending the 'text' element to the dots.  We are going to give the value of the text element the same value that is positioning the group along the y axis.

And lets take a look at the visualization now - awesome, it looked like it worked.

And let's take a quick look at the g element in the inspector itself.  Here we see that the g has styles and the transform attribute just like we expect.  And then it has two sub elements a circle and a text element, also like we expected!

The problem is that now we have a cluttered visualization, with a bunch of random captions hanging around.  Instead of appending all of the text at once, these should come in as interactions.  Good thing that is what we will take a look at next!   
**end screencast**

## Teacher's Notes
SVG 'g' Element - https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g

