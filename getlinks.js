const rp = require('request-promise');
const cheerio = require('cheerio');

var processLink = (l, url) => {
    if (l.error){
        return l;
    }
    if (!l.href){
        return {
            href: '/',
            text: l.text
        }
    }
    var href = '';
    if (l.href.substr(0,4) == 'http'){
        // absolute path
        href = l.href;
    } else {
        if (l.href.substr(0,1) == '/'){
            // path relative to the domain
            // protocol + domain (+ port)
            href = url.split('/')[0] + '//' + url.split('/')[2] + l.href;
        } else {
            // path relative to the current endpoint
            for (var u = 0; u < url.split('/').length - 1; u++){
                href += url.split('/')[u];
            }
            href += l.href;
        }
    }
    return {
        href: href,
        text: l.text
    }
};

var getLinks = (url, cb, errCb) => {
    var options = {
        uri: url,
        transform(body) {
            return cheerio.load(body);
        }
    };
    rp(options).then($ => {
        var retVal = [];
        var links = $("a");
        links.each((i, elem) => {
            retVal.push({
                href: $(elem).attr('href'),
                text: $(elem).text()
            });
        })
        cb(url, retVal);
    },
    response => {
        errCb('This url returned an error');
    });
};

var httpResponse = (req, res) => {
    getLinks(req.body.url, (url, links) => {
        res.json({links: links.map((l) => { return processLink(l, url); })});
    },
    (errorMessage) => {
        res.json({error: errorMessage});
    });
};
module.exports = {
    httpResponse:   httpResponse,
    processLink:    processLink,
    getLinks:       getLinks
};