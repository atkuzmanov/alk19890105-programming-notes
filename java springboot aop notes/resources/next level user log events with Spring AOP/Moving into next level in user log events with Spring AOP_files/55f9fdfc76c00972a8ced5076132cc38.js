document.write('<link rel="stylesheet" href="https://github.githubassets.com/assets/gist-embed-123720f37c57ce9a8f29de081c38ed61.css">')
document.write('<div id=\"gist88679680\" class=\"gist\">\n    <div class=\"gist-file\">\n      <div class=\"gist-data\">\n        <div class=\"js-gist-file-update-container js-task-list-container file-box\">\n  <div id=\"file-aspect-java\" class=\"file\">\n    \n\n  <div itemprop=\"text\" class=\"Box-body p-0 blob-wrapper data type-java \">\n      \n<table class=\"highlight tab-size js-file-line-container\" data-tab-size=\"8\">\n      <tr>\n        <td id=\"file-aspect-java-L1\" class=\"blob-num js-line-number\" data-line-number=\"1\"><\/td>\n        <td id=\"file-aspect-java-LC1\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">import<\/span> <span class=\"pl-smi\">org.aspect.lang.JoinPoint<\/span>;<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-aspect-java-L2\" class=\"blob-num js-line-number\" data-line-number=\"2\"><\/td>\n        <td id=\"file-aspect-java-LC2\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-aspect-java-L3\" class=\"blob-num js-line-number\" data-line-number=\"3\"><\/td>\n        <td id=\"file-aspect-java-LC3\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">@Before<\/span>(<span class=\"pl-s\"><span class=\"pl-pds\">&quot;<\/span>execution(void com.wkrzywiec.spring.library.service.LibraryUserDetailService.saveReaderUser(..))<span class=\"pl-pds\">&quot;<\/span><\/span>)<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-aspect-java-L4\" class=\"blob-num js-line-number\" data-line-number=\"4\"><\/td>\n        <td id=\"file-aspect-java-LC4\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">public<\/span> <span class=\"pl-k\">void<\/span> saveReaderMethod(<span class=\"pl-smi\">JoinPoint<\/span> joinPoint) {<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-aspect-java-L5\" class=\"blob-num js-line-number\" data-line-number=\"5\"><\/td>\n        <td id=\"file-aspect-java-LC5\" class=\"blob-code blob-code-inner js-file-line\">  <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-aspect-java-L6\" class=\"blob-num js-line-number\" data-line-number=\"6\"><\/td>\n        <td id=\"file-aspect-java-LC6\" class=\"blob-code blob-code-inner js-file-line\">  <span class=\"pl-k\">Object<\/span>[] lArgs <span class=\"pl-k\">=<\/span> joinPoint<span class=\"pl-k\">.<\/span>getArgs();<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-aspect-java-L7\" class=\"blob-num js-line-number\" data-line-number=\"7\"><\/td>\n        <td id=\"file-aspect-java-LC7\" class=\"blob-code blob-code-inner js-file-line\">  <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-aspect-java-L8\" class=\"blob-num js-line-number\" data-line-number=\"8\"><\/td>\n        <td id=\"file-aspect-java-LC8\" class=\"blob-code blob-code-inner js-file-line\">  <span class=\"pl-smi\">UserDTO<\/span> user <span class=\"pl-k\">=<\/span> (<span class=\"pl-smi\">UserDTO<\/span>) lArgs[<span class=\"pl-c1\">0<\/span>];<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-aspect-java-L9\" class=\"blob-num js-line-number\" data-line-number=\"9\"><\/td>\n        <td id=\"file-aspect-java-LC9\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-aspect-java-L10\" class=\"blob-num js-line-number\" data-line-number=\"10\"><\/td>\n        <td id=\"file-aspect-java-LC10\" class=\"blob-code blob-code-inner js-file-line\">  <span class=\"pl-smi\">System<\/span><span class=\"pl-k\">.<\/span>out<span class=\"pl-k\">.<\/span>println(<span class=\"pl-s\"><span class=\"pl-pds\">&quot;<\/span>Reader - <span class=\"pl-pds\">&quot;<\/span><\/span> <span class=\"pl-k\">+<\/span> user<span class=\"pl-k\">.<\/span>getUsername() <span class=\"pl-k\">+<\/span> <span class=\"pl-s\"><span class=\"pl-pds\">&quot;<\/span> - is saved!<span class=\"pl-pds\">&quot;<\/span><\/span>);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-aspect-java-L11\" class=\"blob-num js-line-number\" data-line-number=\"11\"><\/td>\n        <td id=\"file-aspect-java-LC11\" class=\"blob-code blob-code-inner js-file-line\">}<\/td>\n      <\/tr>\n<\/table>\n\n\n  <\/div>\n\n  <\/div>\n<\/div>\n\n      <\/div>\n      <div class=\"gist-meta\">\n        <a href=\"https://gist.github.com/wkrzywiec/55f9fdfc76c00972a8ced5076132cc38/raw/ae5fcf584a95b10871eff3d589186725cb8a0d5a/aspect.java\" style=\"float:right\">view raw<\/a>\n        <a href=\"https://gist.github.com/wkrzywiec/55f9fdfc76c00972a8ced5076132cc38#file-aspect-java\">aspect.java<\/a>\n        hosted with &#10084; by <a href=\"https://github.com\">GitHub<\/a>\n      <\/div>\n    <\/div>\n<\/div>\n')