var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoName = function() {
 //get the query string of the name the user puts in
 var queryString = document.location.search;
    var repoName = queryString.split("=")[1];
  
  //make sure the repo exists
    if (repoName) {
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
    } else {
        document.location.replace("./index.html");
    }
};


var getRepoIssues = function(repo) {
    var apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

       fetch(apiURL).then(function(response) {
     //if request success
     if (response.ok) {
         response.json().then(function(data) {
             //pass response data to dom
             displayIssues(data);
            //check if api has paginated issues (to look for 30)
            if (response.headers.get("Link")) {
                displayWarning(repo);
            }
       });
    
     } else {
        document.location.replace("./index.html")
     }
 });


var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo doesn't have any issues.";
        return;
    }
    for (var i=0; i < issues.length; i++) {
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
    

        //create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        //append to container
        issueEl.appendChild(titleEl);
        //append container to div
        issueContainerEl.appendChild(issueEl);
        //create a type element
        var typeEl = document.createElement("span");
        //check if issue is issue or pull
        if (issues[i].pull_request) {
        typeEl.textContent= "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
    };
}

var displayWarning = function(repo) {
    //add text to a container to warn user of a limit of 30 items
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See more issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "issues");
    linkEl.setAttribute("target", "_blank");

    //append to warning container
    limitWarningEl.appendChild(linkEl);
};
}


getRepoName();