title: gem install mysql2 - OSX Lion
date: Aug 6 2013
---

There has been a lot of problems with the mysql gem since apple released lion series. 'gem install mysql2' fails because it can't find the mysql.h file. To solve it just use pretty simple hack:

If you have installed mysql through Homebrew go to ***/ust/local/Cellar/mysql/5.XX.XX/bin*** and open the file ***mysql_config***. If you installed the communigy .dmg then open the directory you have installed by choice.
Locate a line with ***cfglags*** and ***cxxflags***. Then remove the  ***-Wno-null-conversion*** and ***-Wno-unused-private-field***

Before:
```js
cflags="-I$pkgincludedir  -Wall -Wno-null-conversion -Wno-unused-private-field -Os -g -fno-strict-aliasing -DDBUG_OFF " #note: end space!
cxxflags="-I$pkgincludedir  -Wall -Wno-null-conversion -Wno-unused-private-field -Os -g -fno-strict-aliasing -DDBUG_OFF " #note: end space!
```

After:
```js
cflags="-I$pkgincludedir  -Wall -Os -g -fno-strict-aliasing -DDBUG_OFF " #note: end space!
cxxflags="-I$pkgincludedir  -Wall -Os -g -fno-strict-aliasing -DDBUG_OFF " #note: end space!
```

That should fix it! Go to your terminal and run ***gem install mysql2***.
Have fun hacking!