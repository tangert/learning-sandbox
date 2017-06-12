# Stage 2 - Step 3 - D3's Request Methods

## Description
Requests are how we get data from another file into our application.  d3 has some great built in methods for making requests that we'll introduce in this video.

## Script
Now that you know the fundamentals of working with JSON objects, it's time to dive into d3's request methods.

In d3, like many other JavaScript library's, the request methods are asynchronous.  What this means is that other parts of the web page won't wait for the request to fire.  This is super handy, because imagine if your web page failed, and all processes stopped every time a font didn't get loaded!  For websites with a ton of front end, some times called "client-side", dependencies, it is important that all requests that are made to outside files and data sources are "non blocking" for the rest of the application.  In other words, what we mean, is that the rest of the application does not wait for these request to successfully or unsuccessfully finish, before it works.

For a more expanded introduction to AJAX requests, check out the treehouse courses in the teacher's notes.  Here is a lightening fast introduction to making requests with the d3 built in convenience methods.

d3 has the following convenience methods for differing data formats expected:
```
d3.json
d3.csv
d3.text
d3.html
d3.tsv
d3.xml
```

We are going to laser focus on two of the most commonly used methods, `d3.json` and `d3.csv`.  Know that the other methods mentioned in the d3 docs can be used very similarly, with most of the difference being the type of data you expect to get back.

Let's take a look at the `d3.json` method first.  Follow along by clicking the workspaces button next to the video.

**Begin screencast jsonRequest.html**
In my workspace, I have the jsonRequest.html file and I have a phones.json file, ready to be requested.  Let's open up this jsonRequest.html file.  As usual, I make sure that I have the d3 script loaded before I use any d3 methods.  When I look at the inline script tags here, I see that I already have the d3.json request method ready to go.

The first argument in the callback is going to be the path to the file or data object that is being requested.  The path is relative to the HTML file itself.  Since in this case, the "phones.json" file is a sibling of the index.html file, in the directory tree, the argument I pass is simply "phones.json."  Let's say the phones.json file was within a directory called "data" one level down.  Then I could pass in the string "data/phones.json" and the method would look for the file in that location.  

Now here is where things get interesting, the second argument is actually a function.  This function is what is called a callback and is only executed after the request returns data or fails.  The callback function itself, can take two parameters.  The first parameter relates to errors, that you can use to create custom error handlers, for instance if the file is not found.  The second parameter is the result parameter, which in this case is the data object that is found at the "phones.json" path when a successful request is made.  

Since we are not going to go over error handling methods, we can actually even leave out the "error" parameter, and that is what we are going to do from here on out!

There are two things happening with the console.log. We received our `phones.json` data which is logged in the console.  Also, there was no error so we get a `null` in the console log, when we try to log the "error" value.
**end screencast jsonRequests.html**

Now, lets jump to another request method that is slightly more robust, and can be used, for possibly, the most ubiquitous data type there is, `csv`.  That is the d3.csv request method.  

**begin screencast csvRequest.html**
Here I have the csvRequest.html file open.  You can follow along by clicking the workspaces button next to this video.  Then I launch the file in my browser.  I've opened the developer tools in my browser, and I am looking at the inline JavaScript of the csvRequest.html file.

Notice the d3.csv method has a very similar syntax to before.  This time we have done away with the "error" parameter in the callback, since we are not necessarily worried about error handling right now.  If we had included it, the error parameter would be right here.  Your applications in the real world should DEFINITELY handle errors properly.  This is covered in other Treehouse courses.  

The file path parameter is now pointed at a csv file which is the main data file we are going to look at for the rest of the course.  This file is weather data for a Portland, OR Weather Station from 1973 to 1974.  I am opening that up in my worspaces - it is called `climate_data_truncated.csv`.  You can see here that the csv file itself has some variables here in the header.  We are not going to worry about what they are at the moment.

I've thrown my debugger in here, so that I can explore the data.  With the developer tools open, when I refresh the page, the application will break here.  This allows me to explore the variables at the point where the application is breaking.  In this case, I can explore the data itself.

I type the data variable into the console here, and notice that D3 has done something really helpful for us.  It has actually created a JSON like object, based on some really common ways of interpreting csv.  
The data I received is just a giant array, where each element in the array is an object.  Each object corresponds to the values for a given row.  For example, element 0, would be the first row AFTER the header.  Each of the keys corresponds to a column name, and it is these names that we can use to look up the values.  So if I want to look at row 2 in the CSV, the first row past the header.  I can type in `data[0]`.  Row 3 is `data[1]`, and so forth.    
**end screencast**

Now that we can request data, let's jump into the absolute core of d3, with d3's databinding methods!

## Teacher's Notes
Dave McFarland's AJAX Basics Course: http://teamtreehouse.com/library/ajax-basics
