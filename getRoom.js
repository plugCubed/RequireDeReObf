var request = require('request');

var opts = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.24 Safari/537.36',
        Cookie: 'session={INSERT_SESSION_COOKIE_HERE}'
    }
};

request.get('https://plug.dj/radiant',opts,function(err, res, body) {
    var v, s, fs;
    if (body == null || res.statusCode != 200) {
        console.error('Could not get HTML', res.statusCode);
        process.exit(-1);
    }
    if (body.indexOf('<title>maintenance mode - plug.dj</title>') > -1) {
        console.error('Could not get HTML - Maintenance mode');
        process.exit(-1);
    }
    v = body.split('var _v=')[1].split(';')[0].split("'").join('').split('"').join('');
    s = body.split('/_/static/js/app.')[1].split('.js')[0];
    console.log('Version ' + v);
    fs = require('fs');
    request.get('https://plug.dj/_/static/js/app.' + s + '.js', function(err, res, content) {
        if (err) {
            console.log('[ERROR]', err);
            return;
        }
        fs.writeFileSync('app.js', content);
        fs.writeFileSync('versions/app.' + v + '.js', content);
    });
});