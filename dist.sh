cp -a build/static/js/* dist
cp -a build/static/css/* dist
cd dist
mv main.*.js.map replay-table.js.map
mv main.*.js replay-table.min.js
mv main.*.css.map replay-table.css.map
mv main.*.css replay-table.css
cd ..
