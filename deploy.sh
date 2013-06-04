git push
ssh -A root@beetroot "
echo \"deploying to /var/www/code.hustle-ux.com...\";
cd /var/www/code.hustle-ux.com;
git pull
forever stop codeblog.js;
npm install;
NODE_ENV=production forever start codeblog.js;
echo \"\"
echo \"Done\";
"
