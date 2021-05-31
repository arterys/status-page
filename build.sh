#!/bin/bash
DIR=$(cd $(dirname ${BASH_SOURCE[0]}) && pwd)

# Config settings
GITHUB_REPOSITORY=${GITHUB_REPOSITORY-arterys/status-page}
DISPLAY_LABEL=displayed-issue
MAINTENANCE_LABEL=maintenance

{
    cd $DIR

    rm -rf ./asset/json
    mkdir -p ./asset/json ./asset/json/comments

    # Grab all the issues we care about (maintenance and displayed-issues)
    wget "https://api.github.com/repos/$GITHUB_REPOSITORY/issues?state=all&labels=$DISPLAY_LABEL" -O ./asset/json/displayed-issues.json
    wget "https://api.github.com/repos/$GITHUB_REPOSITORY/issues?state=all&labels=$MAINTENANCE_LABEL" -O ./asset/json/maintenances.json
    node ./cleanup_issues_json.js ./asset/json/displayed-issues.json
    node ./cleanup_issues_json.js ./asset/json/maintenances.json
    jq -s '.[][]' ./asset/json/displayed-issues.json ./asset/json/maintenances.json | jq -s -S 'sort_by(.number) | reverse' > ./asset/json/issues.json

    for row in $(cat ./asset/json/issues.json | jq -r '.[] | @base64'); do
        _jq() {
            echo ${row} | base64 --decode | jq -r ${1}
        }
        comments=$(_jq '.comments')
        if [[ $comments != 0 ]]; then
            wget $(_jq '.comments_url') -O ./asset/json/comments/$(_jq '.number')-comments.json
            node ./cleanup_comments_json.js ./asset/json/comments/$(_jq '.number')-comments.json
        fi
    done
}
