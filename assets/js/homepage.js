var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

//give the user a way to put in a name to search
var formSubmitHandler = function(event) {
    event.preventDefault();
    //get value from input element (Smith)
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl = "";
    } else {
        alert("Please enter a GitHub username");
    }
    console.log(event);
};

//search for repos with the name value given by the user
var getUserRepos = function(user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    //make a request to the URL
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
        response.json().then(function(data) {
            displayRepos(data,user);
        });
        } else {
            alert("Error: GitHub user does not exist.");
        }
    })
    .catch(function(error) {
        //note that catch has to be a part of the .then()
        alert("Unable to make a connection to GitHub, please try later!");
    });
};

//display the repos found by the search
var displayRepos = function(repos, searchTerm) {
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories were found for your user";
        return;
    }
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    //loop thru the repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create li for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //create span element for the repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to the container
        repoEl.appendChild(titleEl);

        //create a status element (are there issues?)
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check for issues
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML= "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
            } else {
                statusEl.innerHTML= "<i class= 'fas fa-check-square status-icon icon-success'></i>";

            }
        repoEl.appendChild(statusEl);
        //append container to the DOM
        repoContainerEl.appendChild(repoEl);
    }

};
userFormEl.addEventListener("submit", formSubmitHandler);