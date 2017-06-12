# Stage 1 - Course Overview

## Description
A quick overview of the course.  We'll look at the data we're  using, as well as some of the d3 use cases.

## Script
Hey there!  My name is Huston Hedinger and I am a guest instructor here at Treehouse.  I am also the Founder at GraphAlchemist, where we use d3 all the time to build powerful browser based data visualizations.

Checkout this visualization, built with d3.

**Begin final app in frame**    
Using weather data from the NOAA (National Oceanic and Atmosphere Administration), we've plotted some data about weather.     

**sidebar**    
Data visualization can even make the weather exciting!    
**end sidebar**    
    
From the key, we know that the blue bars represent temperature.  We also know that the dark magenta colored trend line shows the total  rainfall on any given day.  

We can get an overall idea of what is going based on the two vertical axis.  The rainfall axis corresponds to our magenta colored rainfall.  Meanwhile, the axis on the right corresponds to our daily temperature readings.

Now when I mouse over the graph, I actually get a reading of exactly what was going on that day.  

**sidebar**    
I can't overstate just how powerful it can be to give your viewers a granular understanding of the data without overwhelming them at the same time.    
**endsidebar**     
     
**end final app in frame**     

By the end of this course, you will have a tight handle almost all of the code that went into this visualization!  Let's jump back to d3.

**In frame of d3.js website**    
d3.js stands for "data driven documents".  d3.js is written in pure JavaScript and was built by 3 super smart dudes from Stanford.  This was as a successor to another super popular data visualization project they had called Protovis.     
**end in frame**     

Besides being a fantastic name, "Data driven documents" is a great way to think about how d3.js works.  Even though browser based software applications are super robust today, browsers began as a way to share "static" files over HTTP.  Meaning, files that didn't really change a whole lot.

Basically, the internet used to be a digital fax machine.  But that's no longer the case!

For this reason, most of the popular JavaScript frameworks give you the ability to make your application dynamic with data.  In other words, applications are now built with the idea that almost anything on the page could change!  

Despite all of this, keep in mind that at the end of the day all browsers are just rendering HTML!  This is important, because this means we can see it using our browser's developer tools.  Anything we can see with our developer tools, we can understand!

There are many things that make d3 unique, but one of the most important is that it provides a "low level of abstraction."  What we mean by this is that with d3 all of the methods interact directly with the DOM (document object model).  The DOM is basically all the things you see in the HTML.

This is much different than many other toolkits or libraries.  In many other libraries, all methods are abstractions that are only accessible through the library itself.

You've probably already guessed this but d3 is not itself an application framework.  It is important to point out that unlike Ember or Angular.js, d3 is actually a library, much like jQuery.

But, unlike jQuery d3 has a lot less bells and whistles for boiler plate web development and a powerful focus on data visualization.  Even though it is not a full framework, one of these powerful methods is data binding behavior which is one of the core components of making visualizations interactive and data driven.

In this course we are going to cover all of the basics with d3.  Additionally, we are going to focus on some of the more challenging concepts.  This is so that you have a solid foundation and are able to take your applications any direction you'd like. 

Together, we are going to unpack almost every aspect of code that went into the weather application.*

Let's get started with an overview of the d3.js documentation and tools out there! 

<!-- (2:30) -->

**picture in picture of d3.js**    
Like most popular open source projects, d3 has solid documentation.  

**sidebar**    
Whenever you have a challenge with a specific d3 method or concept, this is a great starting point.     
**endsidebar**    

We'll be referencing the documentation throughout this course, and it is highly recommended that you get acquainted with it!    
**end d3.js picture in picture** 

Not only does d3 have awesome documentation, it has an incredibly rich set of examples.    

**picture in picture of bl.ocks.org.**
The examples serve as a fantastic way to discover the possibilities with d3.  It is also a great way to learn exactly what is going on behind the scenes and how you my structure your own visualization app.  Later, we'll quickly go through a debugging workflow in bl.ocks, to see how we might quickly learn from a new example.  

**sidebar**
Check out the Teacher's note to see how to build your own gist, and then view it as a block.    
**end sidebar**    

That's it for the overview, now let's take a look at one of the core components of d3, **selections**.    

## Teacher's Notes
d3.js wiki, contains all documentation and example resources: https://github.com/mbostock/d3/wiki/API-Reference
A ton of great d3 examples at Bl.ocks: https://github.com/mbostock/d3/wiki/Gallery
Creating a Bl.ock: http://bl.ocks.org/