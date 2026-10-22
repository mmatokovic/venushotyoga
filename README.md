[![Netlify Status](https://api.netlify.com/api/v1/badges/6d693c97-23d2-4f7a-8096-8f92e1099b7e/deploy-status)](https://app.netlify.com/projects/venushotyoga/deploys)
[![Build](https://github.com/mmatokovic/venushotyoga/actions/workflows/build.yml/badge.svg)](https://github.com/mmatokovic/venushotyoga/actions/workflows/build.yml)

# Venus Hot Yoga

Website of [Venus Hot Yoga](https://venushotyoga.hr), built with [Hugo](https://gohugo.io/) and [Tailwind CSS](https://tailwindcss.com/), hosted on [Netlify](https://www.netlify.com/) and edited with [Decap CMS](https://decapcms.org/).

## Development

```sh
pnpm install
hugo server
```

Build exactly like CI and Netlify do:

```sh
hugo --gc --minify --panicOnWarning
```

See [CLAUDE.md](CLAUDE.md) for how the site is put together.

## Branches

- `main` is deployed to production. It is protected: changes arrive through pull requests that pass the `build` check.
- `develop` collects work for the next release; with Netlify branch deploys enabled it is built with `HUGO_ENVIRONMENT=preview`.
- Feature branches are opened as pull requests and get a Netlify deploy preview.

## License

[Apache License 2.0](LICENSE)

## Author

[Mislav Matoković](https://github.com/mmatokovic)
