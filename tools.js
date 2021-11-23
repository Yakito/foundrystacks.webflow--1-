

var myUrl = new URL(document.location.href);
var myParam = myUrl.searchParams.get("id") || 1;
axios({
    method: "GET",
    url: "https://baserow-sendero.herokuapp.com/api/database/rows/table/78/" + myParam + "/?user_field_names=true",
    headers: {
        Authorization: "Token 9iB7W4m6msWKTeTjfDQ8ey9AUipxjPqc"
    }
}).then(function (response) {
    // console.log(response);
    let newdata = response.data;
    console.log(newdata);
    document.addEventListener('click', function () {
        document.location.href = "/single?id=" + restaurant.id;
    });
    const toolName = document.getElementById('toolName')
    toolName.textContent = newdata.Name;
    document.getElementsByClassName('spantoolname')[0].textContent = newdata.Name;
    document.getElementsByClassName('spantoolname')[1].textContent = newdata.Name;
    document.getElementsByClassName('spantoolname')[2].textContent = newdata.Name;
    const toolDescriptionShort = document.getElementById('toolDescriptionShort')
    toolDescriptionShort.textContent = newdata.Description;
    //if newdata.Image is not empty then set it as the background image of toolImage
    if (newdata.Image != "") {
        document.getElementById('toolImage').style.backgroundImage = "url(" + newdata.Image + ")";
    }
    // else set the following as the background image "//logo.clearbit.com/" + response Image
    else {
        document.getElementById('toolImage').style.backgroundImage = "url(//logo.clearbit.com/" + newdata.Link + ")";
    }
        //set the background color to white
    document.getElementById('toolImage').style.backgroundColor = "white";
    
        //set the text of the gototool button to the name of the tool
    document.getElementsByClassName('gototool')[0].textContent = "Go to " + newdata.Name;
        //set the link of the button to the newdata.a_link
    document.getElementsByClassName('gototool')[0].href = newdata.a_link;
    
    
            if (newdata.long_description == null) {
            document.getElementById("what-is").style.display = "none";
        }
             if (newdata.Companies.length == 0) {
            document.getElementById("who-uses").style.display = "none";
        }
        
        if (newdata.faqs.length == 0) {
            document.getElementById('faqs').style.display = 'none';
        }
        if (newdata.twitter.length == 0) {
            document.getElementById('reviews').style.display = 'none';
        }        
    //
    //get FAQ
    //
    const faqContainer = document.getElementById("d-question-container")
    const eachFaqContainer = document.getElementById("faqContainer")
    console.log(newdata);
    const eachFaq = newdata.faqs;
    console.log(eachFaq);
    eachFaq.forEach(toolsincat => {
        //read each faq
        axios({
            method: "GET",
            url: "https://baserow-sendero.herokuapp.com/api/database/rows/table/81/" + toolsincat.id + "/?user_field_names=true",
            headers: {
                Authorization: "Token 9iB7W4m6msWKTeTjfDQ8ey9AUipxjPqc"
            }
        }).then(function (responseEachFaq) {
            const card = eachFaqContainer.cloneNode(true)
            console.log(card);
            const toolFaq = card.getElementsByClassName('toolfaq')[0]
            toolFaq.textContent = responseEachFaq.data.Question;
            //answer
            const toolFaqAnswer = card.getElementsByClassName('toolfaqanswer')[0]
            toolFaqAnswer.textContent = responseEachFaq.data.Answer;
            faqContainer.appendChild(card);
            card.style.display = 'block';
        })
    })
});

