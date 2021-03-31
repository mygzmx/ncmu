var net = require('net');

var HOST = 'wss://nls-gateway.cn-shanghai.aliyuncs.com/ws/v1'

var client = net.connect({port: 8080,host:HOST}, function() {
    console.log('连接到服务器！');
});
client.on('data', function(data) {
    console.log(data.toString());
    client.end();
});
client.on('end', function() {
    console.log('断开与服务器的连接');
});

