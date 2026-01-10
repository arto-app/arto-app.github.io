[private]
default:
  @just --list

# Start development server with hot reload
dev:
  npm run dev

# Build static site for production
build:
  npm run build

# Serve built site locally
preview:
  npm run preview

# Clean build artifacts
clean:
  rm -rf dist

# Install dependencies
install:
  npm install

# Format and lint code (requires project-specific setup)
check:
  npx tsc --noEmit
