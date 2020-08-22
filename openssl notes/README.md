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

|||openssl generate csr key

```bash
## On some environments, like Cygwin on Windows, this will not work because of the use of /dev/stdin. In this case save the config to a file (all but the first and last lines) and specify that file as the -config parameter.

openssl req -new -newkey rsa:2048 -nodes -sha256 -config /dev/stdin -keyout [HOST-NAME].key -out [HOST-NAME].csr <<CONF
[ req ]
x509_extensions = v3_req
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no
 
[ req_distinguished_name ]
countryName = [COUNTRY-CODE-HERE]
stateOrProvinceName = [CITY-NAME-HERE]
localityName = [CITY-NAME-HERE]
0.organizationName = [COMPANY-NAME-HERE]
organizationalUnitName = [DIVISION-DEPARTMENT-TEAM-HERE]
commonName = [HOST-NAME]
emailAddress = [CA-EMAIL-ADDRESS]
 
[ v3_req ]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
 
# uncomment the following lines if you require SANs
#subjectAltName = @alt_names
#
#[ alt_names ]
#DNS.1 = host.name
#DNS.2 = another.host.name
#...
 
CONF
```

---

The Most Common OpenSSL Commands

> References
> <https://www.sslshopper.com/article-most-common-openssl-commands.html>

```text
General OpenSSL Commands
These commands allow you to generate CSRs, Certificates, Private Keys and do other miscellaneous tasks.

Generate a new private key and Certificate Signing Request
openssl req -out CSR.csr -new -newkey rsa:2048 -nodes -keyout privateKey.key
Generate a self-signed certificate (see How to Create and Install an Apache Self Signed Certificate for more info)
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout privateKey.key -out certificate.crt
Generate a certificate signing request (CSR) for an existing private key
openssl req -out CSR.csr -key privateKey.key -new
Generate a certificate signing request based on an existing certificate
openssl x509 -x509toreq -in certificate.crt -out CSR.csr -signkey privateKey.key
Remove a passphrase from a private key
openssl rsa -in privateKey.pem -out newPrivateKey.pem
Checking Using OpenSSL
If you need to check the information within a Certificate, CSR or Private Key, use these commands. You can also check CSRs and check certificates using our online tools.

Check a Certificate Signing Request (CSR)
openssl req -text -noout -verify -in CSR.csr
Check a private key
openssl rsa -in privateKey.key -check
Check a certificate
openssl x509 -in certificate.crt -text -noout
Check a PKCS#12 file (.pfx or .p12)
openssl pkcs12 -info -in keyStore.p12
Debugging Using OpenSSL
If you are receiving an error that the private doesn't match the certificate or that a certificate that you installed to a site is not trusted, try one of these commands. If you are trying to verify that an SSL certificate is installed correctly, be sure to check out the SSL Checker.

Check an MD5 hash of the public key to ensure that it matches with what is in a CSR or private key
openssl x509 -noout -modulus -in certificate.crt | openssl md5
openssl rsa -noout -modulus -in privateKey.key | openssl md5
openssl req -noout -modulus -in CSR.csr | openssl md5
Check an SSL connection. All the certificates (including Intermediates) should be displayed
openssl s_client -connect www.paypal.com:443
Converting Using OpenSSL
These commands allow you to convert certificates and keys to different formats to make them compatible with specific types of servers or software. For example, you can convert a normal PEM file that would work with Apache to a PFX (PKCS#12) file and use it with Tomcat or IIS. Use our SSL Converter to convert certificates without messing with OpenSSL.

Convert a DER file (.crt .cer .der) to PEM
openssl x509 -inform der -in certificate.cer -out certificate.pem
Convert a PEM file to DER
openssl x509 -outform der -in certificate.pem -out certificate.der
Convert a PKCS#12 file (.pfx .p12) containing a private key and certificates to PEM
openssl pkcs12 -in keyStore.pfx -out keyStore.pem -nodes
You can add -nocerts to only output the private key or add -nokeys to only output the certificates.

Convert a PEM certificate file and a private key to PKCS#12 (.pfx .p12)
openssl pkcs12 -export -out certificate.pfx -inkey privateKey.key -in certificate.crt -certfile CACert.crt
```

---
