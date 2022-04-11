import woothee from 'woothee';

export function isPC(headers) {
    const userAgent = woothee.parse(headers['user-agent']);
    return userAgent.category === 'pc';
}