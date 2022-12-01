import {marked} from 'marked'
import GithubSlugger from 'github-slugger'

class Marked {
    constructor(marked) {
        this._marked = marked;
        this.renderer = new marked.Renderer();
        this.slugger = new GithubSlugger();
    }

    slugify(raw) {
        const text = raw.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, '');
        return this.slugger.slug(text);
    }

    render(text) {
        if (text && text.includes('<!-- toc -->')) {
            text = this.insertToc(text);
        }
        return this._marked(text, {renderer: this.renderer});
    }

    setOptions(options) {
        this._marked.setOptions(options);
    }

    toc(text) {
        this.slugger.reset();
        let tokens = marked.lexer(text);
        tokens = tokens.filter(function (token) {
            if (token.type !== 'heading') {
                return false;
            }
            if (token.depth === 1) {
                // Ignore h1
                return false;
            }
            return true;
        });
        const min = tokens.map(function (token) {
            return token.depth;
        }).reduce(function (x, y) {
            return Math.min(x, y);
        }, 9999);

        return tokens.map((token) => {
            const id = this.slugify(token.text);
            return repeat('  ', token.depth - min) + '* [' + token.text + '](#' + id + ')';
        }).join('\n') + '\n';
    }

    /**
     * Thanks to https://github.com/jonschlinkert/marked-toc
     */
    insertToc(text) {
        const start = '<!-- toc -->';
        const stop = '<!-- tocstop -->';
        const re = /<!-- toc -->([\s\S]+?)<!-- tocstop -->/;

        // remove the existing TOC
        const content = text.replace(re, start);

        // generate new TOC
        const newtoc = '\n\n'
            + start + '\n\n'
            + this.toc(content) + '\n'
            + stop + '\n';

        return text.replace(start, newtoc);
    }
}

function repeat(text, n) {
    let ret = '';
    for (let i = 0; i < n; i++) {
        ret = ret + text;
    }
    return ret;
}

marked.setOptions({
    gfm: true,
});

export default (function () {
    return new Marked(marked);
})();