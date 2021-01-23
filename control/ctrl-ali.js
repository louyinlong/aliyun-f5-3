const Core = require('@alicloud/pop-core');

var client = new Core({
    accessKeyId: 'LTAI4FkdT1fGCwXRRSPAHV8n',
    accessKeySecret: 'AJxWm2T69hh6sPlbwPwMs88OtHJKoB',
    endpoint: 'https://iot.cn-shanghai.aliyuncs.com',
    apiVersion: '2018-01-20'
});

module.exports = {
    add(req, resp) {
        var proname = req.body.ProductName;
        console.log(req.body.ProductName);
        var params = {
            "RegionId": "cn-hangzhou",
            "NodeType": "0",
            "ProductName": proname
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('CreateProduct', params, requestOption).then((result) => {
            resp.send({ succ: true })
            console.log(JSON.stringify(result));
        }, (ex) => {
            console.log(ex);
        })
    },

    delete(req, resp) {
        var prokey = req.params['proKey'];
        console.log(prokey);
        var params = {
            "RegionId": "cn-hangzhou",
            "ProductKey": prokey,
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('DeleteProduct', params, requestOption).then((result) => {
            resp.send({ succ: true })
            console.log(JSON.stringify(result));
        }, (ex) => {
            console.log(ex);
        })
    },

    update(req, resp) {
        var proname = req.body.ProductName;
        var prokey = req.body.ProductKey;
        console.log(req.body.ProductName + '    ' + req.body.ProductKey);
        var params = {
            "RegionId": "cn-hangzhou",
            "NodeType": "0",
            "ProductName": proname,
            "ProductKey": prokey,
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('UpdateProduct', params, requestOption).then((result) => {
            resp.send({ succ: true })
            console.log(JSON.stringify(result));
        }, (ex) => {
            console.log(ex);
        })
    },

    search(req, resp) {
        var prokey = req.params['proKey'];
        console.log(prokey);
        var params = {
            "RegionId": "cn-hangzhou",
            "ProductKey": prokey,
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('QueryProduct', params, requestOption).then((result) => {
            var a = [];
            var res = JSON.parse(JSON.stringify(result)).Data;
            a.push({
                "ProductName": res.ProductName,
                "ProductStatus": res.ProductStatus,
                "ProductSecret": res.ProductSecret,
                "ProductKey": res.ProductKey,
            })
            console.log(a);
            resp.send(a);

        }, (ex) => {
            console.log(ex);
        })
    },

    searchall(req, resp) {
        var params = {
            "RegionId": "cn-hangzhou",
            "CurrentPage": 1,
            "PageSize": 200,
        }

        var requestOption = {
            method: 'POST'
        };

        client.request('QueryProductList', params, requestOption).then((result) => {
            var res = JSON.parse(JSON.stringify(result)).Data.List.ProductInfo;
            console.log(res);
            resp.send(res);
        }, (ex) => {
            console.log(ex);
        })
    }
}