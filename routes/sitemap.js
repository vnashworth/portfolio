var express = require('express');
var router = express.Router();

var app = express();

var sm = require('sitemap');

var sitemap = sm.createSitemap({
    hostname : "https://www.victoriaash.com",
    cacheTime : 1000 * 60 * 24,
    urls: [
        { url: '/', changefreq: 'monthly', priority: '1.0' },
    ]
});

router.get('/sitemap.xml', function(req, res, next) {
    sitemap.toXML( function (err, xml) {
        if (err) {
            return res.status(500).end();
        }
        res.header('Content-Type', 'application/xml');
        res.send(xml);
    });
});

module.exports = router;
