#!/bin/bash

# maven (mvn) is a build tool for java projects.
# the command 'mvn package' looks in the pom.xml for dependency information
# then it compiles everything into a single *.jar file that gets placed in the target directory.
mvn package
