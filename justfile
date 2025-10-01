# Build the client SDK
build:
    npx vite build && tsc --emitDeclarationOnly --outDir dist

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