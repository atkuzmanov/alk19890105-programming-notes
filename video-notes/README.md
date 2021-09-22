# Video notes

--------------------------------
--------------------------------

---

How do we download a blob url video [closed]

References:
> <https://www.youtube.com/watch?v=yKP7ZytjHhY>


```sh
# Need .m3u8 link:
$ ffmpeg -i 'https://url/to/some/file.m3u8' -bsf:a aac_adtstoasc \
    -vcodec copy -c copy -crf 50 file.mp4
```

---

```sh
youtube-dl --all-subs -f mp4 -o "file-name-to-save-as.mp4" "https://link-from-Google_Chrome-HLS_Downloader_extension"
```

---

```sh
youtube-dl -f bestvideo+bestaudio https://url.com/destination/stream.mpd
```

---

--------------------------------
--------------------------------
--------------------------------
