# Stage 2 - Step 7 - Code Challenge

Index.html:

    <!DOCTYPE html>
    <html>
     <head>
      <meta charset="UTF-8">
      <title>Requests</title>
     </head>
     <body>
    <div id="viz-wrapper">
    </div>
     </body>
     <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
     <script type="text/javascript">
        // height and width of the svg
        var height = 800,
             width = 500;

        var padding = 50;

        var viz = d3.select("#viz-wrapper")
                        .append('svg')
                        .attr('id', 'viz')
                        .attr('height', height)
                        .attr('width', width);

         d3.csv('../../app/climate_data_truncated.csv', function(data) {
            
            dots = viz.selectAll('circle')
                         .data(data)
                         .enter()
                        .append('circle');

            dots.attr('r', function(d) {return Math.abs(d.TMAX) / 10})
                .attr('cx', function(d) {return Math.max(0 + padding, Math.random() * width - padding)})
                .attr('cy', function(d) {return Math.max(0 + padding, Math.random() * height - padding )})
                .style('stroke', 'red')
                .style('fill', function(d) {
                    year = d.DATE.substring(0,4)
                    if (year === "1973") {
                        return "blue"
                    }
                    else {
                        return "#ff00f5"
                    }
                });

         });
     </script>
    </html>

1) Change the value of the radius attribute on the circles to be the absolute value of the TMIN data, divided by ten.

2) Change the stroke of the circles that represent year 1973 and year 1974, to be two different colors.
