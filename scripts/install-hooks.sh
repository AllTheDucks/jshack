#!/bin/sh

if [ ! -f .git/hooks/pre-commit ]; then
	if [ ! -d .git/hooks ]; then
		echo "Couldn't find the .git directory"
		echo "Make sure you're running this script from the root dir of the project."
		echo "e.g. scripts/install-hooks.sh, instead of ./install-hooks.sh"
	else
		cp scripts/pre-commit.sh .git/hooks/pre-commit
		echo "copied pre-commit hook to .git/hooks/"
	fi
else
	echo "pre-commit hook already exists. Nothing to do."
fi
