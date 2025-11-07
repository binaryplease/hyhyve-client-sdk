# Build the client SDK
build:
    bunx vite build && bunx tsc --emitDeclarationOnly --outDir dist

# Development mode with watch
dev:
    bunx vite build --watch

# Preview the built SDK
preview:
    bunx vite preview

# Type checking without emitting files
typecheck:
    bunx tsc --noEmit

# Install dependencies for examples
install-examples:
    cd examples && npm install

# Run the examples application
dev-examples:
    cd examples && npm run dev

# Build the examples
build-examples:
    cd examples && npm run build

# Preview built examples
preview-examples:
    cd examples && npm run preview