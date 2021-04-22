const urlParams = new URLSearchParams(window.location.search);
const issue_id = parseInt(urlParams.get("issue_id"));
const issue_header = document.getElementById("individual-issue-header");
$.getJSON("./asset/json/issues.json", function (data) {
    let issue = null;
    for (let i = 0; i < data.length; i++) {
        if (data[i].number === issue_id) {
            issue = data[i];
            break;
        }
    }
    if (issue !== null) {
        fillIssues([issue], issue_header, individual = true);
        const issue_comments = document.getElementById("individual-issue-comments");
        $.getJSON("./asset/json/comments/"+issue_id+"-comments.json", function (comments) {
            fillComments(comments, issue_comments);
        });
    }
});
