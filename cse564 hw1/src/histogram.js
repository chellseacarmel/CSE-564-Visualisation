function drawHistogram(data,Xparam,Yparam){

    console.log(Xparam)
    console.log(Yparam)
    
    d3.select('svg').remove()
    
    console.log("inside draw histogram")
    var height = 500
    var width = 1000 
    var margin = {top: 10, right: 30, bottom: 50, left: 50}

    var svg = d3.select("#main_graphs")
    .attr("class","mdl-color--white mdl-shadow--2dp mdl-cell--2-col mdl-cell--9-col mdl-grid text-aligin--center")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
    .domain([0, d3.max(data)])     
    .range([0, width]);

    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

    svg.append("text")
    .attr("transform", "translate(" + ((width-margin.right-margin.left)/ 2) + " ," + (height + margin.bottom/1.5) + ")")
    .style("text-anchor", "middle")
    .text(Xparam);
  
    var histogram = d3.histogram()
    .value(function(d) { return d; })   
    .domain(x.domain());
    //.thresholds(x.ticks(20)); // then the numbers of bins

    // And apply this function to data to get the bins
    var bins = histogram(data);

    // Y axis: scale and draw:
    var y = d3.scaleLinear()
    .range([height, 0]);
    y.domain([0, 500]);   

    svg.append("g")
    .call(d3.axisLeft(y))

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(Yparam);

    // append the bar rectangles to the svg element
    svg.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", 1)
    .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
    .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
    .attr("height", function(d) { return height - y(d.length); })
    .style("fill", "#69b3a2")

}

function drawFlippedHistogram(data,Xparam,Yparam){

    console.log(Xparam)
    console.log(Yparam)
    
    d3.select('svg').remove()
    
    console.log("inside draw histogram")
    console.log(data)

    var height = 500
    var width = 1000 
    var margin = {top: 10, right: 30, bottom: 50, left: 90}

    var svg = d3.select("#main_graphs")
    .attr("class","mdl-color--white mdl-shadow--2dp mdl-cell--2-col mdl-cell--9-col mdl-grid text-aligin--center")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
    .domain([0,500])    
    .range([0, width-margin.right-margin.left]);

    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

    svg.append("text")
    .attr("transform", "translate(" + ((width-margin.right-margin.left)/ 2) + " ," + (height + margin.bottom/1.5) + ")")
    .style("text-anchor", "middle")
    .text(Yparam);

    // Y axis: scale and draw:
    var y = d3.scaleLinear()
    .range([0,height])
    .domain([0,d3.max(data)]);   

    svg.append("g")
    .call(d3.axisLeft(y))

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(Xparam);

    var histogram = d3.histogram()
    .value(function(d) { return d; })   
    .domain(y.domain())  
    
    var bins = histogram(data);
    
    svg.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("transform", function(d) { return "translate(" + x(0)  + "," + y(d.x0)  + ")"; }) 
    .attr("width", function(d) { return x(d.length);}) 
    .attr("height", function(d) { return y(d.x1)-y(d.x0)-1;  ; })
    .style("fill", "#69b3a2")
    

}

function drawTimeHistogram(data,Xparam,Yparam){

    console.log(Xparam)
    console.log(Yparam)
    
    d3.select('svg').remove()
    
    console.log("inside draw histogram")
    var height = 500
    var width = 1000 
    var margin = {top: 10, right: 30, bottom: 50, left: 50}

    var svg = d3.select("#main_graphs")
    .attr("class","mdl-color--white mdl-shadow--2dp mdl-cell--2-col mdl-cell--9-col mdl-grid text-aligin--center")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleTime()
    .domain([d3.timeYear.floor(d3.extent(data)[0]), d3.timeYear.ceil(d3.extent(data)[1])])     
    .range([0, width]);

    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

    svg.append("text")
    .attr("transform", "translate(" + ((width-margin.right-margin.left)/ 2) + " ," + (height + margin.bottom/1.5) + ")")
    .style("text-anchor", "middle")
    .text(Xparam);
  
    var histogram = d3.histogram()
    .value(function(d) { return d; })   
    .domain(x.domain());
    //.thresholds(x.ticks(20)); // then the numbers of bins

    // And apply this function to data to get the bins
    var bins = histogram(data);

    // Y axis: scale and draw:
    var y = d3.scaleLinear()
    .range([height, 0]);
    y.domain([0, 500]);   // how to figure this to be dynamic

    svg.append("g")
    .call(d3.axisLeft(y))

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(Yparam);

    // append the bar rectangles to the svg element
    svg.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", 1)
    .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
    .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
    .attr("height", function(d) { return height - y(d.length); })
    .style("fill", "#69b3a2")

}

function drawFlippedTimeHistogram(data,Xparam,Yparam){

    console.log(Xparam)
    console.log(Yparam)
    
    d3.select('svg').remove()
    
    console.log("inside draw histogram")
    var height = 500
    var width = 1000 
    var margin = {top: 10, right: 30, bottom: 50, left: 60}

    var svg = d3.select("#main_graphs")
    .attr("class","mdl-color--white mdl-shadow--2dp mdl-cell--2-col mdl-cell--9-col mdl-grid text-aligin--center")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
    .range([0,width-margin.right-margin.left]);
    x.domain([0, 500]);   

    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

    svg.append("text")
    .attr("transform", "translate(" + ((width-margin.right-margin.left)/ 2) + " ," + (height + margin.bottom/1.5) + ")")
    .style("text-anchor", "middle")
    .text(Yparam);

    // Y axis: scale and draw:
    var y = d3.scaleTime()
    .domain([d3.timeYear.floor(d3.extent(data)[0]), d3.timeYear.ceil(d3.extent(data)[1])])     
    .range([0, height]); 

    svg.append("g")
    .call(d3.axisLeft(y))

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(Xparam);

    var histogram = d3.histogram()
    .value(function(d) { return d; })   
    .domain(y.domain());

    var bins = histogram(data);

    svg.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("transform", function(d) { return "translate(" + x(0) + "," + y(d.x0) + ")"; })
    .attr("width", function(d) { return x(d.length);}) //width - x(d.length)
    .attr("height", function(d) { return y(d.x1) - y(d.x0)-1;  ; })//y(d.x1) - y(d.x0) -1; 
    .style("fill", "#69b3a2")

}


