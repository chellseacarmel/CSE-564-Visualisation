function drawScatterMatrix(data,features,indices,labels,isColor){  
    console.log(data)
    d3.select('svg').remove()
    
    const width = 900
    const height = 520
    const margin = {top: 10, right: 30, bottom: 50, left: 250}
    const padding = 20
    const size=150

    var x = d3.scaleLinear()
    .range([padding / 2, size - padding / 2]);

    var y = d3.scaleLinear()
    .range([size - padding / 2, padding / 2]);

    var xAxis = d3.axisBottom()
    .scale(x)
    .ticks(6);

    var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(6);

    const svg = d3.select('#main_graphs')
    .attr("class","mdl-color--white mdl-shadow--2dp mdl-cell--4-col mdl-cell--9-col mdl-grid text-aligin--center")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + 2*margin.top + 1.75*margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var traits = d3.keys(data[0])
    var n = traits.length;
    var domainByTrait = {}

    traits.forEach(function(trait) {
        domainByTrait[trait] = d3.extent(data, function(d) { return d[trait]; });
      });

    xAxis.tickSize(size * n);
    yAxis.tickSize(-size * n);

      svg.selectAll(".x.axis")
      .data(traits)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + (n - i - 1) * size + ",0)"; })
      .each(function(d) { x.domain(domainByTrait[d]); d3.select(this).call(xAxis); });

  svg.selectAll(".y.axis")
      .data(traits)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
      .each(function(d) { y.domain(domainByTrait[d]); d3.select(this).call(yAxis); });

  var cell = svg.selectAll(".cell")
      .data(cross(traits, traits))
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
      .each(plot);

    cell.filter(function(d) { return d.i === d.j; })
      .append("text")
      .attr("x", padding)
      .attr("y", padding)
      .attr("dy", ".71em")
      .text(function(d,i) { return features[i]; })
      .style('fill', 'darkOrange');

      function plot(p) {
        var cell = d3.select(this);
    
        x.domain(domainByTrait[p.x]);
        y.domain(domainByTrait[p.y]);
    
        cell.append("rect")
            .attr("class", "fill--none")
            .attr("x", padding / 2)
            .attr("y", padding / 2)
            .attr("width", size - padding)
            .attr("height", size - padding);
    
        cell.selectAll("circle")
            .data(data)
          .enter().append("circle")
            .attr("cx", function(d) { return x(d[p.x]); })
            .attr("cy", function(d) { return y(d[p.y]); })
            .attr("r", 2)
            .style("fill", function(d,i){
              if(isColor==0){
                  return "#69b3a2"
              }
              else if (isColor==1){
                if(labels[i]==0){
                  return "#69b3a2"
                }
                else if (labels[i]==1){
                  return "#ff0000"
                }
              }
          })
        
      }
}

function cross(a, b) {
    var c = [], n = a.length, m = b.length, i, j;
    for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
    return c;
  }