# OneK Nature Reserve website

The bilingual website for OneK Nature Reserve in southern Costa Rica.

This project combines the visual character and wildlife archive of the original website with the new conservation, research, volunteer, and nature-education plan.

## Preview workflow

- `main` is the confirmed public preview.
- Each new change is developed in an `agent/*` branch.
- Vercel creates a unique preview URL for each branch and pull request.
- The existing `oneknaturereserve.org` domain remains unchanged until final launch.

For multi-account development and review rules, see [COLLABORATION.md](./COLLABORATION.md).

## Local development

```bash
pnpm install
pnpm run dev
```

## Validation

```bash
pnpm run build
pnpm run build:vercel
```
