const entryLang = {
    ja: {
        entryPath: entryId => `/entries/${entryId}`,
        githubBath: 'https://github.com/making/blog.ik.am',
        githubBranch: 'master',
        linkToAnotherLang: entryId => <>🌎&nbsp;<a href={`/entries/${entryId}/en`}>English Page</a></>
    }, en: {
        entryPath: entryId => `/entries/${entryId}/en`,
        githubBath: 'https://github.com/making/ik.am_en',
        githubBranch: 'main',
        linkToAnotherLang: entryId => <>🇯🇵&nbsp;<a href={`/entries/${entryId}`}>Original entry</a></>
    }
};

export default entryLang;