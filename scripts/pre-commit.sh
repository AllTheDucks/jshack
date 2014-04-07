#!/bin/sh
#


lintoutput=$(gjslint --strict -r common-web/src/main/javascript/jsh/)
if [ $? != 0 ]; then
        exec 1>&2
        echo "$lintoutput"
        exit 1
fi
