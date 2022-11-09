const DEFAULT_API_URL = 'https://blog-api-blog.apps.ik.am';
const DEFAULT_ZIPKIN_URL = 'https://zipkin.ik.am';

const replaceUiToApi = url => {
    if (url === 'http://localhost') {
        return 'http://localhost:8080';
    }
    if (url.startsWith('http://blog') || url.startsWith('https://blog')) {
        return url.replace('/blog.', '/blog-ui.').replace('-frontend', '-api').replace('-ui', '-api');
    }
    return DEFAULT_API_URL;
}

const replaceUiToZipkin = url => {
    if (url === 'http://localhost') {
        return 'http://localhost:9411';
    }
    if (url.endsWith('pineapple.maki.lol')) {
        return 'https://zipkin.run.pineapple.maki.lol';
    }
    return DEFAULT_ZIPKIN_URL;
}

const urlMap = (typeof window === 'object') ? {
    BLOG_API: replaceUiToApi(`${document.location.protocol}//${document.location.hostname}`),
    ZIPKIN_API: replaceUiToZipkin(`${document.location.protocol}//${document.location.hostname}`),
} : {
    BLOG_API: DEFAULT_API_URL,
    ZIPKIN_API: DEFAULT_ZIPKIN_URL
};

export default urlMap;