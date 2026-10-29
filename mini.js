var rule = {
    title: '爱情岛测试',
    host: 'https://38.148.206.7:30018',
    homeUrl: '/',
    url: '/videos/index/fypage.html',
    searchable: 0,
    quickSearch: 0,
    filterable: 0,
    headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120.0 Mobile Safari/537.36' },
    timeout: 20000,
    class_name: '测试&最新',
    class_url: 'cn&index',

    一级: $js.toString(() => {
        var out = [];
        var msg = '';
        try {
            var raw = request('https://38.148.206.7:30018/', { headers: rule.headers });
            msg += 'rawLen=' + (raw ? raw.length : 0);
            var m = raw.match(/var\s+html\s*=\s*'([^']*)'/);
            msg += ';match=' + (m ? 'Y' : 'N');
            if (m) {
                var s = m[1];
                var rev = '';
                for (var i = s.length - 1; i >= 0; i--) rev += s.charAt(i);
                var arr = [];
                var p = 0;
                while (p < rev.length) {
                    if (rev.charAt(p) === '%' && p + 2 < rev.length) {
                        var hx = rev.substring(p + 1, p + 3);
                        if (/^[0-9A-Fa-f]{2}$/.test(hx)) { arr.push(parseInt(hx, 16)); p += 3; continue; }
                    }
                    var cc = rev.charCodeAt(p);
                    if (cc < 128) arr.push(cc);
                    p++;
                }
                var html = '';
                var k = 0;
                while (k < arr.length) {
                    var b = arr[k];
                    if (b < 128) { html += String.fromCharCode(b); k++; }
                    else if (b >= 192 && b < 224 && k + 1 < arr.length) { html += String.fromCharCode(((b & 31) << 6) | (arr[k + 1] & 63)); k += 2; }
                    else if (b >= 224 && b < 240 && k + 2 < arr.length) { html += String.fromCharCode(((b & 15) << 12) | ((arr[k + 1] & 63) << 6) | (arr[k + 2] & 63)); k += 3; }
                    else { k++; }
                }
                msg += ';decLen=' + html.length;
                var cnt = (html.match(/videos-item/g) || []).length;
                msg += ';items=' + cnt;
                if (cnt > 0) {
                    var ids = [];
                    var re = /\/videos\/play\/(\d+)\.html/g;
                    var mm;
                    var n = 0;
                    while ((mm = re.exec(html)) !== null && n < 20) { ids.push(mm[1]); n++; }
                    msg += ';ids=' + ids.slice(0, 5).join(',');
                    ids.forEach(function (id) {
                        out.push({ title: '测试' + id, desc: '', pic_url: '', url: '/videos/play/' + id + '.html', content: '' });
                    });
                }
            }
        } catch (e) {
            msg += ';ERR=' + e;
        }
        if (out.length === 0) {
            out.push({ title: '【诊断】' + msg, desc: '', pic_url: '', url: '', content: msg });
        }
        return setResult(out);
    })
};
