# Commit and push to main repo
git add . ; git commit -m "$1" ; git push origin master

# Commit public git and push to Heroku
cd ./public/
git add . ; git commit -m "$1" ; git push heroku master

# Get back to project
cd ../

# Generate and publish statistics to Heroku
git_stats generate --out-path=../filmska-sekcija-stats
cd ../filmska-sekcija-stats
cp index.html index.php
git add . ; git commit -m "Update" ; git push heroku master

# Get back to project
cd ../filmska-sekcija/
