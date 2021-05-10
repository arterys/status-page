while IFS= read line; do
    if [[ ! -z "$line" ]]; then
        comments=$(jq --argjson line $line -r '.[] | select(.number==$line) | .comments' ./asset/json/issues.json)
        if [[ "$comments" != "0" ]]; then
            wget https://api.github.com/repos/$GITHUB_REPOSITORY/issues/$line/comments -O ./asset/json/comments/$line-comments.json
        fi
    fi
done <<< $(jq -r '.[].number' ./asset/json/issues.json)