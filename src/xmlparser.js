"use strict";
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// I HATE HARD CODING BUT I DON'T HAVE WAY TO MAKE THIS FILE WITHOUT HARD CODING
function generate_xml_string(ipaurl, bundleid, name) {
    return __awaiter(this, void 0, void 0, function () {
        var imageurl, xml_part_1, xml_part_2, xml_part_3, xml_part_4, xml_part_5, xml_part_6, xml_part_7, xmlfinal;
        return __generator(this, function (_a) {
            imageurl = 'https://github.com/cokia.png';
            xml_part_1 = '<?xml version="1.0" encoding="UTF-8"?><plist version="1.0"><dict><key>items</key><array><dict><key>assets</key><array><dict><key>kind</key><string>software-package</string><key>url</key><string>';
            xml_part_2 = '</string></dict><dict> <key>kind</key> <string>display-image</string> <key>needs-shine</key> <false/> <key>url</key> <string>';
            xml_part_3 = '</string> </dict> <dict> <key>kind</key> <string>full-size-image</string> <key>needs-shine</key> <false/> <key>url</key> <string>';
            xml_part_4 = '</string> </dict></array><key>metadata</key><dict><key>bundle-identifier</key><string>';
            xml_part_5 = '</string><key>bundle-version</key><string>1.0</string><key>kind</key><string>software</string><key>subtitle</key> <string>';
            xml_part_6 = '</string><key>title</key><string>';
            xml_part_7 = '</string></dict></dict></array></dict></plist>';
            xmlfinal = xml_part_1 + ipaurl + xml_part_2 + imageurl + xml_part_3 + imageurl + xml_part_4 + bundleid + xml_part_5 + name + xml_part_6 + name + xml_part_7;
            return [2 /*return*/, xmlfinal];
        });
    });
}
exports.generate_xml_string = generate_xml_string;
