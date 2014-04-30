#!/bin/bash


# Post create
curl -X POST -H "Content-Type: application/json" -d '{"posts":[{"title":"MyTitle","excerpt":"MyExcerpt","body":"MyBody","author":"5330ee570fed81e908000001"}]}' http://localhost:3000/posts

# Post list
curl -is http://localhost:3000/posts

# Post get
curl -is http://localhost:3000/posts/534715d17ac0f73608000001

# Post Patch
curl -X PUT -H "Content-Type: application/vnd.api+json" -d '{"posts":[{"title":"MyTitle-BLAH"}]}' http://localhost:3000/posts/534715d17ac0f73608000001

