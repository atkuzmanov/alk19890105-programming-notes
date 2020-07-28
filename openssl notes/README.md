# OpenSSL notes

|||openssl
|||verify cert expiry 
|||certificate expiration

```bash
openssl x509 -enddate -noout -in file.pem
```

---

|||crt to pem
|||certificate to pem

```bash
openssl x509 -inform DES -in yourdownloaded.crt -out outcert.pem -text
```

---

|||read a certificate
|||check a certificate

openssl x509 -in certificate.crt -text -noout

<https://serverfault.com/questions/215606/how-do-i-view-the-details-of-a-digital-certificate-cer-file>

OpenSSL will allow you to look at it if it is installed on your system.

```bash
openssl x509 -in cerfile.cer -noout -text

# The format of the .CER file might require that you specify a different encoding format to be explicitly called out.

openssl x509 -inform pem -in cerfile.cer -noout -text

# or

openssl x509 -inform der -in cerfile.cer -noout -text
```

On Windows systems you can right click the .cer file and select Open. That will then let you view most of the meta data.

On Windows you run Windows certificate manager program using certmgr.msc command in the run window. Then you can import your certificates and view details.

shareimprove this answer
edited Aug 15 '14 at 17:14
answered Dec 23 '10 at 9:38

Helvick


<http://stackoverflow.com/questions/15144046/converting-pkcs12-certificate-into-pem-using-openssl>

<http://www.preshweb.co.uk/2010/12/checkchange-key-passphrase-with-openssl/>

<http://serverfault.com/questions/628921/how-do-i-know-if-pem-is-password-protected-using-ssh-keygen>

---

|||certificate get cname subject info etc
|||certificate openssl
|||openssl script
|||certificate script

```bash
#!/usr/bin/bash
host=$1
ssh $host 'openssl pkcs12 -in /etc/pki/tls/private/example-certificate.p12 -nodes -nokeys -password pass:example-password | openssl x509 -subject -noout -startdate -enddate'
#| sed 's/\//\n/g'
```

---

|||certificate
|||security
|||ssl
|||tls
|||globalsign

The Globalsign intermediate cert (on the Globalsign website) is in a binary/DER format (the base 64 version is binary/DER format)
To get this to work the cert had to be converted to PEM and then base 64. You'll need:

```bash
openssl x509 -inform der -in intermediate.crt -out intermediate.pem

openssl base64 -in intermediate.pem -out intermediate-base64.txt
```

---

|||keytool
|||certificate
|||security

```bash
keytool -list -keystore /path/to/truststore/or/keystore

### view certificate view cert

keytool -list -keystore 1.p12 -storetype pkcs12 -v
```

---
