// Numerical need Histogram
var Budget = []
var Revenue = []
var VoteAverage = []
var VoteCount = []
var Popularity = []
var Runtime = []
var Dates = []

var parseTime = d3.timeParse("%Y-%m-%d");

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

d3.csv("static/moviesdataset.csv", function(data) {
	for (var i = 0; i < data.length; i++) {
		//console.log(data[i].release_date);
	}
	document.getElementById("radio_buttons").style.visibility="hidden"; 
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
		d.release_date = parseTime(d.release_date);
		
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


var intrinsic_dimensionality=0;


function drawScreePlot(){   /// need to change eigenvalue to eigenvalue ratio

	document.querySelector("h1").innerHTML="Scree Plot";

	document.getElementById("radio_buttons").style.visibility="hidden"; 

	var data=JSON.parse(eigenvalue)
	console.log(data)
	var sum = 0
	for(let i=0;i<data.length;i++){
		sum+=data[i].eigenvalue
	}

	var new_eig = []
	for(let i=0;i<data.length;i++){
		new_eig.push([data[i].feature,((data[i].eigenvalue)/sum)*100])
	}
	drawBarChart(new_eig,"Principal Components","Variance Percentage %")
}


function drawPcaBiplot(){
	

	document.querySelector("h1").innerHTML="PCA Biplot";

	document.getElementById("radio_buttons").style.visibility="visible"; 

	var data = JSON.parse(std_data)
	
	var eig_value=JSON.parse(eigenvalue)
	console.log(eig_value)

	var eig_vector= JSON.parse(eigenvector)
	console.log(eig_vector)

	var label = JSON.parse(labels)
	console.log(label)

	drawBiplot(data,eig_value,eig_vector,label,isColor)

}

function topFour(){
	d3.select('svg').remove()

	document.querySelector("h1").innerHTML="Highest squared sum of PCA loadings";

	document.getElementById("radio_buttons").style.visibility="hidden"; 

	console.log(getIntrinsic())
	console.log(getNumComponents())

	var data = JSON.parse(std_data)

	var eig_value=JSON.parse(eigenvalue)
	console.log(eig_value)

	var eig_vector= JSON.parse(eigenvector)
	console.log(eig_vector)

	// display table with top four Attributes with highest squared sum

	f = []
	values = []
	indices = []
	drawTable(data,getIntrinsic(),getNumComponents(),eig_value,eig_vector)

}


function drawScatterPlotMatrix(){
	document.querySelector("h1").innerHTML="Scatter Plot Matrix";

	document.getElementById("radio_buttons").style.visibility="visible";

	indices.sort()
	console.log(indices)

	var eig_value=JSON.parse(eigenvalue)
	console.log(eig_value)

	var features = []
	for(let i = 0;i<eig_value.length;i++){
			if(indices.includes(i)){
				features.push(eig_value[i].feature)
			}
	}

	console.log(getIntrinsic())
	console.log(getNumComponents())

	var data = JSON.parse(std_data)
	console.log(data)
	// send data of only the 4 required columns

	var new_data = []
	//new_data.push(f)
	for(let i = 0;i<data.length;i++){
		var temp=[]
		for(let j =0; j<6;j++){
			if(indices.includes(j)){
				temp.push(data[i][j])
			}
		}
		new_data.push(temp)
	}

	console.log(new_data)

	var label = JSON.parse(labels)
	console.log(label)

	drawScatterMatrix(new_data,features,indices,label,isColor)
}


function drawKMeans(){
	document.querySelector("h1").innerHTML="K Means";

	document.getElementById("radio_buttons").style.visibility="hidden"; 

	var K = JSON.parse(k) 
	console.log(K)

	var data = JSON.parse(std_data)

	var label = JSON.parse(labels)
	console.log(label)

	var eig_value=JSON.parse(eigenvalue)
	console.log(eig_value)

	var eig_vector= JSON.parse(eigenvector)
	console.log(eig_vector)

	var new_data = []
	//new_data.push(f)
	for(let i = 0;i<data.length;i++){
		var temp=[]
		for(let j =0; j<6;j++){
			if(indices.includes(j)){
				temp.push(data[i][j])
			}
		}
		new_data.push(temp)
	}

	console.log(new_data)


	var new_eigenvalue = []
	//new_data.push(f)
	for(let i = 0;i<eig_value.length;i++){
			if(indices.includes(i)){
				new_eigenvalue.push(eig_value[i])
			}	
	}

	console.log(new_eigenvalue)


	var new_eigenvector = []
	//new_data.push(f)
	for(let i = 0;i<eig_value.length;i++){
		var temp=[]
		for(let j =0; j<6;j++){
			if(indices.includes(j)){
				temp.push(eig_vector[i][j])
			}
		}
		if(indices.includes(i)){
			new_eigenvector.push(temp)
		}
	}

	console.log(new_eigenvector)

	// draw scatterplot with the k colors

	kmeans(new_data,K,label,new_eigenvector,new_eigenvalue)
}

function drawElbow(){
	document.querySelector("h1").innerHTML="Elbow Plot";

	document.getElementById("radio_buttons").style.visibility="hidden"; 

	var dist = JSON.parse(distortions)

	drawElbowPlot(dist)

}

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

	drawPCPplot(data,label)


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

	if(document.querySelector("h1").innerHTML=="PCA Biplot"){
		drawPcaBiplot()
	}
	else if(document.querySelector("h1").innerHTML=="Scatter Plot Matrix"){
		drawScatterPlotMatrix()
	}
	else if(document.querySelector("h1").innerHTML=="MDS Plot for data"){
		drawMDSdata()
	}


}