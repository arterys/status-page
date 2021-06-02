'use strict'

const fs = require('fs');
const args = process.argv.slice(2)
const file = args[0]
const raw_data = fs.readFileSync(file);
const comments = JSON.parse(raw_data);

comments.forEach( (comment,index) => {
    comments[index] = cleanup_comment(comment);
});

const result_json = JSON.stringify(comments, null, 2);
fs.writeFileSync(file, result_json);

function cleanup_comment(comment) {
    return Object({
      id: comment.id,
      body: comment.body,
      user: Object({login: comment.user.login}),
      created_at: comment.created_at,
    });
}