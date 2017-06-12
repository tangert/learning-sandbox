# Intro to SVG Shapes

## Description
Scalable Vector Graphics (SVG) is one of the main technologies used for creating shapes and animations that are 'machine readable.'  SVGs can be created with creative suites (like Adobe Illustrator).  However, here we'll focus on how to programmatically alter SVG.

## Script
SVG stands for scalable vector graphics, and is an XML file format for rendering graphics.  SVG's can be edited in a text editor.  But more commonly, SVGs can created by a number of different graphics drawing suites.  

Most importantly for us, SVG can be rendered in any modern browser, and can be pragmatically generated and edited with JavaScript.

The two SVG elements we are going to look at today are *circles* and *lines*.  There are many more SVG basic shapes, and elements.  In the final app, we'll look at *path* elements and how d3 allows us to easily create paths.  

**sidebar**     
In the meantime, if you'd like to look more broadly at SVG, the Mozilla documentation is a great place to do that and there are links in the Teacher's Notes!  Additionally, check out the other d3 courses on SVG.    
**endsidebar**     

Before we get started, let's take a quick look at how positioning works in SVG.

**picture in picture motion graphic**    
*similiar to http://www.recursion.org/d3-for-mere-mortals/svg-rectangle.png*

The box you see is our SVG.  Now let's add a dot.  The dot that has just been added is at the top left of the SVG.  This is x position 0 and y position 0.  Now let's draw a second dot.  This dot is at x position 50, and y position 50.  But wait, the positive y position actually moved the dot down 50 pixels.  Let's add a second dot at position (200, 200).  This dot has been moved to the right 200 pixels.  And again, the positive y value moves the dot down 200 pixels.  Dot 1 is exactly 150 pixels to the left of dot two, and 150 pixels higher.  

One other thing to keep in mind, is that you can typically give svg elements negative values to move them the opposite direction.  A negative x value would move an element to the left.  A negative y value would move an element up.  In this example, we could have an element at (-10, -10).  This would look like dot 3.  However, depending on how you've set up the styles and your SVG, dot 3 may or may not be visible.     
**end picture in picture motion graphic**

Positioning in SVG space can be super confusing at first.  Hopefully this explanation and these graphics have been helpful.  Understanding SVG positions will be important as the code you write in this course gets more and more complex.

Now let's take a look at the circle element.

**begin SVG1.html screencast**    
I am going to open up the SVG.html file in my workspaces.  Feel free to do the same, if you'd like to follow along.  Now, I click preview, to launch the browser that will display my code.

On our page you can see that we've set up an SVG "canvas" which is done with the *`<svg>`* tag.  Additionally, to give ourselves some room, we've made the svg, 800 pixels in length, and 500 pixels wide.

In the svg, there are 3 circles.  We can see that the first two circles are pretty boring!  The first circle does not have any attributes and so it is not visible.  And, even though we've given the second circle a radius of *50*, it is up in the top left corner.

The third circle starts to get interesting and useful.  By altering the "cx" and "cy" attributes we move the center of the circle down and to the right.    
**end SVG1.html screencast**    

Believe it or not, these three attributes, *cx*, *cy*, and *r*, will get you a long way with *`circle`* elements.  We'll look at how to use css to style circles, but before that, lets take a look at the *`<line>`* element.

**begin SVG2.html screencast**    
Here I have closed the SVG1.html file in my workspaces, and am now working on the SVG2.html file.  Let's look at this in the browser.  Once again we have a very similiar page, this time with 5 *`<line>`* elements.

Again, the first element is just a lonely line element with no attributes and styles.  In the second line element, we see all four of the special attributes for a line element, *x1*, *x2*, *y1*, and *y2*.  However, again the line is invisible, so lets give it some style in the 3rd line element.  And here, we can start to see what these attributes are doing.

*x1* and *y1* are simply the x and y position of the starting point of the element, while *x2* and *y2* are the ending point of the line.  In this way, we can see that in the 4th line, we can create a vertical line by providing the same value for the *x1* and *x2* values.  Similiarly, in the 5th line we can see that a horizontal line can be created by providing the same value for the *y1* and *y2* attributes.    
**end SVG2.html screencast**    

We now know enough SVG to make us dangerous.  So lets put our knowledge of d3 selections together with or knowledge of SVG.  This will allow us to create and alter SVG on the fly!

**begin SVG3.html screencast**    
Jumping to the SVG3.html file in my workspaces, I've closed the last file we were last working on.  Again here, I click the preview button and we have the code available in our browser.  However, this time, when I open the inspector, I can see that it is actually a blank web page!   There is no HTML.  But notice below, now we are writing all of our JavaScript in this script tag, instead of directly in the console.  

When you write JavaScript directly in the same file as the HTML it is called "inline JavaScript."  This is how we'll be looking at our code for the remainder of the course so that it is easy to see everything that is going on in one place.

Let's take a look what this code is doing.

First, we select the *`<body>`* of the webpage, and we use d3's append method, to add an "svg" element to the body.  We give this svg a height and a width.  Most importantly, we assign the svg to the variable *mySVG*.  Keep in mind that even though we are selecting *body*, once we append the svg tag, the *append* method returns a new selection which is the *svg* we just appended.  We then operate on this selection with the *.attr* method just like we would any other selection.

Now, we use the *mySvg* variable and the *append* method to add two circles and a line.  We give all of the elements a class *foobar*, but we give each of the circles a unique id.  One of the circles gets an id *start* and one gets an *id* end.  This will come in handy in a second.

Let's run our custom *createSvg* function in our console.  I do this by typing in the name of the function, and then closed parenthesis to execute it.  This particular function does not take any parameters, so the parenthesis are empty.

Now we can see that we have an SVG with some elements!

The next function *thickenCircles* is going to use *selectAll* to select all of the circle elements. Then it is going to change their *r* attribute which stands for radius.

Let's run that function, by typing it into the console. Great, now we see a circle!  I'd like to point out that it is actually two circles on top of eachother.  svg is 2D and works by only showing the last element in the DOM tree.

The next function is going to select the circles individually, using their id as the selector.  In css selectors, the pound sign is the id selector.  We are going to move the start circle so that the center of the circle is at exactly 100 pixels to the right of the top left corner of the page, and 100 pixels down.  Then, we are going to move the end circle 200 pixels to the right and down.

Let's run that function in the console.  Cool, now we see that the circles have moved!

Now, we'll select the line, and give it some positioning and color.  In the styleLine function, we give the line a starting x position of 100 pixels to the right with the x1 attribute, a starting position of 100 pixels down with the y1 position, and an ending position of 200 pixels to the right and down with x2 and y2.  We're also going to change the stroke of the line to the color "cyan".

Let's run that function.

Next, let's select the line and change the starting position, x1 and x2 to match the center of the "start" circle and the ending position to match the position of the center of the "end" circle.

When we run moveLine, we now see that the line matches up with the circles.

Let's also run thickenLine, to change the stroke-width of our line to be a little bit more visible.  There we go, it is looking a little bit nicer.

Finally, lets change our circles up a bit with the styleCircles function.  Here we are going to give the start circle a nice lavender fill.  We are going to give the end circle no fill, but we are going to change the stroke to torqoise.

When we run this function, we now see that it is more obvious which node is the start node and which node is the end node.    
**end SVG3.html screencast**

Now that you have the basics down, we are going to take a look at how d3 lets you grab data.  Once we are able to get data, we can throw the data together with what we've already learned.  With just a few more tools, you'll be building meaningful web based data visualizations!

## Teachers Notes
Mozilla SVG Documentation: https://developer.mozilla.org/en-US/docs/Web/SVG/Element
Check out the d3 course on SVG: [link to Nick's course]