       //get myparam from url id
        var myParam = location.search.split('id=')[1];
        //create an axios get request with authorization token
        axios.get("https://baserow-sendero.herokuapp.com/api/database/rows/table/83/" + myParam +
                "/?user_field_names=true", {
                    headers: {
                        Authorization: "Token 9iB7W4m6msWKTeTjfDQ8ey9AUipxjPqc"
                    }
                })
            .then(function (response) {
                //handle success
                console.log(response);
                //change the <title> to the repsonse name
                document.title = response.data.Name;
                //set the class maintitle to the response data name
                document.getElementById("stacktitle").innerHTML = response.data.Name;
                //set stackdescription to the response data description
                document.getElementById("stackdescription").innerHTML = response.data.Description;


                //create steps
                //get the steps array from the response data
                var steps = response.data.steps;

                //for each step in the steps array create an axios request passing the step id
                steps.forEach(function (step) {
                    //generate a step number
                    var stepnumber = steps.indexOf(step) + 1;
                    axios.get("https://baserow-sendero.herokuapp.com/api/database/rows/table/88/" + step
                            .id + "/?user_field_names=true", {
                                headers: {
                                    Authorization: "Token 9iB7W4m6msWKTeTjfDQ8ey9AUipxjPqc"
                                }
                            })
                        .then(function (response) {
                            //handle success
                            console.log(response);
                            //for each step response clone the d-steps div and set the values
                            var newstep = document.getElementsByClassName("d-steps")[0].cloneNode(true);
                            //set the step number from the "Step" + step number variable + the response Name
                            newstep.getElementsByClassName("stepnumber")[0].innerHTML = "Step " +
                                stepnumber +
                                "- " + response.data.Name;
                            newstep.getElementsByClassName("stepdescription")[0].innerHTML = response
                                .data.Notes;

                            //set the newstep to display as block
                            newstep.style.display = "block";
                            //get an array with all the tools on each step
                            var tools = response.data.tools;

                            //for each tool in the tools array create an axios request passing the tool id
                            tools.forEach(function (tool) {
                                axios.get(
                                        "https://baserow-sendero.herokuapp.com/api/database/rows/table/78/" +
                                        tool.id + "/?user_field_names=true", {
                                            headers: {
                                                Authorization: "Token 9iB7W4m6msWKTeTjfDQ8ey9AUipxjPqc"
                                            }
                                        })
                                    .then(function (response) {
                                        //handle success
                                        console.log(response);
                                        //for each tool response clone the grid-stacks_tools
                                        var newtool = document.getElementsByClassName(
                                            "grid-stacks_tools")[0].cloneNode(true);
                                        newtool.getElementsByClassName("toolname")[0]
                                            .innerHTML = response.data.Name;
                                        newtool.getElementsByClassName("toolcategory")[0]
                                            .innerHTML = response.data.Category;
                                        //set "d-tool-logo" image background to the response image url
                                        newtool.getElementsByClassName("d-tool-logo")[0]
                                            .style.backgroundImage =
                                            "url(" + response.data.Image + ")";
                                        //append the newtool to the div with class "d-step-tools-container"
                                        newstep.getElementsByClassName(
                                            "d-step-tools-container")[0].appendChild(
                                            newtool);
                                        //set the newstep to display as a grid
                                        newtool.style.display = "grid";


                                    })
                                    .catch(function (error) {
                                        //handle error
                                        console.log(error);
                                    });
                            });

                            //add the new step to the d-stack-step-container
                            document.getElementsByClassName("d-stack-step-container")[0].appendChild(
                                newstep);
                        })
                        .catch(function (error) {
                            //handle error
                            console.log(error);
                        });
                });
                //seach for all elements with the class skeleton and set display to none
                var skeletons = document.getElementsByClassName("skeleton");
                for (var i = 0; i < skeletons.length; i++) {
                    skeletons[i].style.display = "none";
                }
                })