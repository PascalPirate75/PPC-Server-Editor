PPC-Server-Editor
WARNING!!! This is not secure, use at your own risk! Server-side web based code editor. Can be used to create and maintain a web site from a Chromebook. I originaly started this project so that I could easily use my $200 Chromebook to practice my web development and HTML5 games. It worked so well that I use it almost exclusivly even now that I run a different system. I recently set up a GitHub account and thought others could use a tool like this. So I set about cleaning the UI, code, fixing bugs, and ending the project's dependence on jQuery, not that there is anything wrong with it. It is just not nessasary for such a small project.

This project relies on https://ace.c9.io/ for all of the real work, so a big thanks to those people.

Effort was made to make this a drop in and run type of "application". Stick it in a directory on your web server, edit the "php/settings.php" file to reflect the specifics of your web host and server. Create users and passwords in the settings file or use it to connect to a database and check credentials.

There seems to always be work that can be done to improve a project. In the main.js and editor.php files there is work started on a save all but it has been commented out until I feel like implementing it. There are, also, a few other places that could use some work.

This project uses the calculator "pluin" that is also hosted on https://github.com/PascalPirate75.

Try the editor, login as guest with password of guest. If abused will not stay up. https://pascalpiratescove.com/editor/ PPC-Server-Editor
