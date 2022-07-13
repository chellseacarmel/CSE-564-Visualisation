
function drawScatterPlot(Xdata,Ydata,Xparam,Yparam,flag){

    console.log("inside scatter")
    d3.select('svg').remove()

    if(flag==0){
        // X numeric Ynumeric

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
        .domain([0, d3.max(Xdata)])     
        .range([0, width-margin.right-margin.left]);
    
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
    
        svg.append("text")
        .attr("transform", "translate(" + ((width-margin.right-margin.left)/ 2) + " ," + (height + margin.bottom/1.5) + ")")
        .style("text-anchor", "middle")
        .text(Xparam);

        var y = d3.scaleLinear()
        .range([height, 0]);
        y.domain([0, d3.max(Ydata)]);   

        svg.append("g")
        .call(d3.axisLeft(y))

        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(Yparam);

        svg.append('g')
        .selectAll("dot")
        .data(d3.zip(Xdata,Ydata))
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d[0]); } )
        .attr("cy", function (d) { return y(d[1]); } )
        .attr("r", 4)
        .style("fill", "#69b3a2")

    }
    else if(flag==1){
        //X numeric Y categorical
        const width = 1000
        const height = 500
        const margin = {top: 10, right: 30, bottom: 50, left: 150}

        const svg = d3.select('#main_graphs')
        .attr("class","mdl-color--white mdl-shadow--2dp mdl-cell--2-col mdl-cell--9-col mdl-grid text-aligin--center")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + 2*margin.top + 1.75*margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

        console.log("inside 1")
        console.log(Ydata)
        var x = d3.scaleLinear()
        .domain([0, d3.max(Xdata)])     
        .range([0, width-margin.right-margin.left]);
    
        svg.append("g")
        .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(x))
    
        svg.append("text")
        .attr("transform", "translate(" + ((width-margin.right-margin.left)/ 2) + " ," + (height +margin.bottom) + ")")
        .style("text-anchor", "middle")
        .text(Xparam);

        var y = d3.scaleBand()
        .domain(Ydata.map(function(d) { return d[0] }))
        .range([0,height]);

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
        .text(Yparam);

        svg.append('g')
        .selectAll("dot")
        .data(d3.zip(Xdata,Ydata))
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d[0]); } )
        .attr("cy", function (d) { return y(d[1][0]); } )
        .attr("r", 4)
        .style("fill", "#69b3a2")

    }
    else if(flag==2){
        //X categotical Y numeric

        console.log(d3.zip(Xdata,Ydata))

        const width = 1000
        const height = 500
        const margin = {top: 10, right: 30, bottom: 50, left: 100}

        const svg = d3.select('#main_graphs')
        .attr("class","mdl-color--white mdl-shadow--2dp mdl-cell--2-col mdl-cell--9-col mdl-grid text-aligin--center")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + 2*margin.top + 1.75*margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleBand()
        .domain(Xdata.map(function(d) { return d[0] }))
        .range([0,width-margin.right-margin.left]);

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
        .range([height, 0]);
        y.domain([0, d3.max(Ydata)]);   

        svg.append("g")
        .call(d3.axisLeft(y))

        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(Yparam);

        svg.append('g')
        .selectAll("dot")
        .data(d3.zip(Xdata,Ydata))
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d[0][0]); } )
        .attr("cy", function (d) { return y(d[1]); } )
        .attr("r", 4)
        .style("fill", "#69b3a2")

    }
    else if(flag==3){
        //X categorical and Y categorical
        const width = 1000
        const height = 500
        const margin = {top: 10, right: 30, bottom: 50, left: 160}

        const svg = d3.select('#main_graphs')
        .attr("class","mdl-color--white mdl-shadow--2dp mdl-cell--2-col mdl-cell--9-col mdl-grid text-aligin--center")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + 2*margin.top + 2*margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleBand()
        .domain(Xdata.map(function(d) { return d[0] }))
        .range([0,width-margin.right-margin.left]);

        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    
        svg.append("text")
        .attr("transform", "translate(" + ((width-margin.right-margin.left)/ 2) + " ," + (height + 1.9*margin.bottom+margin.top) + ")")
        .style("text-anchor", "middle")
        .text(Xparam);

        var y = d3.scaleBand()
        .domain(Ydata.map(function(d) { return d[0] }))
        .range([0,height]);

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
        .text(Yparam);

        svg.append('g')
        .selectAll("dot")
        .data(d3.zip(Xdata,Ydata))
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d[0][0]); } )
        .attr("cy", function (d) { return y(d[1][0]); } )
        .attr("r", 4)
        .style("fill", "#69b3a2")

    }



}