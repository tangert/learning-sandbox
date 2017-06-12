# Stage 2 - Step 1 - Introduction to the JSON Format

## Description
A little bit of knowledge of JSON can go a long way!  JSON is one of the main format's you work with through APIs and JavaScript in general.  Here is enough to make you dangerous.

## Script
Now we're ready to talk a little bit more about data, and some of d3's built in methods for working with data.  As you may have guessed, understanding how to work with data is pretty important in crafting data visualizations. 

Let's start at the beginning!

[GRAPHIC WOULD BE GREAT HERE: MICHAEL POLEY]

JavaScript is the language of the modern web browser. So, in many ways JSON is the data format of the modern web browser.  JSON stands for JavaScript Object Notation.  In JSON, you have basically two ways to represent data.  The first way is as key/values, simply called objects in JavaScript.   This is the foundation of the programming language.  

// If you are coming from another language, you may want to think of objects as dictionaries, 
// associative arrays, 
// or records.  

We will simply refer to them as objects.  The other way to represent data is as an "array" of values, and this is pretty much convention across languages.

[/GRAPHIC WOULD END HERE: MICHAEL POLEY]

Let's take a look at sample JSON object from the Angular website's tutorial.

**begin phones.json screencast**
```
{
  "name": "Nexus S",
  "snippet": "Fast just got faster with Nexus S.",
  "age": 1
}
```

In this object, we have three keys, "name", "snippet", and "age".  What this means is that if we were to put this object in our console, we would be able to look up each value by its key.  Let's open a random new tab in our browser and play around in the console.

If you are following along in your workspace, go ahead and copy this portion of code.  Let's create the variable name test, and then you can paste the object it into your console.

Now when I type in test, I can see my object.  To look up the values, I can actually just type in "test dot", whatever the key is. For instance test.name, test.age, or test.snippet to get back the value.  I can also use bracket notation to do a look up with the key.  For instance `test['name']` `test['age']`.    

It is important to point out that each of these are what's called "primitive values". Test.name and test.snippet are both strings, while test.age is an integer.  In addition to primitives, objects can store other objects as values.  These are some times called "nested" objects.  Here is an example:
```
{
  "name": "Nexus S",
  "snippet": {
    "title": "The new Nexus S!",
    "body": "Fast just got faster with Nexus S."
  },
  "age": 1
}
```

Let's go through the same process of throwing this data in the console and we'll name the whole thing "test" again.  What we see is that now I can access the values of the nested object, simply by typing in `test.snippet.title` or `test.snippet.body`.  Also, notice this nice auto complete feature that your developer tools have.

Beyond primitives and objects, JSON can also store arrays as values.  Let's look at an example of that below:
```
{
  "phones": [
    {
      "name": "Nexus S",
      "snippet": "Fast just got faster with Nexus S.",
      "age": 1
    },
    {
      "name": "Motorola XOOM™ with Wi-Fi",
      "snippet": "The Next, Next Generation tablet.",
      "age": 2
    },
    {
      "name": "MOTOROLA XOOM™",
      "snippet": "The Next, Next Generation tablet.",
      "age": 3
    }
  ]
}
```
Here I have an object with one key "phones".   Let's dump this in the console and call the object test again.  So now, when I do my look up `test.phones` I can see that I get back an array.  I can explore the array right in my console.  Pragmatically, I can access individual values in the array with what is called an index based look up.  So when I type `test.phones[0]` I get back the 1st value or the value at the 0 based index.  I can type `test.phones[2]` to get the final value in the array.

Often times when doing operations on arrays, you operate on the entire array versus one value at a time.  To see more of the ways that you can work with arrays in pure JavaScript, check out the teacher's notes.    
**end screencast**

## Teacher's Notes
Angular Tutorial: https://docs.angularjs.org/tutorial
Jim Hoskin's JavaScript Foundations course: 
* Arrays section: http://teamtreehouse.com/library/javascript-foundations#arrays 
* objects section: http://teamtreehouse.com/library/javascript-foundations#objects 
