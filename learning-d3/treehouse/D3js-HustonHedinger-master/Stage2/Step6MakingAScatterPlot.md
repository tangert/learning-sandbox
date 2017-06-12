# Stage 2 - Step 6 - Making a Scatter Plot

## Description
In this video you'll learn how to make the visualization respond to the data that you've bound.

## Script
Now that you understand how we can create elements based off of data, lets take a look at how you can work with the data to alter the elements.

**Start screen cast ./examples/ScatterPlot.html**     
We are going to run through the short application below, and as a reminder, you can follow along with Workspaces.

Here we have basically the same set up as the data binding example, except we are going to set up a couple more global variables.  For basic applications, and quick prototypes, I look to manually set the height and width of the svg.  Also, we can set a "padding" variable to 50.  Just like "padding" in css, we will use later to make sure that the center of each circle is at least 50 pixels from the edge of the svg.

Now we use these height and width variables on the height and width attributes of the svg we've created.  And we can see where the debugger is stopped here right at the beginning of the script tag.  So, if I go to the HTML, everything we've executed to this point is good to go.  Let's set our next break point where we left off in the last example, setting the "r" or radius attribute of the circle to the absolute value of the TMAX data divided by a factor of 10.

I want to point out a couple of things about this pattern.  One, is that when you are binding more complex data, it can be challenging to remember which objects are where, especially if some of your app is failing because of undefined or null values.  The easiest way to debug is to simply break the function on to a second line, and throw your debugger in there.  I am going to do that right now and refresh the page.  Now when I do this, you can see that my debugger stops when this function is getting called, and I can access the "d" variable directly.  This is super helpful when I am exploring what is going on.  

The second thing I want to reiterate is this function of "d" callback, that is then used to set the 'r' attribute.  This is d3's way of giving you access to the bound data.  It is really slick to be able to write a few lines of code, that will then apply an attribute or style based on the data for each element.  Another aspect of this callback is the optional second parameter, which is the index value of the data that was bound to this element.  By convention, the datum for that element is given the variable "d", while the index value is given the variable "i".  This is incredibly useful and powerful, since the "i" value for a DOM element's datum will allow you to look up the data element in the originally bound data.  In other words, the "i" won't change, even of the order of the element changes in the document tree.  We will see some ways to use the index value later in the course.

Let's go ahead and uncomment the next line, which is another attribute method.  Here we are operating on the "cx" attribute for the circle, which will position the center of the circle along the x axis starting from 0 at the far left.  This nasty little return clause is straightforward after you see it a few hundred times.  What we are saying is give me the maximum value out of 0 plus our padding, the farthest left we want to go, and, some random value which will be at maximum 50 pixels less than the width of the svg.  Feel free to type in the functions in your console to explore what they are doing.  

One other thing to point out, is that we don't actually need parameters in the callback, if we are not going to use the data, so I can even remove the "d" altogether.  I do need to leave the function call there, because look what happens if I don't, d3 sets a random x position, but for all of the circles at once.  I can see this by refreshing the page repeatedly.  The function call lets d3 know that I want to run it for each element, so lets put it back in.

Now, lets do virtually the same exact thing for the "cy" attribute, giving each circle a different vertical position with a minimum value from the top of the svg at position 0 plus padding, to the bottom of the svg at position height minus padding.

Awesome, looks like it worked, and we have a very ugly visualization.  So let's add some basic styles.

I am going to uncomment the next line, and give all of the circles a "stroke" value of red.  Cool, looks like it worked.

Now I am going to give them a fill style of orange.  Awesome, it worked.  Still nothing to write home about, but still better than the default svg black style.

Just a reminder, the other way that you can do this, is by passing a map into the style method, like this.  Let's see if that worked.  Awesome!

Soon, we are going to learn about d3 scales and axis, which are going to put several more tools in our tool box for applying data based styles.  

In the mean time, let's write a simple conditional.  In our data we have temperatures from 1973 and 1974.  Let's fill the 1973 values with blue and the 1974 values with green.

To do this, I am going to create callback within the "fill" style.  Each data element stores the date as a string with the "date" key, so if I go d.date, I get a string back of the year, month, and day, all with no spaces or separating characters.  D3 has some pretty powerful built in date/time methods we will use, but for now, all I really want is the 4th character to check if it is a "4" or a "3".  Now, this is a lot more to show off the power of d3, then because you would ever really deal with times/dates this way.  So keep that in mind!

So, I add a simple logical test to see if the year ends with a 3, and I fill it with blue of it does not.  Notice that the test is using a strict comparison.  The data is a string, so make sure that the value you are comparing is a string.  Other wise you can use loose equality, with a == to make sure that they are equal, even if one of the values is an integer and one is a string.

Let's see that it worked.  Looks like it did!

**end screencast scatterPlot.html**

Congrats on getting this far.  Next we'll check out some ways to exponentially increase you super powers with d3!

## Teacher's Notes
If you are using sublime text, and you want to easily work with colors like in workspaces, check out these really cool packages:
* [ColorHighligher](https://github.com/Monnoroch/ColorHighlighter).   Allows you to see the color of a highlighted valid CSS color (e.g. hex, rgb, name)
*  [Color Picker](http://weslly.github.io/ColorPicker/).  Brings up a color wheel and allows you to pick a color and insert it right in the text file.
