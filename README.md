# Milo Me - Monorepo Workspace

A modern monorepo workspace built with Nx, Next.js 15, Tailwind CSS v4, and shadcn/ui.

## Project Structure

```
milo-me-new/
├── apps/
│   ├── side-projects/    # Side projects showcase
│   ├── slidevs/          # Slides/presentations
│   └── docs/             # Documentation & Blog (Fumadocs)
├── libs/
│   └── shared-ui/        # Shared UI components (shadcn/ui)
├── .husky/               # Git hooks
└── vercel.json           # Vercel deployment config
```

## Tech Stack

- **Monorepo**: Nx 21.6.3
- **Framework**: Next.js 15.3.0 (App Router)
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS v4.0.0
- **Components**: shadcn/ui
- **Documentation**: Fumadocs v15
- **Package Manager**: pnpm
- **Type Safety**: TypeScript 5.9
- **Linting**: ESLint 9 + Prettier
- **Git Hooks**: Husky + lint-staged + commitlint

## Getting Started

### Prerequisites

- Node.js 24+
- pnpm 10+

### Installation

```bash
pnpm install
```

### Development

Run all apps in development mode:

```bash
pnpm dev
```

Run specific app:

```bash
pnpm nx dev side-projects
pnpm nx dev slidevs
pnpm nx dev docs
```

### Building

Build all apps:

```bash
pnpm build
```

Build specific app:

```bash
pnpm nx build side-projects --prod
```

## Code Quality

### Linting

```bash
pnpm lint
```

### Formatting

```bash
# Format all files
pnpm format

# Check formatting
pnpm format:check
```

### Type Checking

```bash
pnpm type-check
```

## Git Commit Convention

This project follows conventional commits with custom scope rules:

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: New features
- `fix`: Bug fixes
- `refactor`: Code refactoring
- `test`: Testing changes
- `docs`: Documentation
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `style`: Code style changes
- `build`: Build system changes
- `ci`: CI/CD changes

### Scopes

- `side-projects`: Side projects app
- `slidevs`: Slides app
- `docs`: Documentation & Blog app
- `shared-ui`: Shared UI library
- `workspace`: Workspace-level changes
- `*`: Multiple apps/libs

### Examples

```bash
git commit -m "feat(side-projects): add project showcase grid"
git commit -m "feat(docs): add new blog post about React"
git commit -m "refactor(shared-ui): extract Button component"
git commit -m "chore(workspace): update dependencies"
```

### Automated Checks

- **Pre-commit**: Runs lint-staged (ESLint + Prettier)
- **Commit-msg**: Validates commit message format

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

Each app needs to be deployed as a separate Vercel project:

1. Import your repository to Vercel
2. For each app, create a new project with:
   - **Root Directory**: `apps/<app-name>`
   - **Build Command**: `cd ../.. && pnpm nx build <app-name> --prod`
   - **Output Directory**: `.next`

## Adding shadcn/ui Components

```bash
# Add a component to shared-ui
pnpm dlx shadcn@latest add button

# Components will be added to libs/shared-ui/src/components/ui/
```

## Project Features

- ✅ Nx integrated monorepo
- ✅ Next.js 15 with App Router
- ✅ React 19
- ✅ Tailwind CSS v4 (zero-config)
- ✅ shadcn/ui component library
- ✅ Fumadocs for documentation & blog
- ✅ TypeScript strict mode
- ✅ ESLint + Prettier
- ✅ Husky git hooks
- ✅ Conventional commits
- ✅ lint-staged
- ✅ Vercel-ready deployment config
- ✅ Shared UI library architecture

---

## Run tasks

To run tasks with Nx use:

```sh
npx nx <target> <project-name>
```

For example:

```sh
npx nx build myproject
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

To install a new plugin you can use the `nx add` command. Here's an example of adding the React plugin:
```sh
npx nx add @nx/react
```

Use the plugin's generator to create new projects. For example, to create a new React app or library:

```sh
# Generate an app
npx nx g @nx/react:app demo

# Generate a library
npx nx g @nx/react:lib some-lib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Set up CI!

### Step 1

To connect to Nx Cloud, run the following command:

```sh
npx nx connect
```

Connecting to Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Step 2

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/intro#learn-nx?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
