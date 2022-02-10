//signup 
//do this when form-username is submitted
$(document).ready(function(){
    $("#form-username").submit(function(event){
        //get the username from the field username-input
        //make an axios get request to check if username is taken
        axios.get("http://sendero.awunda.com/users/?filter[first_name]=tayler&meta=filter_count" + $("#username-input").val())
        .then(function(response){
            //alert(response.data);
            if(response.data == "taken"){
                alert("Username is taken");
            }
            else{
                alert("Username is available");
            }
        })
        .catch(function(error){
            console.log(error);
        }
        );
        event.preventDefault();
    });
});
