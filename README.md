# Bruno Campiol GitHub page

Personal webpage in Github. Check it out below link

[https://brunocampiol.github.io](https://brunocampiol.github.io)

## Requirements

- [Jekyll](https://jekyllrb.com)

After installing prerequisites and experiencing issues trying to `gem install jekyll bundler`, then do the following:

Open PowerShell and check if ridk is available:

```powershell
ridk version
```

If works, then run 

```powershell
ridk install
```

And choose option 3 (MSYS2 and MINGW development toolchain). This installs the matching gcc/make via MSYS2's package manager into the correct locations, which is what actually fixes the path resolution. 

Open a new fresh PowerShell window (important — PATH needs to reload) and 

```powershell
gem install jekyll bundler
```

## Usage

You may need to install the missing gem files from Gemfile.lock

```bash
bundle install
```

Jekyll will build content and create all static items. Destination folder should be `_site`

The `Gemfile.lock` will be updated with new gems if available

Pass `--livereload` to automatically refresh the page with each change

```bash
bundle exec jekyll serve --livereload
```

If creating new posts, use the `--drafts` option to see them before going live.

```bash
bundle exec jekyll serve --drafts
```

Or, alternatively, with both options

```bash
bundle exec jekyll serve --drafts --livereload
```

## License

The following directories and their contents are Copyright Bruno Campiol.
You may not reuse anything there without my permission:

- \_posts/
- \_drafts/
- assets/

All other directories and files are MIT Licensed.
