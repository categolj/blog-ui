const DEFAULT_API_URL = 'https://blog-api-blog.apps.ik.am';

const replaceUiToApi = url => {
    if (url.startsWith("http://blog") || url.startsWith("https://blog")) {
        return url.replace('/blog.', '/blog-ui.').replace('-frontend', '-api').replace('-ui', '-api');
    }
    return DEFAULT_API_URL;
}

const urlMap = (typeof window === 'object') ? {
    BLOG_API: (process.env.NEXT_PUBLIC_APP_BLOG_API && process.env.NEXT_PUBLIC_APP_BLOG_API.toLowerCase() === "auto") ? replaceUiToApi(`${document.location.protocol}//${document.location.hostname}`) : process.env.NEXT_PUBLIC_APP_BLOG_API || DEFAULT_API_URL,
} : {
    BLOG_API: DEFAULT_API_URL
};

export default urlMap;