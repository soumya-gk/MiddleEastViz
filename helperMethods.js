////***************************************************************************************************************
////**************************************  d3 Helper Methods  ****************************************************
////***************************************************************************************************************
function mouseovered(){
    d3.select(this)
        .style("font-size", "120%")

    //TODO Change the opacity of the lines as well
    var entity = d3.select(this).text();
//  d3.selectAll(".link")

    var hoverFlag = []
    for (var i = 0; i < data2.length; i++){
        if (data2[i].name === entity){
            for (var j = 0; j < data2[i].imports.length; j++) {
                hoverFlag.push(1);
            }
        }
        else{
            for (var j = 0; j < data2[i].imports.length; j++){
                if (data2[i].imports[j] == entity){
                    hoverFlag.push(1);
                }
                else {
                    hoverFlag.push(0);
                }
            }
        }
    }

    d3.selectAll('.link')
        .attr('stroke-opacity', function(d, i){
            if (hoverFlag[i] == 1) return "1";
            else return "0.16";
        })
}

function mouseouted(){
    d3.select(this)
        .style("font-size", "80%")

    d3.selectAll('.link')
        .attr('stroke-opacity', "0.4")

}

////***************************************************************************************************************
////**************************************  Data Helper Methods  **************************************************
////***************************************************************************************************************

function generateData(classes, data2){
    console.log("##########################################################################");
    console.log("Creating the data");

    //TODO change imports to neighbors in json and code
    data2 = []; //initialize the data2 array
    var names = []; //keeps track of all the organizations added to the array
    for (var i = 0; i < classes.length; i++){
        data2[i] = new Object();        //create an object

        //add the values to the object
        data2[i].name = classes[i]['name'];
        data2[i].imports = classes[i]['imports'];
        data2[i].values = classes[i]['values'];
        data2[i].eventCount = classes[i]['eventCount'];

        //check to see if the name just added exists
        if (names.indexOf(data2[i].name) < 0){
            names.push(data2[i].name);
        }
    }
    //console.log("This is how data2 initially looks: ");
    //for (var i = 0; i < data2.length; i++){
    //    console.log(data2[i])
    //}

    //add the neighbors that arent there but have relationships through the main entities
    for (var i = 0; i < data2.length; i++){
        var currNeighbors = data2[i].imports;
        for (var j = 0; j < currNeighbors.length; j++){
            if (names.indexOf(currNeighbors[j]) < 0){
                //console.log(currNeighbors[j] + " does not exists!")
                var newObj = new Object();
                newObj.name = currNeighbors[j];
                newObj.imports = [];
                newObj.values = [];
                newObj.eventCount = [];
                //console.log("our new object is: " + newObj);
                data2.push(newObj);

                //remember to add this to the names array
                names.push(currNeighbors[j])
            }
            //else {
            //    console.log(currNeighbors[j] + " already exists!")
            //}
        }
    }
    //switch position of Syrian Oppn for aesthetic appeal
    var temp = data2[1]; // current position
    data2[1] = data2[23];
    data2[23] = temp;


    console.log("This is how data2 looks after adding neighbor entities: ");
    for (var i = 0; i < data2.length; i++){
        console.log(data2[i])
    }
    console.log("##########################################################################");
    console.log("Color flag info")
    for (var i = 0; i < data2.length; i++){
        for (var j = 0; j < data2[i].values.length; j++){
            if (data2[i].values[j] > 0) colorFlag.push(1);
            else colorFlag.push(-1);
        }
    }
    console.log(colorFlag);
    console.log("##########################################################################");
    console.log("Stroke flag info")


    for (var i = 0; i < data2.length; i++){
        for (var j = 0; j < data2[i].values.length; j++){
            //console.log(data2[i].eventCount[j]);

            strokeFlag.push(2);

            //if (data2[i].eventCount[j] > 100) strokeFlag.push(6);
            //else if (data2[i].eventCount[j] > 50) strokeFlag.push(4);
            //else strokeFlag.push(2);

            //if (data2[i].eventCount[j] < 25) strokeFlag.push(0.5);
            //else strokeFlag.push(Number(data2[i].eventCount[j]) / 50);
        }
    }
    console.log(strokeFlag);
    console.log("##########################################################################");

    for (var i = 0; i < data2.length; i++){
        data3[i] = new Object();
        data3[i].name = data2[i].name;
        data3[i].imports = [];
        data3[i].eventCount = [];
        data3[i].values = [];
        data3[i].headlines = [];
        data3[i].sourceURL = [];
        data3[i].participants = [];
    }

    return data2;
}

function generateTimelineData(dat, key){
    for (var k = 0; k < data3.length; k++){
        data3[k].imports = [];
        data3[k].eventCount = [];
        data3[k].values = [];
        data3[k].sourceURL = [];
        data3[k].headlines = [];
        data3[k].participants = [];
    }

    if (dat[key] != undefined){
        var events = dat[key];
        //console.log(events);
        for (var i = 0; i < events.length; i++){
            //find protagonist index
            var protagonistIndex;
            for (var j = 0; j < data2.length; j++){
                if (events[i]['Actor1Name'] == data2[j].name){
                    protagonistIndex = j;
                    break;
                }
            }
            //generate index of the neighbor
            data3[protagonistIndex].values.push(events[i]['QuadClass']);
            data3[protagonistIndex].imports.push(events[i]['Actor2Name']);
            data3[protagonistIndex].eventCount.push(1);
            data3[protagonistIndex].sourceURL.push(events[i]['SOURCEURL']);
            data3[protagonistIndex].headlines.push(events[i]['title']);
            data3[protagonistIndex].participants.push(data3[protagonistIndex].name + ' and ' + events[i]['Actor2Name']);
        }
        //console.log("data 3 looks like:");
        //console.log(data3);
        colorFlag2 = [],
        participants = [],
        titleList = [],
        urlList = [];

        for (var i = 0; i < data3.length; i++){
            for (var j = 0; j < data3[i].values.length; j++){
                if (data3[i].values[j] > 0) colorFlag2.push(1);
                else colorFlag2.push(-1);
            }
        }

        for (var i = 0; i < data3.length; i++){
            for (var j = 0; j < data3[i].sourceURL.length; j++){
                urlList.push(data3[i].sourceURL[j]);
            }
        }

        for (var i = 0; i < data3.length; i++){
            for (var j = 0; j < data3[i].headlines.length; j++){
                titleList.push(data3[i].headlines[j]);
            }
        }

        for (var i = 0; i < data3.length; i++){
            for (var j = 0; j < data3[i].participants.length; j++){
                participants.push(data3[i].participants[j]);
            }
        }

        //console.log(data3);
    }
    else {
        colorFlag2 = [],
        participants = [],
        titleList = [],
        urlList = [];
    }
    return data3;
}


// Lazily construct the package hierarchy from class names.
function packageHierarchy(classes) {
    var map = {};

    function find(name, data) {
        var node = map[name], i;
        if (!node) {
            node = map[name] = data || {name: name, children: []};
            if (name.length) {
                node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
                node.parent.children.push(node);
                node.key = name.substring(i + 1);
            }
        }
        return node;
    }

    classes.forEach(function(d) {
        find(d.name, d);
    });

    return map[""];
}

// Return a list of imports for the given array of nodes.
function packageImports(nodes) {
    var map = {},
        imports = [];

    // Compute a map from name to node.
    nodes.forEach(function(d) {
        map[d.name] = d;
    });

    // For each import, construct a link from the source to target node.
    nodes.forEach(function(d) {
        if (d.imports) d.imports.forEach(function(i) {
            imports.push({source: map[d.name], target: map[i]});
        });
    });

    return imports;
}

////***************************************************************************************************************
////****************************************  Slider Methods  *****************************************************
////***************************************************************************************************************


function brushed() {
    var value = brush.extent()[0];

    if (d3.event.sourceEvent) { // not a programmatic event
        value = timeScale.invert(d3.mouse(this)[0]);
        brush.extent([value, value]);
    }

    handle.attr("transform", "translate(" + timeScale(value) + ",0)");
    handle.select('text').text(formatDate(value));

    generateTimelineGraph(getDateValue(value));


    //console.log(getDate(value));
    //console.log("the value is: " + value.toString());


    //if (value !== previousKey){
    //    previousKey = value;
    //    generateTimelineGraph(getDateValue(value));
    //}
}

function getDateValue(value){
    var dateTokens = value.toString().split(' ');
    var month = dateTokens[1],
        day = Number(dateTokens[2]);

    if (month == 'Jan'){
        month = 0;
    }
    else if (month == 'Feb'){
        month = 31
    }
    else if (month == 'Mar'){
        month = 59
    }
    else if (month == 'Apr'){
        month = 90
    }
    else if (month == 'May'){
        month = 120
    }
    else if (month == 'Jun'){
        month = 151
    }
    else if (month == 'Jul'){
        month = 181
    }
    else if (month == 'Aug'){
        month = 212
    }
    else if (month == 'Sep'){
        month = 243
    }
    else if (month == 'Oct'){
        month = 273
    }
    else if (month == 'Nov'){
        month = 304
    }
    else if (month == 'Dec'){
        month = 334
    }

    var newValue = month + day;
    //console.log(getDate(newValue));
    return getDate(newValue);
}

function getDate (sliderNumber){
    if (sliderNumber > 334) {
        if (sliderNumber - 334 < 10) return '2015120' + (sliderNumber - 334);
        return '201512' + (sliderNumber - 334);
    }
    else if (sliderNumber > 304) {
        if (sliderNumber - 304 < 10) return '2015110' + (sliderNumber - 304);
        return '201511' + (sliderNumber - 304);
    }
    else if (sliderNumber > 273) {
        if (sliderNumber - 273 < 10) return '2015100' + (sliderNumber - 273);
        return '201510' + (sliderNumber - 273);
    }
    else if (sliderNumber > 243) {
        if (sliderNumber - 243 < 10) return '2015090' + (sliderNumber - 243);
        return '201509' + (sliderNumber - 243);
    }
    else if (sliderNumber > 212) {
        if (sliderNumber - 212 < 10) return '2015080' + (sliderNumber - 212);
        return '201508' + (sliderNumber - 212);
    }
    else if (sliderNumber > 181) {
        if (sliderNumber - 181 < 10) return '2015070' + (sliderNumber - 181);
        return '201507' + (sliderNumber - 181);
    }
    else if (sliderNumber > 151) {
        if (sliderNumber - 151 < 10) return '2015060' + (sliderNumber - 151);
        return '201506' + (sliderNumber - 151);
    }
    else if (sliderNumber > 120) {
        if (sliderNumber - 120 < 10) return '2015050' + (sliderNumber - 120);
        return '201505' + (sliderNumber - 120);
    }
    else if (sliderNumber > 90) {
        if (sliderNumber - 90 < 10) return '2015040' + (sliderNumber - 90);
        return '201504' + (sliderNumber - 90);
    }
    else if (sliderNumber > 59) {
        if (sliderNumber - 59 < 10) return '2015030' + (sliderNumber - 59);
        return '201503' + (sliderNumber - 59);
    }
    else if (sliderNumber > 31) {
        if (sliderNumber - 31 < 10) return '2015020' + (sliderNumber - 31);
        return '201502' + (sliderNumber - 31);
    }
    else {
        if (sliderNumber < 10) return '2015010' + (sliderNumber);
        return '201501' + sliderNumber;
    }
}