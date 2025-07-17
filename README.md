**Start server locally:**
hugo server -D

**Build files for docs folder** (publishDir = "docs")
hugo

**First-time setup**

# Personal Hugo Website

This repository contains the source for a personal website built with the [Hugo](https://gohugo.io/) static site generator.

## Repository overview

The project follows a typical Hugo layout:

```
archetypes/      # archetype templates for new content
assets/          # source JS/CSS (e.g., dark-mode script)
content/         # Markdown pages
layouts/         # custom layouts and partial templates
static/          # static files (images, JS libraries, PDFs)
themes/          # theme submodule (\"hugo-coder\")
docs/            # generated site output for GitHub Pages
public/          # another build output (kept in repo)
config.toml      # site configuration
README.md        # build instructions
```

### How the site works
- **Building/Running** – use `hugo server -D` to run locally and `hugo` to build the site. The generated files are written to `docs/` for deployment.
- **Content** – Markdown files under `content/` provide the pages such as `about.md`, `contact.md`, `cv.md`, and more.
- **Layouts & Assets** – HTML templates live in `layouts/` and rely on parameters from `config.toml`. JavaScript and CSS assets are under `assets/`.
- **Static Files** – Files in `static/` are copied verbatim into the built site.

### Getting started
1. Download the theme submodule:
   ```bash
   git submodule update --init --recursive
   ```
2. Install Hugo (on macOS you can use [Homebrew](https://brew.sh/)):
   ```bash
   brew install hugo
   ```
3. Start the development server:
   ```bash
   hugo server -D
   ```
4. Build the site for production:
   ```bash
   hugo
   ```

### Which files to update
- Edit or add content under `content/`.

### See results
- Local preview: <http://localhost:1313/hugosite/>
- Live site: <https://npantelaios.github.io/hugosite/>

---

#### Hugo version currently used
```
hugo version
(NEW) hugo v0.115.4-dc9524521270f81d1c038ebbb200f0cfa3427cc5+extended linux/amd64 BuildDate=2023-07-20T06:49:57Z VendorInfo=gohugoio
Hugo Static Site Generator v0.80.0-DEV linux/amd64 BuildDate: unknown -> build with brew/homebrew

-----

## Running tests

Install dependencies and run Jest:

```bash
npm install
npm test
=======
```
