# Build the client SDK
build:
    npx vite build && npx tsc --emitDeclarationOnly --outDir dist

# Build the example and copy to client build directory
build-example:
    npx vite build --config vite.example.config.ts
    mkdir -p ../client/build/sdk/example
    cp -r example-dist/* ../client/build/sdk/example/

# Development mode with watch
dev:
    npx vite build --watch

# Run development and example together
dev-with-example:
    concurrently \
        --kill-others-on-fail \
        --names "DEV,EXAMPLE" \
        --prefix-colors "blue,green" \
        "npx vite build --watch" \
        "npx vite serve example --port 3001"

# Preview the built SDK
preview:
    npx vite preview

# Type checking without emitting files
typecheck:
    npx tsc --noEmit

# Run the example application
example:
    npx vite serve example --port 3001