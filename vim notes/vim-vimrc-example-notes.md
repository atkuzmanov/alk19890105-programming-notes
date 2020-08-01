# vim vimrc example notes

|||vim |||vimrc |||.vimrc

> References
>
> https://github.com/bagolol/dotfiles/blob/master/vimrc

```vim
" | Author: James Lawson
" | Edited by: Rocco Righi
" | License: MIT
" +---------------------------------------------------------

" ----------------------------------------------------------
" -- INSTALLATION
" ----------------------------------------------------------
" 1. Install the dependencies listed below.
" 2. Open vim. Ignore any errors.
" 3. In normal mode, execute :PluginInstall
"    you should see all the plugins install successfully.
" 4. Restart vim.

" ----------------------------------------------------------
" -- DEPENDENCIES
" ----------------------------------------------------------
" [1] vundle
"     $ git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
"     Essential Vundle commands ...
"     -  :PluginInstall,
"     -  :PluginClean
"     -  :PluginList,
" [2] Powerline
"     pip install powerline-status
"     https://powerline.readthedocs.org/en/latest/installation.html
" [3] clipboard+
"     vim needs to be compiled with clipboard+
"     $ vim --version | grep clipboard
" [4] CMake and YCM python installation script
"     $ brew install cmake
"     $ cd ~/.vim/bundle/YouCompleteMe
"     $ ./install.py
" [5] python+
"     vim needs to be compiled with python+ or python3+
"     $ vim --version | grep python
" [6] The Silver Searcher (https://github.com/ggreer/the_silver_searcher)
"     $ brew install the_silver_searcher
" [7] The powerline fonts (https://github.com/powerline/powerline)
"     $ git clone git@github.com:powerline/fonts.git
"     $ ./install.sh
"     Then go to iTerm2 and change the font to one of the newly installed
"     fonts that end with "for powerline"
" [8] jq
"     $ brew install jq

"----------------------------------------------------------
"-- SETUP VUNDLE
"----------------------------------------------------------

""set nocompatible              " required by vundle
""filetype off                  " required by vundle

" -- set the runtime path to include Vundle
"    initialize vundle then import  [1]
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

" ----------------------------------------------------------
" -- IMPORT VIM PLUGINS (VIA VUNDLE)
" ----------------------------------------------------------

" -- [VUNDLE]: vundle plugin
"    that manages Vundle. Essential, don't remove
"    depends on [1]
Plugin 'gmarik/Vundle.vim'


" Plugin 'jaxbot/browserlink.vim'

" ----------------------------------------------------------

" -- [YCM]: YouCompleteMe - vim as-you-type autocompletion
"    depends on [4]
"Plugin 'Valloric/YouCompleteMe'

" -- [ULTI]: UltiSnips
"    depends on [YCM]
" Plugin 'SirVer/ultisnips'

" ----------------------------------------------------------
" -- [RAINBOW]: parethesis matching using different colours
Plugin 'kien/rainbow_parentheses.vim'

" -- [CTRLP]: ctrlp (control-p) - vim fuzzy file finder
"    (written in vimscript and has no dependencies)
Plugin 'kien/ctrlp.vim'

" -- [AG]: - make it easier to grep files inside vim
"    Adds `The Silver Searcher` to vim
"    depends on [6]
Plugin 'rking/ag.vim'

" ----------------------------------------------------------

" -- [SNIPEMU]: SnippetsEmu
Plugin 'https://github.com/vim-scripts/snippetsEmu'

" ----------------------------------------------------------

" -- [COMMENT]: tim Pope's commenting plugin
"    use gcc to comment a line
Plugin 'tpope/vim-commentary'

" -- [RENAME]: adds :Rename user function
"    so that you can rename a file from inside vim
Plugin 'ReekenX/vim-rename2'

" -- [TMUX]: seamless navigation between tmux panes and vim splits
Plugin 'christoomey/vim-tmux-navigator'

" -- [JKJUMP]: cursor can jumping back through previous positions
Plugin 'teranex/jk-jumps.vim'

" -- [EMMET]: shortcuts for quickly writing HTML
Plugin 'mattn/emmet-vim'

" -- [WHITESP]: highlight trailing whitespace
Plugin 'ntpeters/vim-better-whitespace'

" ----------------------------------------------------------

" -- [JELLY] Jellybeans theme
Plugin 'nanotech/jellybeans.vim'

" ----------------------------------------------------------

" -- [YASL]: yet Another Javascript Syntax
Plugin 'othree/yajs.vim'
Plugin 'mxw/vim-jsx'
" -- [GITGUTTER]: shows diff since last commit
Plugin 'airblade/vim-gitgutter'
" -- Other Languages
" Plugin 'tpope/vim-dispatch'
Plugin 'thoughtbot/vim-rspec'
Plugin 'tpope/vim-rails'
" Plugin 'lukerandall/haskellmode-vim'
" Plugin 'ElmCast/elm-vim'
Plugin 'derekwyatt/vim-scala'

" ----------------------------------------------------------

" -- [EXPAND]: expand selection gradually
Plugin 'terryma/vim-expand-region'

" -- [TXTOBJ]: custom text objects
Plugin 'kana/vim-textobj-user'

" -- [TXTOBJ-QUOTE]: treat quotes as a text object
" depends on [TXTOBJ]
Plugin 'beloglazov/vim-textobj-quotes'

" -- [AIRLINE]: Add airline
" -- depends on [7]
Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'

" -- [SPACING AUTO-DETECT]: Auto detect spacing
Plugin 'tpope/vim-sleuth.git'

" -- [PUG]: Pug syntax highlighting
Plugin 'digitaltoad/vim-pug.git'
" ----------------------------------------------------------
" END VIM PLUGINS
" ----------------------------------------------------------

call vundle#end()          " requied for vundle
filetype plugin indent on  " required for vundle

" ----------------------------------------------------------

" ----------------------------------------------------------
" -- ESSENTIAL BEHAVIOUR
" ----------------------------------------------------------
" make sure vim loads the right ruby version
set shell=/bin/sh
" -- map the vim Leader Key to comma
let mapleader = ","

" -- reduce keymap timeout from default of 1000ms to 500ms
set timeoutlen=500

" -- use relative line numbering
"    relative number is used in visual mode
"    but becomes absolute number in insert mode
set relativenumber
set number
autocmd InsertEnter * :set number norelativenumber
autocmd InsertLeave * :set relativenumber

" -- make sure vim returns to the same line when you reopen a file.
augroup line_return
    au!
    au BufReadPost *
        \ if line("'\"") > 0 && line("'\"") <= line("$") |
        \     execute 'normal! g`"zvzz' |
        \ endif
augroup END

 " ----------------------------------------------------------
 " -- ESSENTIAL APPEARANCE
 " ----------------------------------------------------------

 " -- enable highlighting of current line
 set cul
 hi CursorLine term=none cterm=none ctermbg=3

 " -- use jellybeans theme
 "    depends on [JELLY]
 colorscheme jellybeans

 " -- enable syntax highlighting
 syntax enable

 " -- change colour of the line numbers
 highlight LineNr ctermfg=DarkGrey

 " -- import powerline status bar
 "    depends on [2]
 " -- always show the status bar
 "    needed to actually show powerline
 " source /usr/local/lib/python2.7/site-packages/powerline/bindings/vim/plugin/powerline.vim
 " set laststatus=2

 " -- always keep 3 lines visible at top and bottom
 "    when cursor hits top/bottom and you scroll
 set scrolloff=3

 " -- show matching parentheses
 "    :help showmatch
 " -- change color of highlighting of matching paranthsis
 "
" http://stackoverflow.com/questions/10746750/set-vim-bracket-highlighting-colors
 set showmatch
 hi MatchParen cterm=bold ctermbg=none ctermfg=magenta

 " -- turn on invisibles by default
 "    and use the same symbols as TextMate for tabstops and EOLs
 set list!
 set listchars=tab:▸\ ,eol:¬

 set laststatus=2

 " ----------------------------------------------------------
 " -- FORGIVING
 " ----------------------------------------------------------

 " -- make :W an alias for :w
cnoreabbrev <expr> W ((getcmdtype() is# ':' && getcmdline() is# 'W')?('w'):('W'))
 " -- fix backspace
 "    http://vim.wikia.com/wiki/Backspace_and_delete_problems
 set backspace=indent,eol,start

 " -- useful aliases
 command! W w
 command! Q q
 command! Q q
 command! Qall qall
 command! QA qall
 command! E e

 " ----------------------------------------------------------
 " -- DISABLE
 " ----------------------------------------------------------

 " -- disable VIM backups (.swp files)
 set nobackup
 set noswapfile

 " -- map arrow keys to no-ops
 map <up> <nop>
 map <down> <nop>
 map <left> <nop>
 map <right> <nop>

 " -- disable Ex mode
 map Q <nop>

 " -- disable K
 nnoremap K <nop>

 " -- disable U
 "    emacs style undo-ing...no thanks ;)
 nnoremap U <nop>

 " ----------------------------------------------------------
 " -- COPY AND PASTE
 " ----------------------------------------------------------

 " -- prevent cursor move after yank
 vmap y ygv<Esc>

 " -- with vim comipiled with clipboard+, [3]
 "    we can make vim and system clipboard work together
 set clipboard=unnamed

 " -- visually select text just pasted with <leader>V
 "    go to just before/after pasted text with gp and gP
 nnoremap <leader>v `[v`]

 " -- yank till end of line
 nnoremap Y y$
" RSpec.vim mappings
"
 " ----------------------------------------------------------
 " -- RUN RUBY TESTS
 " ----------------------------------------------------------

map <Leader>t :call RunCurrentSpecFile()<CR>
map <Leader>s :call RunNearestSpec()<CR>
map <Leader>l :call RunLastSpec()<CR>
map <Leader>a :call RunAllSpecs()<CR>

 " ----------------------------------------------------------
 " -- EDITING
 " ----------------------------------------------------------
 " -- tells you if the file you're working on has been modified 
autocmd InsertEnter * checktime
autocmd CursorHold * checktime

 " -- add a comma at the end of the line
 inoremap << <Esc>$a,<Esc>

 " -- add a new line in normal mode
 nmap <CR> o<Esc>k

 " auto-complete
 inoremap ff <C-p>
 " -- keep the cursor in place while joining lines
 nnoremap J mzJ`z

 " -- given J joins a line, why not have S split a line "
 "    make S break a line into two lines
 nnoremap S i<CR><Esc><right>
" -- remove white spaces
 nnoremap <leader>p :%s/\s\+$//e<CR>
 " -- some sneaky shortcuts for inserting symbols
 inoremap <Leader>h #
 inoremap <Leader>b `
 inoremap <Leader>; ;
 inoremap <Leader>c ,
 inoremap <Leader>[ [

 " -- add semicolon at the end of the line
 "    quickly by using ,,
 inoremap <Leader><Leader> <Esc>$a;<Esc>

 " -- exit insert mode quickly with ;;
 " -- exit visual mode quickly with ;;
 inoremap ;; <Esc>
 vnoremap ;; <Esc>"

 " -- select and delete till the end of the line
 nnoremap<leader>.. <C-v>$hc
 " -- select till the end of the line
 nnoremap<leader>. <C-v>$h
 "
 " ----------------------------------------------------------
 " -- NAVIGATING
 " ----------------------------------------------------------
 " toggle to previous file
 nnoremap <Leader>z :e#<CR>
 " open file buffer
 nnoremap <Leader>m :ls<CR>
 " ----------------------------------------------------------
 " -- SEARCH AND REPLACE
 " ----------------------------------------------------------

 " -- see: :help ignorecase, :help smartcase,
 "         :help hlsearch, :help incsearch
 set ignorecase
 set smartcase
 set hlsearch
 set incsearch

 " -- center screen when moving between between search terms
 nnoremap n nzzzv
 nnoremap N Nzzzv

 " -- shortcut to turn off search highlighting
 nnoremap <leader>nh :noh

 " ----------------------------------------------------------
 " -- INDENTATION
 " ----------------------------------------------------------
let g:jsx_ext_required = 0 " Allow JSX in normal JS files
 " -- see: :help smartindent, :help expandtab,
 "         :help shiftwidth, :help autoindent
 set smartindent
 set expandtab
 set shiftwidth=2
 set autoindent

 " -- indent with *spaces*, not tabs
 "    use either 2 or 4 spaces, depending on the language
 autocmd Filetype ruby setlocal ts=2 sts=2 sw=2
 autocmd Filetype python setlocal ts=2 sts=2 sw=2
 autocmd Filetype html setlocal ts=2 sts=2 sw=2
 autocmd Filetype c setlocal ts=4 sts=4 sw=4
 autocmd Filetype cpp setlocal ts=4 sts=4 sw=4
 autocmd Filetype java setlocal ts=4 sts=4 sw=4
 autocmd Filetype javascript setlocal ts=4 sts=4 sw=4
 " autocmd Filetype javascript setlocal ts=2 sts=2 sw=2
 autocmd Filetype scss setlocal ts=4 sts=4 sw=4

 " ----------------------------------------------------------
" -- MACROS
" ----------------------------------------------------------

" -- replay macros with space
nnoremap <Space> @q

" ----------------------------------------------------------
" -- PLUGINS
" ----------------------------------------------------------

" -- [AIRLINE]
" let g:airline#extensions#tabline#enabled = 1
" let g:airline#extensions#tabline#left_sep = ' '
" let g:airline#extensions#tabline#left_alt_sep = '|'
let g:airline_powerline_fonts = 1

" function! AirLineConfigure(...)
"   call a:l.add_section('StatusLine', 'all')
"   return l
" endfunction
" call airline#add_statusline_func('AirLineConfigure')


" -- [SNIPEMU]
let g:snippetsEmu_key = "["

" ----------------------------------------------------------
" --[CTRLP IGNORE]
" ----------------------------------------------------------
let g:ctrlp_custom_ignore = '\v[\/](bower_components|node_modules|target|dist)|(\.(swp|ico|git|svn))$'


" ----------------------------------------------------------
" --[RAINBOW]
" ----------------------------------------------------------
let g:rbpt_colorpairs = [
    \ ['brown',       'RoyalBlue3'],
    \ ['Darkblue',    'SeaGreen3'],
    \ ['darkgray',    'DarkOrchid3'],
    \ ['darkgreen',   'firebrick3'],
    \ ['darkcyan',    'RoyalBlue3'],
    \ ['darkred',     'SeaGreen3'],
    \ ['darkmagenta', 'DarkOrchid3'],
    \ ['brown',       'firebrick3'],
    \ ['gray',        'RoyalBlue3'],
    \ ['black',       'SeaGreen3'],
    \ ['darkmagenta', 'DarkOrchid3'],
    \ ['Darkblue',    'firebrick3'],
    \ ['darkgreen',   'RoyalBlue3'],
    \ ['darkcyan',    'SeaGreen3'],
    \ ['darkred',     'DarkOrchid3'],
    \ ['red',         'firebrick3'],
    \ ]
let g:rbpt_max = 16
let g:rbpt_loadcmd_toggle = 0
au VimEnter * RainbowParenthesesToggle
au Syntax * RainbowParenthesesLoadRound
au Syntax * RainbowParenthesesLoadSquare
au Syntax * RainbowParenthesesLoadBraces


" -- Grep functions
"    These are built upon [AG] plugin
" function! GrepSass(arg)
"   let command = ['Ag', a:arg] " call the :Ag command that [AG] exposes
"   let command += ['-G .scss'] " only search for .scss files
"   let command += ['--ignore-dir=node_modules/']
"   let command += ['--ignore-dir=.git/']
"   execute join(command, " ")
" endfunction
" command -nargs=* GrepSass call GrepSass('<args>')

" function! GrepJs(arg)
"   let command = ['Ag', a:arg] " call the :Ag command that [AG] exposes
"   let command += ['-G .js']   " only search for .js files
"   let command += ['--ignore-case'] " case-insensitive
"   let command += ['--ignore-dir=node_modules/']
"   let command += ['--ignore-dir=.git/']
"   execute join(command, " ")
" endfunction
" command -nargs=* GrepJs call GrepJs('<args>')
```

---
