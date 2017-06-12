# Stage 2 - Step 4 - Data binding with d3

## Description
Databinding is one of the core features of d3, and it is also the one that causes the most headaches initially!  Here we will demystify what databinding is, and some simple ways to make d3 draw pictures based on data.

## Script
One of the most powerful aspects of d3, and core to almost any type of visualization you can build using d3, is d3's data binding ability.

Using d3's data binding behavior, you have the ability to create elements in the DOM based on data.  Meanwhile, the inverse is true.  When you make d3 selections of DOM elements, you have access to the data that is bound to that element!  This may sound pretty abstract, but you can think of it in a very straightforward way.  By binding data, you can change layout, sizing, colors, and other styles of the elements, based on the unique data that is associated with that element.  Different elements can represent different aspects of the data, and changes to the data, will be reflected visually based on the code you write.  

Lets look at an example, with the weather data we are beginning to become familiar with.

**Begin screencast `examples/dataBinding.html`**        
Here I have HTML in front of me.  Feel free to follow along by opening the dataBinding1.html file in the Workspaces. 

The only element I have added to the HTML "manually" is the div element with the id "viz-wrapper".

Now looking at the script inline between the script tags, here are some of the variables we set up before we make a request for data.  At this point we can really do anything that does not depend on the data as it is invoked.  We'll do more down the road, but all we really need to do at this point is to append an svg element to the "viz-wrapper" div.

Now let's go to our callback, this is where the magic happens.

Here we are going to operate on the viz selection, which is simply the svg with the id "viz" that we created before the request callback.  The first part of the operation we are doing here might feel a little strange because we are using "selectAll" to select all of the circles within the svg - but there are none!  Here we are making an empty selection or what some in the d3 realm call a "ghost selection."

With the next line, and the dot "data" method we are telling the selection that we want to bind the array of data that is all the rows of our weather csv to the circles.  But, nothing has really happened yet.

The way you can test this, and see what is happening, is by following the chain in the console and running each operation line by line.  So when I type in the first part, "viz.selectAll('circles')" I can see the empty selection right there in the console.  When I add the dot data as a function of data, I see that now I have an array of length 14573, but with all undefined values!  This is because the dot data method is used to evaluate our data and returns what is called the "update" selection, joining the specified data parameter to the selection.  

A join is exactly what it sounds like, where every element in the data array is joined to an element in the DOM.  In this case, this selection results in elements that did not yet exist in the DOM.  We will create them further down.

I use the dot enter method which returns a subset of the selection for which no corresponding DOM element can be found.  Again in this case, keep in mind that dot enter is going to return the same number of elements as exist in our data set, since we have not created anything in the DOM yet.  Opening up the object I can see that there is an array of length 14573, with the data.  But lets take a look at the HTML.  Nothing has changed yet.  So now, we finally use the "append" method to actually create new HTML elements, based on the enter selection which was the result of running the dot enter method!  If we take a look at the HTML, there are all of our circles!

Remember that we give the circles we just appended the variable name dots.  I picked the variable name dots to make sure it is super obvious that it is a variable name we picked, and not native JavaScript or SVG named convention.  Now that circles are appended with joined data, the dots variable is exactly the same as saying viz.selectAll('circle').  

Here is where things get really cool.  With the entire selection, I can make the radius of the circle based on the individual data bound to that element.

Lets set the radius to the TMAX value for each element.  In our data set, "TMAX" is the maximum temperature measured on a given day. The value is actually, get this, celsius degrees to the tenth.  So, in our data a TMAX of "294", is actually 29.4 degrees celsius.  This is strange, but we'll just keep this in mind as we build our app.  Now after we step through this with the debugger, we can see that we've changed the "r" attribute in each of our circles to match the TMAX value.  We get some errors in the console, and that is because some of our TMAX values are negative.  So, lets operate on the selection again using the same exact method, but using the JavaScript built in to find the absolute value of the TMAX value.

Now we don't have all of those errors, but lets do one more thing to quickly try and get something going visually.  This big black square is actually coming from the fact that many of the circles are much bigger than the SVG it self.  So, let's just divide the value we are passing for radius by a factor of 100.  When we run that we see that now we at last can see the makings of a circle!  Remember that we have not given any of the circle elements cx or cy attributes and so the center of all of the circles is stuck up there in the top left at x position zero, and y position zero on top of each other.  At least we know that the elements are there, where we expect them, and we can see the bottom right quadrant of all of the circles.    
**end screencast dataBinding.html screencast**    

Congrats, on getting this far!  Understanding d3's data binding patterns are by far the most challenging aspect of d3.  Don't worry if it is not completely obvious how everything works yet.  And, don't worry especially if you don't understand every nuance of what is going on under the hood.  It definitely helps to understand how d3 is doing things, but is not necessary.  If you do want to understand how data binding works, I highly recommend a post from Mike Bostok himself called Thinking with Joins.

In the next section we are going to see how to use the data to do some basic styling and positioning of the circles!

## Teacher's Notes
Thinking with Joins by Mike Bostok: http://bost.ocks.org/mike/join/

