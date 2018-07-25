#!/bin/bash

set -e

if ! [ -x "$(command -v docker)" ]; then
	# Hack for windows
	docker.exe build . -t audience_platform_cc
	docker.exe run -i -p 8080:8080 audience_platform_cc
else
	docker build . -t audience_platform_cc
	docker run -it -p 8080:8080 audience_platform_cc	
fi
