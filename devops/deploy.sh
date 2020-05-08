#!/bin/sh

# GET FILES IN DEVOPS FOLDER
DEVOPS_FILES=$(ls -ap devops | grep -v /) # This command list all non-directories inside the folder "ls -ap devops | grep -v /"
DEVOPS_FILES=${DEVOPS_FILES#*..} #remove current and parent directory

# moving files from devops
for i in ${DEVOPS_FILES} ; do
    echo "moving $i."
    mv devops/$i $i
done

# allow deploy script to execute
chmod +x build.sh

# execute deploy
echo "Executing test."
bash test.sh

echo "Recreating container."
bash build.sh

#moving back to devops
for i in ${DEVOPS_FILES} ; do
    echo "moving $i back to devops."
    mv $i devops/$i
done
