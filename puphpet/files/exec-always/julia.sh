#!/bin/bash

julia -e 'Pkg.update()'
julia -e 'Pkg.add("HttpServer")'
julia -e 'Pkg.add("JuMP")'
