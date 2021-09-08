# ha-config
我的HomeAssistant配置

## 快速安装

Docker管理
```bash
sudo docker run -itd --net="host" --restart=always --name="portainer" -v /var/run/docker.sock:/var/run/docker.sock -v ~/portainer:/data portainer/portainer-ce:latest
```
HomeAssistant
```bash
sudo docker run -itd --net="host" --restart=always --name="ha" --privileged=true -v ~/homeassistant:/config -e TZ="Asia/Shanghai" homeassistant/home-assistant:latest
```
webssh2
```bash
sudo docker run -itd --net="host" --restart=always --name="ssh" --privileged=true ilteoood/webssh2:latest
```
HomeKit服务
```bash
sudo docker run -itd --net="host" --restart=always --name="homebridge" -v ~/homebridge:/homebridge oznu/homebridge:latest
```
Nodejs
```bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

```bash
# 安装pm2
npm i pm2 -g
# 安装node-RED
sudo npm install -g --unsafe-perm node-red
# 启动程序
sudo pm2 start node-red
# 保存配置
sudo pm2 save
# 开机启动
sudo pm2 startup
```

> HACS在线搜索：https://hacs-repositories.web.app/

## 卡片
- https://github.com/Villhellm/lovelace-animated-background
- https://github.com/custom-cards/favicon-counter
- https://github.com/marrobHD/tv-card
- https://github.com/fineemb/lovelace-fan-xiaomi
- https://github.com/denysdovhan/purifier-card

## 集成
- https://github.com/al-one/hass-xiaomi-miot
- https://github.com/syssi/xiaomi_airconditioningcompanion
- https://github.com/AlexxIT/XiaomiGateway3
- https://github.com/AlexxIT/SonoffLAN
- https://github.com/custom-components/pyscript

## HomeBridge
- https://github.com/homebridge/homebridge
- https://github.com/SeydX/homebridge-camera-ui
- https://github.com/bwp91/homebridge-ewelink

## 我的电脑

电脑鼠标控制
```yaml
topic: windows/mouse
payload:
  type: left_click
  type: right_click
  type: m_click
  type: left_dblclick
  type: right_dblclick
  type: m_dblclick
  type: move
  x: 10
  y: 10
payload: '{"type": "move", "x": 10, "y": 10}'
payload: '{"type": "left_click"}'
```

电脑键盘控制 [键码（KeyCode）对照表](http://www.atoolbox.net/Tool.php?Id=815)
```yaml
topic: windows/keyboard
payload: '{"type": "keypress", "key": 91}'
payload:
  type: keypress
  type: keydown
  type: keyup
  key: 96
```
|  键名      | 键码   |
|  :----:    | :----:  |
| 左win      | 91    |
| 右win      | 92    |

## Nginx配置
```nginx
map $http_upgrade $connection_upgrade {
  default upgrade;
  ''   close;
}

upstream homeassistant { 
  server 127.0.0.1:8123;
}

upstream webssh { 
  server 127.0.0.1:2222;
}

upstream nodered {
  server 127.0.0.1:1880;
}

upstream portainer {
  server 127.0.0.1:9000;
}

upstream aria2c {
  server 127.0.0.1:6800;
}

server {

    listen 80;
    listen 443 ssl;
    server_name raspberry.local;
    ssl_certificate      ssl/server.crt;
    ssl_certificate_key  ssl/server.key;

    location / {
        proxy_pass  http://homeassistant;
        proxy_set_header  Upgrade  $http_upgrade;
        proxy_set_header  Connection  $connection_upgrade;
    }

    location /ssh/ {
        proxy_pass http://webssh;
        proxy_set_header  Upgrade  $http_upgrade;
        proxy_set_header  Connection  $connection_upgrade;
    }

    location /node-red/ {
        proxy_pass http://nodered;
        proxy_set_header  Upgrade  $http_upgrade;
        proxy_set_header  Connection  $connection_upgrade;
    }

    location /docker-portainer/ {
        proxy_pass http://portainer/;
        proxy_set_header  Upgrade  $http_upgrade;
        proxy_set_header  Connection  $connection_upgrade;
    }

    location /jsonrpc {
        proxy_pass http://aria2c;
        proxy_set_header  Upgrade  $http_upgrade;
        proxy_set_header  Connection  $connection_upgrade;
    }

    location /html/ {
        root /var/www;
    }

}
```

## 其他项目
- https://code.videolan.org/videolan/LibVLCSharp