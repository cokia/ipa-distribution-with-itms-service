"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var db_1 = require("./db");
var awss3_1 = require("./awss3");
var xmlparser_1 = require("./xmlparser");
dotenv_1.default.config();
var App = /** @class */ (function () {
    function App() {
        this.application = express_1.default();
    }
    return App;
}());
var app = new App().application;
app.use(cors_1.default());
app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});
app.listen(3000, function () {
    console.info('✅ Start IPA Distribution Server ✅');
});
app.get('/', function (req, res) {
    res.status(200).send('IPA Distribution SERVER');
});
app.get('/applist', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res.status(200)).send;
                return [4 /*yield*/, (db_1.appList())];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.get('/app/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(200).send(db_1.callFromAppName(req.query.name));
        return [2 /*return*/];
    });
}); });
app.post('/register/app', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, bundleid, version, _b, data, image, ipa, s3baseurl, ipaurl, plistcontext, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = req.query, name = _a.name, bundleid = _a.bundleid, version = _a.version;
                _b = req.body, data = _b.data, image = _b.image, ipa = _b.ipa;
                awss3_1.uploadipa(name, ipa);
                awss3_1.uploadimage(name, image);
                s3baseurl = 'https://ipa-distribution-hanu.s3.ap-northeast-2.amazonaws.com/';
                ipaurl = s3baseurl + "/" + name + "/" + name + ".ipa";
                return [4 /*yield*/, xmlparser_1.generate_xml_string(ipaurl, bundleid, name)];
            case 1:
                plistcontext = _e.sent();
                return [4 /*yield*/, awss3_1.uploadplist(name, plistcontext)];
            case 2:
                _e.sent();
                _d = (_c = res.status(200)).send;
                return [4 /*yield*/, (db_1.addApp(name, bundleid, version, data))];
            case 3:
                _d.apply(_c, [_e.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.post('/update', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res.status(200)).send;
                return [4 /*yield*/, db_1.callFromAppName(req.query.name)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
