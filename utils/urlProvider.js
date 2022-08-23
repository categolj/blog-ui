const urlMap = (typeof window === 'object') ? {
    BLOG_API: (process.env.REACT_APP_BLOG_API && process.env.REACT_APP_BLOG_API.toLowerCase() === "auto") ? `${document.location.protocol}//${document.location.hostname.replace(".", "-api.")}` : process.env.REACT_APP_BLOG_API || 'https://blog-api-blog.apps.ik.am',
    BLOG_UI: (process.env.REACT_APP_BLOG_UI && process.env.REACT_APP_BLOG_UI.toLowerCase() === "auto") ? `${document.location.protocol}//${document.location.hostname}` : process.env.REACT_APP_BLOG_UI || 'https://blog-ui-blog.apps.ik.am'
} : {
    BLOG_API: 'https://blog-api-blog.apps.ik.am',
    BLOG_UI: 'https://blog-ui-blog.apps.ik.am'
};
export default urlMap;