# Step 2 - Selecting DOM elements using d3

## Description
Selections are how d3 interfaces with HTML.  In this video we'll learn how to make selections, and some basic things we can do with selections.


## Script
One of the core components of d3 are *selections*.  

d3 selections are much like jQuery collections of elements. To create selections, d3 traverses the document nodes in the DOM, to return only the nodes that match the selection criteria.  

The selection is then wrapped in special d3 selection prototype methods.  These methods are what allow you to do all of the amazing things that you can do with d3.

d3 has two primary methods for making selections - d3.select and d3.selectAll.  The select methods, takes any valid css selector as a parameter.  

**sidebar?**    
Let's take a look.  
**endsidebar**

**Selections1.html Screencast**    
If you'd like to follow along go ahead and open workspaces.  

In my workspace here I have the file open called "selections1.html".  Then I've launched the page in my browser by previewing the file.

Awesome, we've got our page loaded.  Before we move any further, tune in and pay close attention!  The browser inspector is where all of the magic happens.  You can can inspect HTML, and even run JavaScript commands manually.  I apologize if you are already doing this a few hundred times a day.  On the flips side, for those of us that are newer, this is one of the most important tools you can have in your toolbox.    I am going to open my inspector in Chrome, but Mozilla Firefox has a very similar interface.  

There are two main ways to open the inspector.  The most straightforward is to open the view menu, then the developer tools sub menu, selecting the "developer tools" option.  The stealth ninja way of opening the dev tools is to use the shortcut.  It is listed right next to the selection in the menu.  I am on a mac, and so in my case I type in 'command+alt' and the letter 'i'.  It may be slightly different if you are on a linux or Windows machine.  In the future, I will give an in depth look into my d3 specific debugging strategies.  For now, lets just dig right in.

On the page we have exactly four divs, which I can see here in the elements pane.  We have one div with no id.  We have one div with the id "tree", and we have two divs with the class "bar."

Now lets select a div simply by typing `d3.select('div')` into the inspector console.  Awesome!  We've made our first selection.  Notice that we've only selected one div, and it happens to be the first one.  So, let's select all of the divs by using, you guessed it, d3's *selectAll* method.  

```
d3.selectAll('div')
```

Now, d3 returns a selection to us, that is an array that contains an array of all html elements that matched our css selector.  Let's get more specific.

Let's find the one div on the page with id *tree*. `d3.select('#tree')`

Now, let's select all of the divs with class *house*.
```
d3.select('.house')
```
But wait, again, we only received the first div that matched our css selector!  Easy fix in d3, simply use the selectAll method.
```
d3.selectAll('.house')
```    
**end Selections1.html screencast**

Pretty fancy, huh?  Let's take a look at some of the cool things we can do with selections, out of the box.

# Attribute, style, and class methods with d3
**can be broken into seperate video if need be**

**Selections2.html screen cast**    
We have a web page with the exact same elements, but with some text that gives us something to look at on the page.

Back in the console, let's use our select method to grab a div, and change the color of the text to "orange".    
```
d3.select('div').style('color', 'orange');
```
Voila! We've change css style of the first div.  The style method takes the css parameter, in our example 'color' as the first parameter, and it takes the value that you want to pass as the second parameter.  You can also change multiple styles at once by passing in an object:
```
d3.select('div').style({'color': 'blue', 'font-size': '40px'})
```
Also, there is another thing to note.  We've introduced one of the d3 conventions, which is "chaining" or "chain syntax."  

Everytime you alter a selection in d3, like we did with the `style` method, it returns the selection.  What this means is that we can "chain" as many methods to a single selection as we'd like.  We'll take a look at the best ways to do this later on.  Here are some examples.

Now, let's use the select all method to select all the divs, and give them some new styles, and a new attribute:
```
d3.selectAll('div')
    .style('background-color', 'grey')
    .attr('anExampleAttribue', 'someValue')
```
Voila, we've just altered all of the divs!
And if you wanted to focus only on one class, you could do it like this:
```
d3.selectAll('div.house')
    .style('color', '#FFF')
    .style('background-color', '#000')
```
Another really handy method that d3 has for dealing with classes, is the *classed* method.  The classed method returns true if the selection contains the parameter supplied, and false, if it doesn't.
```
d3.selectAll('.house')
    .classed('house')
```
Is expected to return *true*.  However,
```
d3.select('#tree')
    .classed('house')
```
returns false.  And a selection with all the divs, where some have the house class and some do not,
```
d3.selectAll('div').classed('house')
```
will return false, unless the entire selection contains the house class.  Also, I'd like to quickly point out that "chaining" does not work in this case.  This is because the "classed" method returns a *true* or *false* value.  Whereas, for method chaining to work, we need the method to return the selection itself.

Using classed again and providing a boolean, as the second parameter we can change the class of an entire selection.
```
d3.selectAll('.house').classed('frog', true)
```
In this case, since "true" was provided, every element will receive the class.

This is especially helpful if there are multiple classes. So when I select all of the divs with class frog, I can easily alter the selection to get rid of the house class.
```
d3.selectAll('.frog').classed('house', false)
```

Additionally, the way "classed" is used here actually returns the selection.  So, we could chain to the end of it if we want to.    
**end Selections2.html screencast**    

We're just scratching the surface with selections.  If you'd like to see all of the different selection methods the API docs are a great resource.  There is a link in the teachers notes.  Not all of the methods, will make sense yet, especially those that have to do with data binding.  Not to worry, we'll get there!

Next, we'll dive into a quick overview of some SVG essentials, and we'll see how to use selections to alter SVG.

## Teacher's Notes
[API docs](https://github.com/mbostock/d3/wiki/Selections#operating-on-selections)
