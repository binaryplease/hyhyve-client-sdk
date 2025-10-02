# Build the client SDK
build:
    bunx vite build && bunx tsc --emitDeclarationOnly --outDir dist

# Build the example and copy to client build directory
build-example:
    bunx vite build --config vite.example.config.ts
    mkdir -p ../client/build/sdk/example
    cp -r example-dist/* ../client/build/sdk/example/

# Development mode with watch
dev:
    bunx vite build --watch

# Preview the built SDK
preview:
    bunx vite preview

# Type checking without emitting files
typecheck:
    bunx tsc --noEmit

# Run the example application
example:
    bunx vite dev example --port 3001