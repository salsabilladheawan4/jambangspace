#!/bin/sh

git filter-branch -f --env-filter '
if [ "$GIT_AUTHOR_EMAIL" = "vania24ti@mahasiswa.pcr.ac.id" ] || [ "$GIT_AUTHOR_EMAIL" = "yolanda24ti@mahasiswa.pcr.ac.id" ]; then
    export GIT_AUTHOR_NAME="salsabilladheawan4"
    export GIT_AUTHOR_EMAIL="salsabilla24ti@mahasiswa.pcr.ac.id"
fi
if [ "$GIT_COMMITTER_EMAIL" = "vania24ti@mahasiswa.pcr.ac.id" ] || [ "$GIT_COMMITTER_EMAIL" = "yolanda24ti@mahasiswa.pcr.ac.id" ]; then
    export GIT_COMMITTER_NAME="salsabilladheawan4"
    export GIT_COMMITTER_EMAIL="salsabilla24ti@mahasiswa.pcr.ac.id"
fi
' --tag-name-filter cat -- --branches --tags
