
var ordering;

function drawMDSPlot(data,labels,isColor,features){

    d3.select('svg').remove()

    console.log(data)
    console.log(getColumn(data,0))
    console.log(getColumn(data,1))
    console.log(labels)

    var dataX = getColumn(data,0)
    var dataY= getColumn(data,1)

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

    var x = d3.scale.linear()
    .domain([d3.min(dataX), d3.max(dataX)])     
    .range([0, width-margin.right-margin.left]);

    var xaxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    svg.append("g")
    .attr("transform", "translate(0," + (height) + ")")
    .attr("class","axis")
    .call(xaxis)
    
    svg.append("text")
    .attr("transform", "translate(" + ((width-margin.right-margin.left)/ 2) + " ," + (height + margin.bottom) + ")")
    .style("text-anchor", "middle")
    .text("Dimension 1");

    var y = d3.scale.linear()
    .range([height, 0]);
    y.domain([d3.min(dataY), d3.max(dataY)]);  
    
    var yaxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    svg.append("g")
    .attr("class","axis")
    .call(yaxis)

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Dimension 2");

    var isRed = [0,0,0,0,0]
    ordering = []
    var count =1

    svg.append('g')
    .selectAll("dot")
    .data(d3.zip(dataX,dataY,labels))
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d[0]); } )
    .attr("cy", function (d) { return y(d[1]); } )
    .attr("r", function(){
      if(features.length==0){
        return 3;
      }
      else{
        return 6;
      }
    })
    .style("fill", function(d){
      console.log(d[2])
      if(isColor==0){
          return "#69b3a2"
      }
      else if (isColor==1){
        if(d[2]==0){
          return "#69b3a2"
        }
        else if (d[2]==1){
          return "#ff0000"
        }
      }
  })
  .on("click", function(d,i) { 
    if(isRed[i]==0){
    d3.select(this).
    attr("r", 8).
    style("fill", "red");
    isRed[i]=1
    ordering.push(i)
    var text = svg.append("g")
    text.append('text')
    .attr('text-anchor', 'middle')
    .attr("x",x(d[0]))
    .attr("y", y(d[1])+5)
    .style('fill', 'darkPink')
    .text(count)  
    count = count+1
    }
    else{
      d3.select(this)
      .style("fill", "#69b3a2");
      isRed[i]=0
    }
    console.log(ordering)
  })     

  console.log(features)
  if(features.length==6){
  for(let i=0;i<6;i++){   
    var text = svg.append("g")
    text.append('text')
    .attr('text-anchor', 'start')
    .attr("x",x(dataX[i])+5)
    .attr("y", y(dataY[i]))
    .style('fill', 'darkPink')
    .text(features[i])       
  }
  }

}

function getColumn(data, col){
  var column = [];
  for(var i=0; i<data.length; i++){
     column.push(data[i][col]);
  }
  return column;
}

function getOrdering(){
  return ordering
}