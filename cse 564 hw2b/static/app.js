// Numerical need Histogram
var Budget = []
var Revenue = []
var VoteAverage = []
var VoteCount = []
var Popularity = []
var Runtime = []
var Dates = []

//Categorical need BarChart
var IsCollection = []
var Adult = []
var Genres = []
var Status = []
var OrigLang =[]
var ProdCtry = []
var Lang = []
var ProdComp= []

var flag = 0
var axis = 0 // 0 is x and 1 is y

var isColor = 0 

var test;

d3.csv("static/moviesdataset.csv", function(data) {
	for (var i = 0; i < data.length; i++) {
		//console.log(data[i].release_date);
	}
	document.getElementById("radio_buttons").style.visibility="hidden";
	console.log(data)
	test=data
	data.forEach(function(d) {
		d.budget = +d.budget;
		d.revenue = +d.revenue;
		d.vote_average = +d.vote_average;
		d.vote_count = +d.vote_count;
		d.popularity= +d.popularity;
		d.runtime= +d.runtime;
		d.isCollection= +d.isCollection;
		d.adult = +d.adult;
		d.status = +d.status;
	
		
		Budget.push(d.budget);
		Revenue.push(d.revenue);
		VoteAverage.push(d.vote_average);
		VoteCount.push(d.vote_count);
		Popularity.push(d.popularity);
		Runtime.push(d.runtime)
		IsCollection.push(d.isCollection)
		Adult.push(d.adult)
		Status.push(d.status)
		Dates.push(d.release_date)
	  });
});

function drawMDSdata(){  // can move the axes a bit 

	document.querySelector("h1").innerHTML="MDS Plot for data";

	document.getElementById("radio_buttons").style.visibility="visible";

	var label = JSON.parse(labels)
	console.log(label)

	var data = JSON.parse(mds_data)

	drawMDSPlot(data,label,isColor,[])


}

function drawMDSfeatures(){  // can move the axes a bit 

	document.querySelector("h1").innerHTML="MDS Plot for features";

	document.getElementById("radio_buttons").style.visibility="hidden"; 

	var label = JSON.parse(labels)
	console.log(label)

	var data = JSON.parse(mds_features)


	drawMDSPlot(data,label,0,['budget','revenue','vote_average','vote_count','popularity','runtime'])


}

function drawPCP(){

	document.querySelector("h1").innerHTML="PCP Plot";

	document.getElementById("radio_buttons").style.visibility="hidden"; 

	var data = JSON.parse(pcp_data)
	console.log(data)

	var label = JSON.parse(labels)

	drawPCPplot(data,label,[])


}


function drawPCPcorr(){

	document.querySelector("h1").innerHTML="PCP Plot based on correlations";

	document.getElementById("radio_buttons").style.visibility="hidden"; 

	console.log(getOrdering())
	var order = getOrdering()

	var data = JSON.parse(std_data)
	console.log(data)

	var eig_value=JSON.parse(eigenvalue)
	console.log(eig_value)

	var new_data = []
	var f = []
	var features = ['budget','revenue','vote_average','vote_count','popularity','runtime'];
	for(var a =0;a<order.length;a++){
		f.push(features[order[a]])
	}

	console.log(order)
	console.log(f)

	for(var i =0;i<data.length;i++){
		var temp=[]
		for(var j =0;j<6;j++){
			temp.push(data[i][order[j]])
		}
		new_data.push(temp)
	}

	console.log(data)
	console.log(new_data)

	var label = JSON.parse(labels)
	
	drawPCPplot(new_data,label,f)

}


function swap(){
	if(isColor==0){
		isColor = 1;
		console.log(isColor)
	}
	else if (isColor==1){
		isColor= 0;
		console.log(isColor)
	}

	if(document.querySelector("h1").innerHTML=="MDS Plot for data"){
		drawMDSdata()
	}

}