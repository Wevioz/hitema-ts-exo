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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _this = this;
// let data: ArticleUser[];
var data = [];
document.addEventListener('DOMContentLoaded', function () { return __awaiter(_this, void 0, void 0, function () {
    var reponseUsers, usersFetched, reponseArticle, articleFetched, articlesJoined, html, _loop_1, _i, usersFetched_1, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch('https://jsonplaceholder.typicode.com/users')];
            case 1:
                reponseUsers = _a.sent();
                return [4 /*yield*/, reponseUsers.json()];
            case 2:
                usersFetched = (_a.sent());
                return [4 /*yield*/, fetch('https://jsonplaceholder.typicode.com/posts')];
            case 3:
                reponseArticle = _a.sent();
                return [4 /*yield*/, reponseArticle.json()];
            case 4:
                articleFetched = (_a.sent());
                articlesJoined = [];
                html = '';
                _loop_1 = function (user) {
                    var articlesAssociated = articleFetched.filter(function (article) { return user.id === article.userId; });
                    if (!articlesAssociated)
                        return "continue";
                    var articleUser = { articles: articlesAssociated, user: user };
                    data.push(articleUser);
                };
                for (_i = 0, usersFetched_1 = usersFetched; _i < usersFetched_1.length; _i++) {
                    user = usersFetched_1[_i];
                    _loop_1(user);
                }
                render(data);
                return [2 /*return*/];
        }
    });
}); });
function render(data) {
    var html = '';
    data.forEach(function (articleJoined) {
        html += "\n    <div class=\"col-sm-2\">\n    <h3 class=\"text-info\">" + articleJoined.user.name + "</h3>\n    <p>" + articleJoined.user.email + "</p>\n    <h3 class=\"text-warning\">Titre des articles R\u00E9dig\u00E9s </h3>\n    <ul>\n    " + articleJoined.articles.map(function (article) {
            return "<li>" + article.title + "</li>";
        }) + "\n    </ul>\n</div>\n        ";
    });
    document.querySelector('#content').innerHTML = html;
}
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var inputAuthor = document.querySelector('#author');
    var inputTitle = document.querySelector('#title');
    var newData = __spreadArrays(data);
    if (inputAuthor.value) {
        console.log(inputAuthor.value);
        console.log('data : ', data);
        newData = data.filter(function (dataArticle) {
            return dataArticle.user.name.includes(inputAuthor.value);
        });
    }
    if (inputTitle.value) {
        newData = data.filter(function (dataArticle) {
            return dataArticle.articles.some(function (article) {
                return article.title.includes(inputTitle.value);
            });
        });
    }
    if (inputAuthor.value)
        console.log('newData :', newData);
    render(newData);
});
