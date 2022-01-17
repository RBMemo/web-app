#!/bin/bash

# 30 = black
# 31 = red
# 32 = green
# 33 = yellow
# 34 = purple
# 35 = pink
# 36 = teal
# 37 = gray

npx nodemon app.js | sed -e "s/^/\x1b[36m[web-app]\x1b[39m /" &
redis-server | sed -e "s/^/\x1b[31m[redis-server]\x1b[39m /" &
wait
