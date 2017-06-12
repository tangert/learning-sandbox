# Step 8 - Debugging Strategies in d3

## Description
Effectively using the developer tools can make building your application much quicker, and easier.  In this video you'll learn how to use your browser's dev tools specifically with d3.

## Script
You are now getting somewhat acquainted with Workspaces, and with d3.  No problem if certain things are not completely solid yet, it really just takes time and practice.

One of the important things to always keep in mind as a developer, is that you have the unique ability to unpack the code that is in front of you.  What I mean by this is you can see what the different variables are doing, and how the functions come together to make the application.  On the flip side, getting set up to do this, is some times the most challenging part!

I am going to quickly go in depth with how I like to debug d3.

**begin ScatterPlot.html**    
Here I have the ScatterPlot.html video open again.  Feel free to click on the workspaces button to follow along.  You are going to do a lot of your code work in a text editor, that functions a lot like workspaces.  However, debugging in the browser is where you can really dive into how things are working together.

So, I am going to click on the preview button and launch my browser.  You probably already know how to open the developer tools from earlier in the course.  So open those up, and click on the "sources" pane.  The sources pain gives me access to all of the static files that are loaded by the browser.  In our case, we are writing all of our code right in the HTML file, inline.  So I am going to double click on that file, and now I have all the code that is being run on this page in front of me.

Now here is the cool thing.  I can click on any line, and set what is called a "breakpoint" in my application.  All this means is that the application completely stops when it gets to that line.  It literally breaks.  Now let's refresh the page with these breakpoints in place.  

The highlighted line tells us where the application is stopped.  Now I can open the console, and access any variable that has already been declared.  And most debugging programs, like the chrome dev tools, will autocomplete all of the methods coming off of an object.  This can be super helpful.

Two sidenotes:  You can also access the console in its own pane, like this.  However, I find it to be convenient to look at the code while I also have access to the console.  The second important note, is that when we say "console" here, we are talking about the Chrome browser JavaScript console.  This console is a JavaScript interpreter, but is not to be confused with the command line console on your laptop or in workspaces.  You can interpret JavaScript from the command line.  But JavaScript outside of the browser, is typically in the context of backend applications.  For instance, Node.js apps.

Back to the debugger.  Notice that I have another breakpoint down lower.  If I hit the play button, the app will run until I get to that breakpoint.  I can also use the "step" button to go line by line.

Notice what happens here though.  Because of d3's chaining syntax, I could have trouble debugging the data that in these single line functions.  There is a simple solution.  I go back to my file, and I actually make this function two lines.  Now, I reload the page, and voila, there is a second line in the function.  I can set my debugger here, and reload the page.  I hit play a couple of times, and look, the debugger stops!

This is incredibly important, because now I have access to the "d" variable.  The d being the data that is bound to the individual element in the selection.  Keep in mind that the debugger will now stop for every iteration, or every time the function is called.  In other words, the breakpoint will be hit for every element.

The other way U can get the debugger to break in my code, is be writing it in.  So, going back to my file, I can simply type in `debugger;` and the app will break every time this line of code is hit.     
**end scatterplot.html screencast**

**begin bl.ocks.org screencast**    
Another awesome thing about being able to debug files without changing them, is that the internet becomes our playground!  Take for instance all of the examples of d3 on Bl.ocks.  If I pick one example that I am interested in, I can actually see how the app is working very quickly.  I click to open the "raw" version of the app.  In other words, just the visualization.  Then I can open the dev tools and set break points in the file.  When I refresh the page, I have access to the app at any break point.  

When you get frustrated with the internet, remember the power is in your hands.  Approach your work, and your craft as a software engineer as if you are a kid on a playground.  Debugging an app should be a fun problem solving adventure!    
**end bl.ocks.org screencast**    

There are certainly more tips and tricks to effectively debugging browser based apps.  Additionally, there are a couple other things that will make working with d3 easier.  I will introduce these methods ad hoc later.

##Teacher's Notes
Chrome debugging tutorial: https://developer.chrome.com/devtools/docs/javascript-debugging