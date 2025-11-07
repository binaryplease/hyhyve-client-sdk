# HyHyve Client SDK Examples

This directory contains example applications demonstrating how to use the HyHyve Client SDK.

## Getting Started

### Install Dependencies

First, make sure you have installed the dependencies for both the SDK and examples:

```bash
# Install SDK dependencies (from root)
cd ..
npm install

# Install examples dependencies
cd examples
npm install
```

### Run the Examples

```bash
npm run dev
```

This will start a development server at `http://localhost:3001`.

### Available Examples

- **Basic Example** (`index.html`) - Demonstrates basic SDK usage with random user profiles
- **JWT Authentication Example** (`jwt-auth-example.html`) - Shows how to implement JWT authentication

## Building for Production

```bash
npm run build
```

This will create a production build in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Using with Nix

If you're using the Nix flake:

```sh
nix develop
```

Then you can use the justfile commands from the root:

```sh
just dev-example
```

🎉
