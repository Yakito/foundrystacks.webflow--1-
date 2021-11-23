//get featured stacks
//make axios request with authorization header
axios.get("https://baserow-sendero.herokuapp.com/api/database/rows/table/83/?user_field_names=true&size=3&featured=true", {
    headers: {
        Authorization: "Token 9iB7W4m6msWKTeTjfDQ8ey9AUipxjPqc"
    }
    //handle success
}).then(function (response) {
    //get the element with d-featuredstacks
    var featuredstacks = document.getElementById("featuredstacks");
    //for each of the response data, create a new grid element and put it isinde d-featuredstacks
    response.data.results.forEach(data => {
        var gridElement = featuredstacks.querySelector(".d-featured-each").cloneNode(true);
        gridElement.querySelector(".featuredstack-name").innerHTML = data.Name;
        gridElement.querySelector(".featuredstack-description").innerHTML = data.Description;
        //set background image of d-each-stack-f-img to the response image
        gridElement.querySelector(".d-each-stack-f-img").style.backgroundImage = "url(" + data.Image + ")";

        //append the grid element to the featuredstacks element
        featuredstacks.appendChild(gridElement);
    });
});




        



//filter stacks
        //create axios get request with authoization header
        axios.get('https://baserow-sendero.herokuapp.com/api/database/rows/table/89/?user_field_names=true', {
                headers: {
                    Authorization: 'Token 9iB7W4m6msWKTeTjfDQ8ey9AUipxjPqc'
                }
            })

            .then(function (response) {
                //handle success
                console.log(response);
                //get the select box
                const categorySelect = document.getElementsByName('category')[0];
                //loop through the categories
                for (let i = 0; i < response.data.results.length; i++) {
                    //create an option element
                    const option = document.createElement('option');
                    //set the value of the option to the category name
                    option.value = response.data.results[i].Name;
                    //set the text of the option to the category name
                    option.text = response.data.results[i].Name;
                    //append the option to the select box
                    categorySelect.appendChild(option);
                }
            })

    
///////////////////   
//Filter Difficulty
        //when the user clicks on the select box then filter the "each-stack" by data-difficulty
        document.getElementsByName('rating')[0].addEventListener('change', function (e) {
            e.preventDefault();
            //get the value of the select box
            const searchValue = document.getElementsByName('rating')[0].value;
            //get all the "each-stack"
            const eachStacks = document.getElementsByClassName('each-stack');
            //loop through the "each-stack"
            for (let i = 0; i < eachStacks.length; i++) {
                //show all the "each-stack" with values bigger than the search value
                if (eachStacks[i].dataset.difficulty < searchValue) {
                    eachStacks[i].style.display = 'flex';
                } else {
                    eachStacks[i].style.display = 'none';
                }

            }
        })

//populate categories container
axios({
    method: "GET",
    url: "https://baserow-sendero.herokuapp.com/api/database/rows/table/80/?user_field_names=true",
    headers: {
        Authorization: "Token 9iB7W4m6msWKTeTjfDQ8ey9AUipxjPqc"
    }
}).then(function (response) {
    // console.log(response);
    let newdata = response.data.results;
    // console.log(newdata);
    const cardContainer = document.getElementById("categoriesContainer")
    newdata.forEach(restaurant => {

        const style = document.getElementById('eachCategory')
        const card = style.cloneNode(true)

        card.setAttribute('id', '');
        card.style.display = 'block';

        card.addEventListener('click', function () {
            document.location.href = "/single?id=" + restaurant.id;
        });


        const h3 = card.getElementsByTagName('H3')[0]
        h3.textContent = restaurant.Name;




        cardContainer.appendChild(card);

    })
    //$('.d-each-post')[0].remove();    
});

//CREATE STACKS
        //create axios request with authoization header to the stacks table
        axios.get('https://baserow-sendero.herokuapp.com/api/database/rows/table/83/?user_field_names=true', {
                headers: {
                    Authorization: 'Token 9iB7W4m6msWKTeTjfDQ8ey9AUipxjPqc'
                }
            })
            //clone d-stacks-container with the data from the stacks table and insert it inside the element with id = stacksContainer
            .then(function (response) {
                //handle success
                console.log(response);
                //get the element with id = stacksContainer
                const stacksContainer = document.getElementById('stacksContainer');
                //loop through the stacks
                for (let i = 0; i < response.data.results.length; i++) {
                    //create a clone of the d-stacks-container
                    const clone = document.getElementsByClassName('d-stacks-container')[0].cloneNode(true);
                    //set the src of the image to the image url of the stack
                    clone.getElementsByClassName('d-stack-container_img')[0].style.backgroundImage = 'url(' + response.data.results[i].Image + ')';
                    //set the title of the stack to the stack name
                    clone.getElementsByClassName('stack-title')[0].textContent = response.data.results[i].Name;
                    //set the description of the stack to the stack description
                    clone.getElementsByClassName('stack-description')[0].textContent = response.data.results[i].Description;
                    
                    //set attribute data-difficulty to the stack difficulty
                    clone.dataset.difficulty = response.data.results[i].difficulty;
                    //set author name
                    clone.getElementsByClassName('author')[0].textContent = response.data.results[i].author[0].value;
                    //set the href link to "stack" page with the ID of the stack table
                    clone.href = 'stack?id=' + response.data.results[i].id;

                    //append the clone to the stacksContainer
                    stacksContainer.appendChild(clone);
                }
            })
         