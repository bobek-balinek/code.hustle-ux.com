title: Node.js and redirecting back after login
date: Jun 15 2013
---

While building my startup [Enrll](http://enrll.com) I came across a problem with handling account logins. Some pages require a person to login to continue. As I am using [scookie](https://github.com/martinrue/scookie) for handling authentication mainly because it has a nice middleware to specify which routes are for signed in users, it always redirected a person to his dashboard page.

It didn't feel right. A person who would like to teach someone, after cliking 'Make an offer' gets redirected back to his own profile, that's a bad experience that might affect the interest.

Since Express has a nice array of request headers, I have used the 'Refer' to pass the URL as a parameter to the login page.
I am using two different routes GET Login and POST Login to manage user authentication, therefore I need to pass the Refer URL through the form.Here's how it would look like:

```js
    app.get('/login', function(req, res){
        var request_origin = req.header('Referer') || '/account';
        res.render('auth/login', utils.buildParams(app, { 'url_referer': request_origin }));
    });

    app.post('/login', function(req, res){
        users.authorise(req.param('email'), req.param('password'), function(err, docs){
          scookie.login({ email: docs.email, name: docs.name }, res);
          res.redirect(req.param('back_url') || '/account');
        });
    });

```
The HTML View, just uses hidden input field to transfer from the GET /Login to POST /login

```html
    <div class="login-box">
        <h1 class="title">Login to continue</h1>
        <form action="/login" method="post">
            <p>
                <label for="email">Email address</label>
                <input type="text" name="email" id="email">
            </p>
            <p>
                <label for="password">Password</label>
                <input type="password" name="password" id="password">
            </p>
            <p>
                <input type="hidden" name="back_url" value="{{url_referer}}">
                <input type="submit" value="Login" class="btn btn-success btn-large">
            </p>
        </form>
    </div>
```