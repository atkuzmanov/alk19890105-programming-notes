# Sublime Text notes

|||sublime text 2 sync settings backup

<https://stackoverflow.com/questions/11365948/how-to-save-restore-sublime-text-2-configs-plugins-to-migrate-to-another-compute>

```bash
### Quit Sublime Text 2

### Backup and rename current Sublime Text 2 dir
mv ~/Library/Application\ Support/Sublime\ Text\ 2 ~/Library/Application\ Support/bkp1-Sublime-Text-2-2017-04-14

### Create a symlink to Google Drive or Dropbox
ln -s ~/Documents/GoogleDrive/Mac-software/SublimeText2-Bkps/Sublime\ Text\ 2 ~/Library/Application\ Support/Sublime\ Text\ 2

### Check that the symlink has worked
ls -la ~/Library/Application\ Support/Sublime\ Text\ 2/
```

---

|||sublime text settings user preferences

```json
{
	"color_scheme": "Packages/Color Scheme - Default/Cobalt.tmTheme",
	"dictionary": "Packages/Language - English/en_GB.dic",
	"font_size": 16.0,
	"ignored_packages":
	[
		"Vintage"
	],
	"open_files_in_new_window": false,
	"spell_check": true,
	"theme": "Adaptive.sublime-theme"
}
```

---

|||sublime text 2 package control

<https://packagecontrol.io/>
<https://packagecontrol.io/packages/SwitchLanguage>
<https://packagecontrol.io/packages/Bidirectional%20text%20support>
<https://packagecontrol.io/packages/LaTeX%20Word%20Count>

|||sublime text 2 package control settings user preferences

```json
{
 "bootstrapped": true,
 "in_process_packages":
 [
 ],
 "installed_packages":
 [
  "Bidirectional text support",
  "Highlight",
  "LaTeX Word Count",
  "Package Control",
  "Simple Print Function",
  "SwitchLanguage"
 ]
}
```

---

|||sublime text 2 spell check language dictionaries

Sublime Text 2 language spell check

<https://www.sublimetext.com/docs/2/spell_checking.html>

Download language spell check dictionaries from OpenOffice:

<https://www.openoffice.org/lingucomponent/dictionary.html>

<http://extensions.openoffice.org/>

---
