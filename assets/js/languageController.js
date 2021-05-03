function getLanguage() {
    return localStorage.getItem('language') ? localStorage.getItem('language') : null;
}

function setLanguage(languageCode) {
    localStorage.setItem('language', languageCode);
}

function initLanguageController() {
    const language = getLanguage();
    if (language === null) {
        const isJapanese = /^\/ja/g.exec(window.location.pathname);
        const isEnglish = /^\/en/g.exec(window.location.pathname);
        if (isJapanese) {
            setLanguage('ja');
        } else if (isEnglish) {
            setLanguage('en');
        } else {
            setLanguage('zh-cn');
        }
    }
}

function getLocalizationNotFound() {
    if (!getLanguage()) {
        initLanguageController();
    }

    var s = "找不到该页面";
    switch (getLanguage()) {
        case "ja":
            s = "ページが見つかりません"
            break;
        case "en":
            s = "Page not found"
    }
    return s;
}

function getLocalizationReturn() {
    if (!getLanguage()) {
        initLanguageController();
    }

    var s = "返回上一页";
    switch (getLanguage()) {
        case "ja":
            s = "戻る"
            break;
        case "en":
            s = "Go back"
    }
    return s;
}

function getLocalizationHome() {
    if (!getLanguage()) {
        initLanguageController();
    }

    var s = "主页";
    switch (getLanguage()) {
        case "ja":
            s = "ホーム"
            break;
        case "en":
            s = "Home"
    }
    return s;
}

function getLocalizationHomeURL() {
    if (!getLanguage()) {
        initLanguageController();
    }

    var s = "/";
    switch (getLanguage()) {
        case "ja":
            s = "/ja/"
            break;
        case "en":
            s = "/en/"
    }
    return s;
}