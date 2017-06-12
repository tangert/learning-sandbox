# Code Challenge
*after Quiz2 at the end of Stage 1*

### Task1: Select the svg element and append an svg circle.

index.html:
```
<!DOCTYPE html>
<html>
<head>
<title></title>
</head>

<body>
<svg width="500" height="800">
</svg>
<script src="path/to/d3/d3.v3.min.js" charset="utf-8"></script>
<script type="text/javascript">
/* your code here */
</script>
</body>
```

Correct code:
```
d3.select('svg').append('circle');
```

### Task2: Change the radius of the circle to 50, and move the circle 50 pixels right and 50 pixels down.

index.html
```html
<!DOCTYPE html>
<html>
<head>
<title></title>
</head>

<body>
<svg>
</svg>
<script src="path/to/d3/d3.v3.min.js" charset="utf-8"></script>
<script type="text/javascript">
/* your code here */
d3.select('svg').append('circle')
</script>
</body>
```

Correct code: 
```
d3.select('svg').append('circle')
                 .attr('r', '50')
                 .attr('cx', '50')
                 .attr('cy', '50');
```

