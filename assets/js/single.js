var issueContainerEl = document.querySelector("#issues-container");


var getRepoIssues = function(repo) {
    var apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiURL).then(function(response) {
     //if request success
     if (response.ok) {
         response.json().then(function(data) {
             //pass response data to dom
             displayIssues(data);

       });
    
     } else {
        alert("We ran into a problem!");
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
}


getRepoIssues("facebook/react");