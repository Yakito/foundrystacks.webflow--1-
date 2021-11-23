//
//GET UPCOMING TOOLS
//

//axios get request with authorization header
axios({
    method: "GET",
    url: "https://baserow-sendero.herokuapp.com/api/database/rows/table/78/?user_field_names=true&size=10&order_by=-createdon",
    headers: {
        Authorization: "Token 9iB7W4m6msWKTeTjfDQ8ey9AUipxjPqc"
    }

}).then(function (response) {
    //get the element with d-upcomingtools-contianer
    var upcomingtools = document.getElementById("upcomingtools");

    //for each of the response data, create a new grid element and put it isinde d-upcomingtool-container
    response.data.results.forEach(data => {
        var gridElement = upcomingtools.querySelector(".grid-stacks_tools").cloneNode(true);
        //set upcomingtool-name to the response name
        gridElement.querySelector(".upcomingtool-name").innerHTML = data.Name;
        //set upcomingtool-description to the response description
        gridElement.querySelector(".upcomingtool-description").innerHTML = data.Description;
        //console log the category
        //for each data category, add the category to the upcomingtool-category
        data.Categories.forEach(category => {
            gridElement.querySelector(".upcomingtool-category").innerHTML += category.value + " ";
        });


        //set upcomingtool-link to the response "/tool" + id of the response
        gridElement.querySelector(".upcomingtool-link").href = "/tool?id=" + data.id;
        //set the  background image with the following format "//logo.clearbit.com/" + response logo

        if (data.Image != "") {
            gridElement.querySelector(".upcomingtool-img").style.backgroundImage = "url(" + data.Image + ")";
        }

        // else set the following as the background image "//logo.clearbit.com/" + response Image
        else {
            gridElement.querySelector(".upcomingtool-img").style.backgroundImage =
                "url(//logo.clearbit.com/" + data.Link + ")";
        }
        //set the display to grid
        gridElement.style.display = "grid";


        //append the gridElement to the grid
        upcomingtools.appendChild(gridElement);
    });

    //remove element with class grid-stacks_tools_skeleton 
    upcomingtools.querySelector(".grid-stacks_tools_skeleton").remove();

});




//
// GET LIST OF REVIEWS
//
axios({
    method: "GET",
    url: "https://baserow-sendero.herokuapp.com/api/database/rows/table/82/?user_field_names=true&size=5",
    headers: {
        Authorization: "Token 9iB7W4m6msWKTeTjfDQ8ey9AUipxjPqc"
    }
}).then(function (response) {
    // console.log(response);
    let newdata = response.data.results;
    // console.log(newdata);
    const reviewContainer = document.getElementById("review-container")
    newdata.forEach(restaurant => {
        const style = document.getElementById('each-review')
        const card = style.cloneNode(true)
        console.log("here");
        console.log(restaurant.link);
        card.style.display = 'block';



        //inside each-review create a blockquote with class "twitter-tweet"
        const blockquote = document.createElement('blockquote');
        blockquote.className = "twitter-tweet";
        //put it inside "each-review"
        card.appendChild(blockquote);
        //inside blockquote create a link pointing to the tweet
        //grab html from database
        const html = restaurant.html;
        //append it to blockquote
        blockquote.innerHTML = html;

        reviewContainer.appendChild(blockquote);

    })

});


//get cats
axios({
    method: "GET",
    url: "https://baserow-sendero.herokuapp.com/api/database/rows/table/80/?user_field_names=true&size=7",
    headers: {
        Authorization: "Token 9iB7W4m6msWKTeTjfDQ8ey9AUipxjPqc"
    }
}).then(function (response) {
    // console.log(response);
    let newdata = response.data.results;
    // console.log(newdata);
    const catContainer = document.getElementById("Cats-Container")
    newdata.forEach(eachcat => {
        const style = document.getElementById('catstyle')
        // Copy the card and it's style
        const cardCats = style.cloneNode(true)
        cardCats.setAttribute('id', eachcat.id + '-ToolCat');
        cardCats.style.display = 'block';
        cardCats.addEventListener('click', function () {
            document.location.href = "/single?id=" + eachcat.id;
        });
        const h3 = cardCats.getElementsByTagName('H3')[0]
        h3.textContent = eachcat.Name;
        //parse tools in cat
        const eachcatTools = eachcat.Tools
        console.log("this tools");
        console.log(eachcatTools);
        const toolscont = document.getElementById("toolsImageContainer")
        let countTools = 0;
        eachcatTools.forEach(toolsincat => {
            if (countTools < 10) {
                axios({
                    method: "GET",
                    url: "https://baserow-sendero.herokuapp.com/api/database/rows/table/78/" +
                        toolsincat.id + "/?user_field_names=true&size=4",
                    headers: {
                        Authorization: "Token 9iB7W4m6msWKTeTjfDQ8ey9AUipxjPqc"
                    }
                }).then(function (responseEachTool) {
                    //console.log(response);
                    let newdata1 = responseEachTool.data;
                    console.log(newdata1);
                    const tool = newdata1.Name;
                    console.log(tool);
                    const newCard = toolscont.cloneNode(true)
                    //assign value to H3 title
                    //const h3 = newCard.getElementsByTagName('H3')[0]
                    //h3.textContent = tool;
                    //assign background image to card
                    const itemImage = newCard.getElementsByClassName('d-toolslogo')[0]
                    itemImage.style.backgroundImage = "url(" + newdata1.Image + ")"
                    cardCats.appendChild(newCard);
                })
                countTools++;
            }
        })
        //$('.d-each-post')[0].remove();    
        catContainer.appendChild(cardCats);
    });
});
//
// GET LIST OF TOOLS
//
axios({
    method: "GET",
    url: "https://baserow-sendero.herokuapp.com/api/database/rows/table/78/?filter__field_510__boolean=true&user_field_names=true&size=6",
    headers: {
        Authorization: "Token 9iB7W4m6msWKTeTjfDQ8ey9AUipxjPqc"
    }
}).then(function (response) {
    // console.log(response);
    let newdata = response.data.results;
    // console.log(newdata);
    const cardContainer = document.getElementById("Cards-Container")
    newdata.forEach(restaurant => {
        const style = document.getElementById('samplestyle')
        const card = style.cloneNode(true)
        card.setAttribute('id', '');
        card.style.display = 'block';
        card.addEventListener('click', function () {
            document.location.href = "/tool?id=" + restaurant.id;
        });
        const h3 = card.getElementsByTagName('H3')[0]
        h3.textContent = restaurant.Name;
        const itemDesc = card.getElementsByClassName('t-general')[1]
        itemDesc.textContent = restaurant.Description;
        const itemType = card.getElementsByClassName('tool-type')[0]
        itemType.textContent = restaurant.Category;
        const itemImage = card.getElementsByClassName('d-company-logo')[0]
        itemImage.style.backgroundImage = "url(" + restaurant.Image + ")";
        const itemViewMore = card.getElementsByClassName('t-general')[2]
        itemViewMore.textContent = restaurant.Name + " Reviews";
        cardContainer.appendChild(card);
    })
});


//GET LATEST STACKS
//crate axios get request with authorization headers
axios({
    method: "GET",
    url: "https://baserow-sendero.herokuapp.com/api/database/rows/table/83/?user_field_names=true&size=7",
    headers: {
        Authorization: "Token 9iB7W4m6msWKTeTjfDQ8ey9AUipxjPqc"
    }
}).then(function (response) {
    // console.log(response);
    let newdata = response.data.results;
    // console.log(newdata);
    const stackContainer = document.getElementById("stacksContainer")
    newdata.forEach(eachstack => {
        //copy "d-stacks-container" and create a new one with the dat from the response
        const style = document.getElementById('stackstyle')
        const card = style.cloneNode(true)
        card.setAttribute('id', eachstack.id + '-ToolStack');
        card.style.display = 'flex';
        //set the href attribute of "stacksContainer" to the "stack" page with the ID of the stack table

        card.href = "/stack?id=" + eachstack.id;


        const h3 = card.getElementsByTagName('H3')[0]
        h3.textContent = eachstack.Name;
        const itemDesc = card.getElementsByClassName('stack-description')[0]
        itemDesc.textContent = eachstack.Description;
        //set the background image of "d-stack-container_img" to the response Image
        const itemImage = card.getElementsByClassName('d-stack-container_img')[0]
        itemImage.style.backgroundImage = "url(" + eachstack.Image + ")";
        //set author to author name
        const itemAuthor = card.getElementsByClassName('author')[0]
        itemAuthor.textContent = eachstack.author[0].value;

        stackContainer.appendChild(card);
    })
    //delete element with class "skelet"
    $('.skelet').remove();
    //end comment

})