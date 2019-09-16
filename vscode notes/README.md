# vscode notes

----

~/Library/Application\ Support/Code/User/settings.json

```json
{
    "editor.fontSize": 16,
    "editor.suggestSelection": "first",
    "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true,
    "files.trimTrailingWhitespace": true,
    "window.zoomLevel": 0
}
```

----

~/Library/Application\ Support/Code/User/syncLocalSettings.json

```json
{
    "ignoreUploadFiles": [
        "state.*",
        "syncLocalSettings.json",
        ".DS_Store",
        "sync.lock",
        "projects.json",
        "projects_cache_vscode.json",
        "projects_cache_git.json",
        "projects_cache_svn.json",
        "gpm_projects.json",
        "gpm-recentItems.json"
    ],
    "ignoreUploadFolders": [
        "workspaceStorage"
    ],
    "ignoreExtensions": [],
    "gistDescription": "Visual Studio Code Settings Sync Gist",
    "version": 342,
    "token": "",
    "downloadPublicGist": false,
    "supportedFileExtensions": [
        "json",
        "code-snippets"
    ],
    "openTokenLink": true,
    "disableUpdateMessage": false,
    "lastUpload": null,
    "lastDownload": null,
    "githubEnterpriseUrl": null,
    "askGistName": false,
    "customFiles": {},
    "hostName": null,
    "universalKeybindings": false,
    "autoUploadDelay": 20
}
```

----

```bash
$ ls -la ~/.vscode/extensions/

total 8
drwxr-xr-x  28 akuzmanov  staff  896 Sep 16 14:18 .
drwxr-xr-x   3 akuzmanov  staff   96 Nov 13  2018 ..
-rw-r--r--   1 akuzmanov  staff  144 Sep 16 14:18 .obsolete
drwxr-xr-x  11 akuzmanov  staff  352 Sep  3 11:59 davidanson.vscode-markdownlint-0.30.2
drwxr-xr-x  11 akuzmanov  staff  352 Aug 26 11:14 dbaeumer.vscode-eslint-1.9.1
drwxr-xr-x  16 akuzmanov  staff  512 Jun  3 16:43 dotjoshjohnson.xml-2.5.0
drwxr-xr-x  16 akuzmanov  staff  512 Aug 19 09:41 formulahendry.code-runner-0.9.14
drwxr-xr-x  11 akuzmanov  staff  352 May 23 12:04 mads-hartmann.bash-ide-vscode-1.3.3
drwxr-xr-x  12 akuzmanov  staff  384 Jul 17 13:38 ms-azuretools.vscode-docker-0.7.0
drwxr-xr-x  11 akuzmanov  staff  352 Sep 16 11:54 ms-azuretools.vscode-docker-0.8.1
drwxr-xr-x  21 akuzmanov  staff  672 Sep  3 11:59 ms-kubernetes-tools.vscode-kubernetes-tools-1.0.4
drwxr-xr-x  31 akuzmanov  staff  992 Sep  5 11:17 ms-python.python-2019.9.34474
drwxr-xr-x  31 akuzmanov  staff  992 Sep  9 10:07 ms-python.python-2019.9.34911
drwxr-xr-x  15 akuzmanov  staff  480 Jul 17 13:38 ms-vscode.go-0.11.4
drwxr-xr-x  15 akuzmanov  staff  480 Sep  5 11:17 redhat.java-0.48.0
drwxr-xr-x  15 akuzmanov  staff  480 Sep  3 11:59 redhat.vscode-yaml-0.5.2
drwxr-xr-x  15 akuzmanov  staff  480 Sep 16 11:54 redhat.vscode-yaml-0.5.3
drwxr-xr-x  13 akuzmanov  staff  416 May 23 12:05 rogalmic.bash-debug-0.3.5
drwxr-xr-x  13 akuzmanov  staff  416 Sep  9 10:07 rogalmic.bash-debug-0.3.6
drwxr-xr-x  25 akuzmanov  staff  800 Sep 16 14:18 shan.code-settings-sync-3.4.2
drwxr-xr-x  16 akuzmanov  staff  512 Aug 19 09:41 streetsidesoftware.code-spell-checker-1.7.18
drwxr-xr-x  27 akuzmanov  staff  864 Aug 26 17:36 visualstudioexptteam.vscodeintellicode-1.1.9
drwxr-xr-x  16 akuzmanov  staff  512 Aug 26 11:14 vscjava.vscode-java-debug-0.21.0
drwxr-xr-x  15 akuzmanov  staff  480 Jul 17 13:38 vscjava.vscode-java-dependency-0.5.1
drwxr-xr-x  12 akuzmanov  staff  384 Sep  3 11:59 vscjava.vscode-java-pack-0.8.0
drwxr-xr-x  12 akuzmanov  staff  384 Aug 12 11:20 vscjava.vscode-java-test-0.19.0
drwxr-xr-x  15 akuzmanov  staff  480 Aug 26 11:14 vscjava.vscode-maven-0.18.2
drwxr-xr-x  17 akuzmanov  staff  544 Aug 26 11:32 yzhang.markdown-all-in-one-2.4.2
```

----

https://stackoverflow.com/questions/35368889/how-to-export-settings-of-visual-studio-code

```text
With the current version of VSCode as of this writing (1.22.1), you can find your settings in

~/.config/Code/User on Linux (in my case, an, Ubuntu derivative)
C:\Users\username\AppData\Roaming\Code\User on Windows 10
~/Library/Application Support/Code/User/ on Mac OS X (thank you, Christophe De Troyer)
The files are settings.json and keybindings.json. Simply copy them to the target machine.

Your extensions are in

~/.vscode/extensions on Linux and Mac OS X
C:\Users\username\.vscode\extensions on Windows 10 (e.g., essentially the same place)
Alternately, just go to the Extensions, show installed extensions, and install those on your target installation. For me, copying the extensions worked just fine, but it may be extension-specific, particularly if moving between platforms, depending on what the extension does.

share
improve this answer
edited Oct 11 '18 at 20:32

Carl Vitullo
55633 silver badges1414 bronze badges
answered Apr 7 '18 at 10:33

T.J. Crowder
737k135135 gold badges13361336 silver badges1400
```

----
