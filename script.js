'use strict';

// ---------------------------------------------------------------- //
// -------------------------- VARIABLES --------------------------- //
// ---------------------------------------------------------------- //

const menuBox = document.querySelector('.menu-box-wrapper');

// -------------------------- VARIABLES --------------------------- //
// --------------------------- BUTTONS ---------------------------- //

const jsBtn = document.getElementById('javascript');
const htmlBtn = document.getElementById('html');
const cssBtn = document.getElementById('css');
const pythonBtn = document.getElementById('python');

// MENU //
const settignsBtn = document.getElementById('settings-btn');
const aboutBtn = document.getElementById('about-btn');

const menuLabelBox = document.querySelector('.menu-label-box');
const menuClose = document.querySelector('.bi-x-circle-fill');
const menuLabel = document.querySelector('.menu-label-box p');

const settingsMenuBox = document.querySelector('.menu-settings-wrapper');
const aboutMenuBox = document.querySelector('.menu-about-wrapper');

// GENERATE TITLE AND CLEAR BTNS

const titleBtn = document.getElementById('title');
const subtitleBtn = document.getElementById('subtitle');
const titleClearBtn = document.querySelector('.output-header-clear-btn');

// -------------------------- VARIABLES --------------------------- //
// --------------------------- SETTINGS --------------------------- //

const titleSize = document.getElementById('size');
const commentTags = {
    javascript: {
        in: '//',
        out: '//',
    },

    html: {
        in: '&lt;!--',
        out: '--&gt',
    },

    css: {
        in: '/*',
        out: '*/',
    },

    python: {
        in: '#',
        out: '#',
    },
};

// -------------------------- VARIABLES --------------------------- //
// --------------------------- ELEMENTS --------------------------- //

const titleInputArea = document.getElementById('title-textarea');
const titleElement = document.getElementById('title-output');
const warningElement = document.getElementById('warning');

// ---------------------------------------------------------------- //
// -------------------------- FUNCTIONS --------------------------- //
// ---------------------------------------------------------------- //

// --------------------- DEFAULT SETUP - FUNC --------------------- //

function settingsDefault() {
    jsBtn.checked = true;
    titleSize.value = '70';
}

// ------------------- OPEN / CLOSE MENU - FUNC ------------------- //

function menuOpenClose() {
    //
    // -------------- OPEN / CLOSE MENU - INTERNAL FUNC --------------- //

    function openMenu() {
        if (clicked === 'settings-btn') {
            menuLabel.textContent = 'Settings';
            menuLabelBox.classList.add('open');
            settingsMenuBox.classList.add('open');
            aboutMenuBox.classList.remove('open');
        } else if (clicked === 'about-btn') {
            menuLabel.textContent = 'About';
            menuLabelBox.classList.add('open');
            aboutMenuBox.classList.add('open');
            settingsMenuBox.classList.remove('open');
        }
    }

    // -------------- OPEN / CLOSE MENU - INTERNAL FUNC --------------- //

    function closeMenu() {
        menuBox.classList.remove('open');
        aboutMenuBox.classList.remove('open');
        settingsMenuBox.classList.remove('open');
        menuLabelBox.classList.remove('open');
        menuLabel.textContent = '';
    }

    // ------------------ OPEN / CLOSE MENU - LOGIC ------------------- //

    const clicked = this.id;
    const isMenuOpen = menuBox.classList.contains('open');

    if (clicked === 'close-btn') {
        closeMenu();
    } else if (isMenuOpen) {
        openMenu();
    } else {
        menuBox.classList.add('open');
        openMenu();
    }
}

// ----------------- RETRIEVE TITLE SETUP - FUNC ------------------ //

function getSettings() {
    const languagesOptions = Array.from(document.querySelectorAll('.settings-language-sigular input'));
    const chosenLanguage = languagesOptions.filter(x => x.checked)[0].id;
    const titleSize = document.getElementById('size').value;
    const titleRaw = document.getElementById('title-textarea').value.toUpperCase();
    const titleStringSize = titleRaw.length;

    return {
        chosenLanguage: chosenLanguage,
        titleSize: titleSize,
        titleRaw: titleRaw,
        titleStringSize: titleStringSize,
    };
}

// ------------------ BUILDING TITLE / MAIN FUNC ------------------ //

function buildTitleSubtitle() {
    const {chosenLanguage: language, titleSize: size, titleRaw: titleRaw, titleStringSize: stringSize} = getSettings();

    // ----------------------- BUILDING DASHES ------------------------ //

    const dashes = '-'.repeat(size - 6);
    const sideDashes = '-'.repeat((size - stringSize - 8) / 2);

    const inTag = commentTags[language].in;
    const outTag = commentTags[language].out;

    const option = this.id;

    // prettier-ignore
    function buildTitle() {

        const topBot = `${inTag} ${dashes} ${outTag}`;
        const titleCore = `${inTag} ${sideDashes} ${titleRaw} ${stringSize % 2 === 0 ? sideDashes : sideDashes + '-'} ${outTag}`;
        const titleHTML = (option === 'title' ? topBot + '<br>' + titleCore + '<br>' + topBot : titleCore)
        const title = (option === 'title' ? topBot + '\n' + titleCore + '\n' + topBot : titleCore)

        warningElement.textContent = '';

        titleElement.innerHTML = titleHTML

        // -------------------- HTML FIX FOR <!-- --> --------------------- //

        if (language === 'html') {
            const titleHTMLprint = title.replaceAll('&lt;', '<').replaceAll('&gt', '>')
            navigator.clipboard.writeText(titleHTMLprint)
        } else { 
            navigator.clipboard.writeText(title)
        }

        return (option === 'title' ? topBot + '<br>' + titleCore + '<br>' + topBot : titleCore)

    }

    const titleOutput = buildTitle();
    return titleOutput;
}

// --------------------- RESET INPUT - FUNC  ---------------------- //

function clearTitle() {
    titleInputArea.value = '';
    titleElement.textContent = '';
    warningElement.textContent = 'Your Title will automatically be copied to the clipboard';
}

// ---------------------------------------------------------------- //
// ----------------------- EVENT LISTENERS ------------------------ //
// ---------------------------------------------------------------- //

window.addEventListener('load', settingsDefault);
settignsBtn.addEventListener('click', menuOpenClose);
aboutBtn.addEventListener('click', menuOpenClose);
menuClose.addEventListener('click', menuOpenClose);

titleBtn.addEventListener('click', buildTitleSubtitle);
subtitleBtn.addEventListener('click', buildTitleSubtitle);

titleClearBtn.addEventListener('click', clearTitle);
