function drawElbowPlot(data){
    d3.select('svg').remove()

    const width = 1000
    const height = 500
    const margin = {top: 10, right: 30, bottom: 50, left: 90}

    const svg = d3.select('#main_graphs')
    .attr("class","mdl-color--white mdl-shadow--2dp mdl-cell--2-col mdl-cell--9-col mdl-grid text-aligin--center")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + 2*margin.top + 1.75*margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
    .domain([0, 10])     
    .range([0, width-margin.right-margin.left]);
    
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))


    svg.append("text")
    .attr("transform", "translate(" + ((width-margin.right-margin.left)/ 2) + " ," + (height + margin.bottom/1.5) + ")")
    .style("text-anchor", "middle")
    .text("Value of K");

    var y = d3.scaleLinear()
    .range([height, 0]);
    y.domain([d3.min(data), d3.max(data)]);   

    svg.append("g")
    .call(d3.axisLeft(y))

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Objective Function");

    var kvalue = [1,2,3,4,5,6,7,8,9,10]

    svg.append("path")
      .datum(d3.zip(data,kvalue))
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d[1]) })
        .y(function(d) { return y(d[0]) })
        )
    // Add the points
    svg
      .append("g")
      .selectAll("dot")
      .data(d3.zip(data,kvalue))
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d[1])} )
        .attr("cy", function(d) { return y(d[0]) } )
        .attr("r", 5)
        .attr("fill", 
        function(d) { 
          if(d[1]==2){
            return "#ff0000"
          }
          else{
            return "#69b3a2"
          }
        }
      )
}