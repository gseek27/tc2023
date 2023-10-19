<<<<<<< HEAD
version https://git-lfs.github.com/spec/v1
oid sha256:5578cad26a80ce73daf0e74634f721daf017d77dbfeb4f05002dd3699798cde7
size 488
=======
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'itslit.app' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:gseek27/gseek27.github.io.git master
 
# if you are deploying to https://<USERNAME>.github.io/<REPO>
 git push -f git@github.com:gseek27/tc2023.git master:gh-pages

cd -
>>>>>>> 2190573f (wed14)
