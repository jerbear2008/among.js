// *** モジュールのインクルード *** //
const osLocale = require("os-locale");

// *** 言語 *** //
const languageTable = {

	// *** 日本語 *** //
	"ja-JP": {
		"unsupportedSystem": "サポートされてないシステムです。動作しない可能性があります。",
		"failedToFindProcess": "プロセスが見つかりませんでした",
		"failedToFindModule": "モジュールが見つかりませんでした",
		"unsupportedFunction": "サポートされていない関数です。動作はしません。"
	},

	// *** 英語 *** //
	"en_US": {
		"unsupportedSystem": "This system is unsupported. Maybe it'll be not working.",
		"failedToFindProcess": "Couldn't find the process",
		"failedToFindModule": "Couldn't find the module",
		"unsupportedFunction": "This function is unsupported. It's not working."
	}

};

// *** ロケールの取得 *** //
let locale = osLocale.sync();

// *** 言語設定 *** //
// デフォルトの言語(英語、米国)
const defaultLanguage = "en_US";
let Language = null;
if (!languageTable.hasOwnProperty(locale)) {
	Language = languageTable[defaultLanguage];
} else {
	Language = languageTable[locale];
}

// *** モジュールのインクルード *** //
module.exports = Language;
