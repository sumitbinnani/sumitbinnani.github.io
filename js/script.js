$(document).ready(function() {
	/*
	$($('.jVCenter')).each(function(){
		$(this).css({
        'position' : 'absolute',
        //'left' : '50%',
        'top' : '50%',
        //'margin-left' : -$('.jVCenter').width()/2,
        'margin-top' : -$(this).height()/2
    });
	});*/
	
	//68, 132, 228, 0.69
	//474747

	
	
	//setStellar();
	loadEducation();
	loadSchAchievements();
	loadCoursework();
	loadWorkExp();
	loadProjects();
	loadPORS();
});

function setStellar(){
	$.stellar({
	  // Set scrolling to be in either one or both directions
	  horizontalScrolling: true,
	  verticalScrolling: true,

	  // Set the global alignment offsets
	  horizontalOffset: 0,
	  verticalOffset: 0,

	  // Refreshes parallax content on window load and resize
	  responsive: false,

	  // Select which property is used to calculate scroll.
	  // Choose 'scroll', 'position', 'margin' or 'transform',
	  // or write your own 'scrollProperty' plugin.
	  scrollProperty: 'scroll',

	  // Select which property is used to position elements.
	  // Choose between 'position' or 'transform',
	  // or write your own 'positionProperty' plugin.
	  positionProperty: 'position',

	  // Enable or disable the two types of parallax
	  parallaxBackgrounds: true,
	  parallaxElements: true,

	  // Hide parallax elements that move outside the viewport
	  hideDistantElements: true,

	  // Customise how elements are shown and hidden
	  hideElement: function($elem) { $elem.hide(); },
	  showElement: function($elem) { $elem.show(); }
	});
}

var spreadsheetID = "1PnaPhFPceQnbcz3FPQk8pEyxMwgeXagZyEx2j_n1GLg";
var workExp = [];
var education = [];
var schAchievements =[];
var coursework = [];
var projects = [];
var pors = [];

function loadPORS(){
	// Make sure it is public or set to Anyone with link can view
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/7/public/values?alt=json";
	
	var jqxhr = $.getJSON(url);
	
	// Set another completion function for the request above
	jqxhr.done(function() {
		entries = jqxhr.responseJSON.feed.entry;
		
		$(entries).each(function(){
			var por ={};
			por.post = this.gsx$post.$t;
			por.organization = this.gsx$organization.$t;
			por.description = this.gsx$description.$t;
			por.duration = this.gsx$startdate.$t+"-"+this.gsx$enddate.$t;
			pors.push(por);
		});
		
		ko.applyBindings(pors, document.getElementById("pors"));
		
		$('.tile-header').matchHeight();
		$('.tile-footer').matchHeight();
		$('.tile').matchHeight();
	});	
}

function loadProjects(){
	// Make sure it is public or set to Anyone with link can view
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/6/public/values?alt=json";
	
	var jqxhr = $.getJSON(url);
	
	// Set another completion function for the request above
	jqxhr.done(function() {
		entries = jqxhr.responseJSON.feed.entry;
		
		$(entries).each(function(){
			var project ={};
			project.title = this.gsx$title.$t;
			project.subTitle = this.gsx$subtitle.$t;
			project.description = this.gsx$description.$t;
			project.tags = (this.gsx$tags.$t).split(',').map(Function.prototype.call, String.prototype.trim);
			projects.push(project);
		});
		
		ko.applyBindings(projects, document.getElementById("projects"));
		
		$('.tile-header').matchHeight();
		$('.tile-footer').matchHeight();
		$('.tile').matchHeight();
	});	
}

function loadWorkExp(){	
	// Make sure it is public or set to Anyone with link can view
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/1/public/values?alt=json";
	
	var jqxhr = $.getJSON(url);
	
	// Set another completion function for the request above
	jqxhr.done(function() {
		entries = jqxhr.responseJSON.feed.entry;
		
		$(entries).each(function(){
			workExp.push(new WorkExperience(this));
		});
		
		ko.applyBindings(workExp, document.getElementById("workExperience"));
	});
}

function loadEducation(){	
	// Make sure it is public or set to Anyone with link can view
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/2/public/values?alt=json";
	
	var jqxhr = $.getJSON(url);
	
	// Set another completion function for the request above
	jqxhr.done(function() {
		entries = jqxhr.responseJSON.feed.entry;
		
		$(entries).each(function(){
			education.push(new Education(this));
		});
		
		ko.applyBindings(education, document.getElementById("education"));
	});
}

function loadSchAchievements(){
	
	// Make sure it is public or set to Anyone with link can view
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/3/public/values?alt=json";
	
	var jqxhr = $.getJSON(url);
	
	// Set another completion function for the request above
	jqxhr.done(function() {
		entries = jqxhr.responseJSON.feed.entry;
		
		$(entries).each(function(){
			schAchievements.push(this.gsx$description.$t);
		});
		
		ko.applyBindings(schAchievements, document.getElementById("schAchievements"));
		$('.info').matchHeight();
	});
}

function loadCoursework(){
	
	// Make sure it is public or set to Anyone with link can view
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/4/public/values?alt=json";
	
	var jqxhr = $.getJSON(url);
	
	// Set another completion function for the request above
	jqxhr.done(function() {
		entries = jqxhr.responseJSON.feed.entry;
		
		$(entries).each(function(){
			str = '<b>'+this.gsx$subject.$t+'</b>: ';
			str += this.gsx$courses.$t;
			coursework.push(str);
		});
		
		ko.applyBindings(coursework, document.getElementById("coursework"));
		$('.info').matchHeight();
	});
	
}

function WorkExperience(data) {
	this.type = data.gsx$type.$t;
    this.startDate = data.gsx$startdate.$t;
	this.endDate = data.gsx$enddate.$t;
	this.jobTitle = data.gsx$jobtitle.$t,
	this.company = data.gsx$company.$t;
	this.location = data.gsx$location.$t;
	this.jobDesc= data.gsx$jobdescribtion.$t;
}

function Education(data) {
	this.gradDate = data.gsx$graduationdate.$t;
	this.gradDegree = data.gsx$graduationdegree.$t,
	this.stream = data.gsx$stream.$t;
	this.institution = data.gsx$institution.$t;
	this.score = data.gsx$score.$t;
}