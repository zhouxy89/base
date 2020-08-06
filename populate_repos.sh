#!/bin/bash

# Populates team repositories with the starter kit codebase

# These variables may change from semester to semester
ORG_NAME=csucs314f19

if [ $# -eq 0 ]
then
  echo "Usage: ./populate_repos.sh <team_list>"
  exit 1
fi

# Note that the codebase (base) should be in the same directory as this script at runtime
# Verify that directory exists
if [ ! -d "Base" ]
then
  echo "Base directory must be in the same directory as this script!"
  exit 1
fi

# Read through the team list, populate each repo with codebase
while read team
do
  # Clone individual repo
  echo "Cloning $team's repository via ssh"
  git clone git@github.com:/$ORG_NAME/$team.git

  # If repo doesn't exist, die
  if [ $? -ne 0 ]
  then
    echo "Failed to clone repository $team. Does it exist?"
    exit 1
  fi

  # Copy ALL files from base into a working directory that's safe to sed in
  cp -r ./Base ./working_base
  cd working_base

  # Rename directories with wrong team number
  # Check out "man find" for more info on this command
  find . -depth -type d -name t00 -execdir mv {} $team ";"

  # Replace t00s in repository
  # Need to specifically exclude this one file because Footer.js contains some "t00" string in
  # a base64-encoded image string
  grep --ignore-case -ls -r --exclude FooterLogo\.js t00 | xargs sed -i "s/\(t\|T\)00/$team/g"

  cd ..

  # Copy all files into team dir
  cp -r ./working_base/* ./$team

  # Append .gitignore to new file or existing file
  cat ./working_base/.gitignore >> ./$team/.gitignore

  rm -rf working_base

  # cd into new repo
  cd $team

  # Commit changes
  git add .
  git commit -m "Add initial code base"

  # Push changes
  git push origin master

  # cd out of repo
  cd ..

  # (Optionally) Delete repo
  # rm -rf $team

done < "$1" # Note that this is where we pass the team list file
