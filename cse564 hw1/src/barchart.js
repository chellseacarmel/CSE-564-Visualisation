function drawBarChart(data, Xparam, Yparam){

    d3.select('svg').remove()
    const width = 1000
    const height = 500
    const margin = {top: 10, right: 30, bottom: 50, left: 40}

    const svg = d3.select('#main_graphs')
    .attr("class","mdl-color--white mdl-shadow--2dp mdl-cell--2-col mdl-cell--9-col mdl-grid text-aligin--center")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + 2*margin.top + 1.75*margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d[0]; }))
    .padding(0.2);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    svg.append("text")
    .attr("transform", "translate(" + ((width-margin.right-margin.left)/ 2) + " ," + (height + 1.5*margin.bottom) + ")")
    .style("text-anchor", "middle")
    .text(Xparam);

    var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d[1];})+10])//data.map(function(d) { return d[1];})
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0-margin.left-2)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "end")
    .text(Yparam);

    svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x",function(d) { return x(d[0]); })
    .attr("y",function(d) { return y(d[1]); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d[1]) })
    .attr("fill", "#69b3a2")

}


function drawFlippedBarChart(data, Xparam, Yparam){

    d3.select('svg').remove()
    const width = 1000
    const height = 500
    const margin = {top: 10, right: 30, bottom: 50, left: 160}

    const svg = d3.select('#main_graphs')
    .attr("class","mdl-color--white mdl-shadow--2dp mdl-cell--2-col mdl-cell--9-col mdl-grid text-aligin--center")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
    .range([ 0, (width-margin.right-margin.left)])
    .domain([0, d3.max(data, function(d) { return d[1];})+10]) 
    svg.append("g")
    .attr("transform", "translate(0," + (height- margin.top - margin.bottom) + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(0,0)rotate(0)")
    .style("text-anchor", "end");

    svg.append("text")
    .attr("transform", "translate(" + ((width-margin.right-margin.left)/ 2) + " ," + (height -margin.bottom+35) + ")")
    .style("text-anchor", "middle")
    .text(Yparam);

    var y = d3.scaleBand()
    .domain(data.map(function(d) { return d[0] }))
    .range([0,(height-margin.top - margin.bottom)])
    .padding(0.1);
    svg.append("g")
    .call(d3.axisLeft(y))
    .selectAll("text")
    .attr("transform", "translate(0,0)rotate(0)")
    .style("text-anchor", "end");

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left-2)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(Xparam);

    svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x",x(0))
    .attr("y",function(d) { return y(d[0]); })
    .attr("width", function(d) { return x(d[1]) })
    .attr("height", y.bandwidth())
    .attr("fill", "#69b3a2")

}