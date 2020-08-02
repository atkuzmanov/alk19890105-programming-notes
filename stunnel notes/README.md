# stunnel notes

`sudo stunnel ~/.stunnel/stunnel.conf`

```bash
; Sample tunnel configuration for IRC clients which do not support
; SSL and/or TLS autentification.

; Must normally be chmod-ed 600 (user only read or rw).
;
cert = /Volumes/SC/certs/irc.pem

CAfile = /Volumes/SC/certs/ca.pem

pid = /Users/kuzmaa01/.stunnel/stunnel.pid

output = /Users/kuzmaa01/.stunnel/stunnel.log

; Protocol version (all, SSLv2, SSLv3, TLSv1)
sslVersion = TLSv1

; Some performance tunings
socket = l:TCP_NODELAY=1
socket = r:TCP_NODELAY=1
;compression = rle

; Authentication stuff
verify = 2

; Some debugging stuff useful for troubleshooting
; debug = 7
; foreground = yes

; stunnel does not work via tsocks, so you need a tool like connect-proxy
; for doing the socks tunnel

[irc-reith]
accept  = 127.0.0.1:6667
client = yes
exec = /usr/local/bin/connect
execargs = /usr/local/bin/connect -w 5 -S socks-gw.example.co.uk:1080  irc.dev.example.co.uk 6697
; exec = /usr/bin/nc
; execargs = nc -X 5 -x socks-gw.example.co.uk:1080 irc.dev.example.co.uk 6697

[irc-offreith]
accept = 127.0.0.1:6668
client = yes
exec = /usr/local/bin/connect
execargs = /usr/local/bin/connect -w 5 irc.dev.example.co.uk 6697
; exec = /usr/bin/nc
; execargs = nc irc.dev.example.co.uk 6697
```

---

Create the file /System/Library/LaunchAgents/org.stunnel.plist with the content

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>KeepAlive</key>
    <true/>
    <key>Label</key>
    <string>stunnel_startup</string>
    <key>ProgramArguments</key>
    <array>
      <string>/usr/local/bin/stunnel</string>
      <string>/Users/<username>/stunnel/stunnel.conf</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
  </dict>
</plist>
```

And add it to the launch with the command

`launchctl load /System/Library/LaunchAgents/org.stunnel.plist`

---
