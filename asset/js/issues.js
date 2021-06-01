function fillIssues(data, elem, individual = false) {
    data.forEach(issue => {
        let container = document.createElement("a");
        container.className = "issue";
        container.href = "./issue.html?issue_id="+issue.number;
        if (individual || issue.comments === 0) {
            container.href = issue.html_url;
        }
        let title_div = document.createElement("div");
        title_div.className = "title issue-title";
        let title = document.createElement("h3");
        title.innerText = issue.title.trim();
        let body = document.createElement("span");
        body.className = "issue-body";
        body.innerHTML = issue.body;
        let starting_datetime = moment.utc(issue.starting_datetime, "YYYY-MM-DD hh:mm").local();
        if (issue.starting_datetime) {
            body.innerHTML += "<br/><br/>" + starting_datetime.fromNow() + " (" + starting_datetime.format("dddd, MMMM Do YYYY, hh:mm a") + ")";
        }
        if (issue.estimated_duration) {
            body.innerHTML += "<br/>Estimated duration: " + issue.estimated_duration;
        }
        let details = document.createElement("span");
        let created_at = moment(issue.created_at).local();
        details.className = "details";
        details.title = created_at.format("dddd, MMMM Do YYYY, hh:mm a");
        details.innerText = "#" + issue.number + " opened " + created_at.fromNow() + " by " + issue.user.login + " (comments: " + issue.comments + ")";
        let img = document.createElement("span");
        img.className = "icon";
        if (issue.state === "open"){
            img.innerHTML = 
            "<svg class=\"issue-opened\" viewBox=\"0 0 16 16\" version=\"1.1\" aria-hidden=\"true\">\
                <title>This issue is currently opened</title>\
                <path fill-rule=\"evenodd\" d=\"M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z\"></path>\
            </svg>";
        }else if(issue.state === "closed"){
            img.innerHTML = 
            "<svg class=\"issue-closed\" viewBox=\"0 0 16 16\" version=\"1.1\" aria-hidden=\"true\">\
                <title>This issue is currently closed</title>\
                <path fill-rule=\"evenodd\" d=\"M1.5 8a6.5 6.5 0 0110.65-5.003.75.75 0 00.959-1.153 8 8 0 102.592 8.33.75.75 0 10-1.444-.407A6.5 6.5 0 011.5 8zM8 12a1 1 0 100-2 1 1 0 000 2zm0-8a.75.75 0 01.75.75v3.5a.75.75 0 11-1.5 0v-3.5A.75.75 0 018 4zm4.78 4.28l3-3a.75.75 0 00-1.06-1.06l-2.47 2.47-.97-.97a.749.749 0 10-1.06 1.06l1.5 1.5a.75.75 0 001.06 0z\"></path>\
            </svg>";
        }
        title_div.append(title);
        title_div.append(img);
        container.append(title_div);
        container.append(body);
        container.append(details);
        elem.appendChild(container);
        elem.style.maxHeight = elem.scrollHeight + "px";
        if (issue !== data[data.length-1]) {
            insertSeparator(elem);
        }
    });
}

function fillComments(comments, elem) {
    comments.forEach(comment => {
        insertSeparator(elem);
        let container = document.createElement("div");
        container.className = "comment";
        let body = document.createElement("span");
        body.className = "comment-body";
        body.innerText = comment.body;
        let created_at = moment(comment.created_at).local();
        let details = document.createElement("span");
        details.className = "details";
        details.title = created_at.format("dddd, MMMM Do YYYY, hh:mm a")
        details.innerText = "#" + comment.id + " written " + created_at.fromNow() + " by " + comment.user.login;
        container.append(body);
        container.append(details);
        elem.appendChild(container);
    });
}

function insertSeparator(element) {
    let separator = document.createElement("hr");
    separator.className = "separator";
    element.append(separator);
}
