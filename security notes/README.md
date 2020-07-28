# Security notes

|||usb stick security |||usb memory stick security |||usb thumb drive security |||usb flash drive security |||usb key security |||security

USB stick should conform to Standard FIPS Level II

<http://www.kingston.com/en/usb/encrypted_security#dt4000>

---

|||certificate
|||security
|||ssl
|||encryption
|||cryptography
|||storing a globalsign signing authority certificate's private key in a safe
|||procedures for storing a globalsign signing authority certificate's private key in a safe

(!) Transfer private key securely to the security team following instructions on https://example.com/instructions:

- (!) If updating an existing Globalsign certificate, request the USB key from OTG, otherwise order a new secure USB key, answering to security requirements.
– (!) Delete original encrypted keys from disk.
– (!) Retrieve key, cert and intermediate cert from a Live instance.
– (!) Encrypt the certificates and keys via openssl using the aes256 algorithm, as described in instructions.
– (!) Print out the completed form from the instructions, with a description of the contents and any passwords needed to access the physical key (eg. in the case of USB hardware protection or encrypted contents) and any keys held within it, and this printout should be secured to the physical key.
- (!) Raise a SECUREKEY JIRA ticket as per instructions.
– (!) Hand over the print out and USB key to whoever is responsible for storing it in a safe.

Example security key form:

Date added to safe:

JIRA SECUREKEY ticket:

The USB stick device password is:

Contents:

This encrypted USB stick contains the following security files for the EXAMPLE application (https://example.application.com), owned by the Example team, located in Example location (Contact: example@email.com):

Globalsign certificate:
encrypted-example.application.com.crt

Private key for Globalsign certificate:
encrypted-example.application.com.pem

Additional notes:

The files have been encrypted using random passwords and the following command:
openssl enc -in example-private-key.pem -out example-encrypted-private-key.pem -salt -e -aes256

The password for encrypted Globalsign certificate is: 

The password for encrypted Private key is: 

To decrypt the USB device run the device software for relevant OS and enter device password.

---
