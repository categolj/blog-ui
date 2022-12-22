// https://github.com/markedjs/marked/blob/master/docs/js/index.js
export const addCopyButton = () => {
    const allPres = document.querySelectorAll('pre');
    const div = document.createElement('div');
    div.innerHTML = '<div class="tooltip-copy"><img src="/copy-icon.svg" class="icon-copy" title="Click to Copy" alt="Click to Copy" /></div>';
    div.className = 'div-copy';
    allPres.forEach(pre => {
        let timeout = null;
        const copy = div.cloneNode(true);
        pre.appendChild(copy);
        pre.onmouseover = function () {
            copy.classList.add('active');
        };
        pre.onmouseleave = () => {
            clearTimeout(timeout);
            copy.classList.remove('active');
            copy.classList.remove('click');
        };
        copy.onclick = () => {
            navigator.clipboard.writeText(pre.textContent);
            copy.classList.add('click');
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                copy.classList.remove('click');
            }, 3000);
        };
    });
};