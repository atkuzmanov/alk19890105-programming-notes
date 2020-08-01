# BBC SSL/TLS and Internet PKI training 2016-12-12

|||training
|||SSL/TLS and Internet PKI Training

SSL/TLS and Internet PKI Training

2016-12-12

Trainer: Scott Helme

---

Ivan Ristic
ivan@webkreator.com

---

```bash
openssl dgst hash1
MD5(hash1)= 6be17d53b5e7efa0a13bae06397c251c
```

after changing one letter

`MD5(hash1)= 541b554ac057eb7e289776f4ba0fa8af`

`openssl rand -hex 16`

```bash
## wireshark filter


http.host=="www.google.co.uk"


http.host contains "google"


ip.addr == 192.168.0.1
```

```bash
openssl s_client -connect www.feistyduck.com:443


openssl x509 -in cert1

## human readable:
openssl x509 -in cert1 -text -noout


## DER format
openssl x509 -in gv.crt -inform DER -noout -text
```

---

<https://www.trustworthyinternet.org/ssl-pulse/>

<https://letsencrypt.org/>

<http://lapo.it/asn1js/>

<https://curl.haxx.se/docs/caextract.html>

<https://badssl.com/>

<https://www.eff.org/https-everywhere>

<https://hstspreload.appspot.com/>

<https://scotthelme.co.uk>

chrome://net-internals/#hsts

<https://crt.sh/>

<https://developers.facebook.com/tools/ct>

---

```bash
openssl s_client -connect www.feistyduck.com:443 -reconnect

openssl verify -CAfile cacert.pem cert1

openssl s_client -CApath ~/ -connect www.feistyduck.com:443

openssl genrsa -aes128 -out rsa.key 2048

## <http://superuser.com/questions/1103401/generate-an-ecdsa-key-and-csr-with-openssl>

openssl ecparam -list_curves

## -name of curve
openssl ecparam -name secp521r1 -genkey -noout -out ecdsa.key

## filter ciphers
openssl ciphers -v 'ALL:-RC4, !SSLv3'

## start openssl s_client server
## <https://blog.jorisvisscher.com/2015/07/22/create-a-simple-https-server-with-openssl-s_server/>
openssl s_server -key key.pem -cert cert.pem -accept 44330 -www

openssl s_server -key rsa-no-pass.key -cert fd.crt -accept 44330 -www

openssl ciphers -v 'AESGCM, AESSHA256, AESSHA348, kEDH, RC4, !aNull'

openssl s_server -key rsa-no-pass.key -cert fd.crt -accept 44330 -www -cipher 'AESGCM, AESSHA256, AESSHA348, kEDH, RC4, !aNull'

openssl s_client -connect localhost:44330

openssl s_client -connect localhost:44330 -cipher 'AESGCM, AESSHA256, AESSHA348, kEDH, RC4, !aNull'

sslyze --regular www.feistyduck.com
```

---
