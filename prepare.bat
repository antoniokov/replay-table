robocopy ./build/static/js ./dist /mir
robocopy ./build/static/css ./dist
cd ./dist
ren main.*.js.map replay-table.js.map
ren main.*.js replay-table.min.js
ren main.*.css.map replay-table.css.map
ren main.*.css replay-table.css
cd ..
