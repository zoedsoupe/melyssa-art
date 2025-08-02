# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Local Development
```bash
# Install dependencies
mix deps.get

# Start the development server
mix phx.server
```
Server runs on `localhost:4000`

### Code Quality
```bash
# Format code (using Styler)
mix format

# Run static analysis (Credo)
mix credo

# Run Dialyzer type checking
mix dialyzer

# Run tests
mix test
```

### Production
```bash
# Build release
MIX_ENV=prod mix release

# Docker build
docker build -t melyssa-art .

# Deploy to Fly.io
fly deploy
```

## Architecture Overview

This is a simple Phoenix web application that displays an animated pixel art poster for Melyssa's birthday. The core logic is date-based conditional rendering.

### Key Components

- **MainController** (`lib/melyssa_art_web/controllers/main_controller.ex`): Contains the main business logic that determines whether to show the birthday poster (July 31st or August 2nd, 2025) or the regular version
- **Router** (`lib/melyssa_art_web/router.ex`): Single route application serving the main page at `/`
- **Template** (`lib/melyssa_art_web/controllers/main_html/show.html.heex`): Conditional rendering of GIF images with music controls overlay
- **Static Assets** (`priv/static/images/`): Contains the animated GIF files:
  - `melyssa.gif` / `melyssa4x.gif` - Birthday versions with text
  - `melyssa_notext.gif` / `melyssa_notextx4.gif` - Regular versions without text

### Development Environment

The project uses Nix flakes for development environment setup with Elixir 1.18.4 and Erlang 28. The flake provides a consistent development shell.

### Deployment

- Production deployment on Fly.io (app: `melyssa-art`)
- Docker-based deployment using multi-stage builds
- Timezone configured for America/Sao_Paulo
- Static assets served directly by Phoenix
- **Important**: GIF images are stored in Git LFS - ensure `lfs: true` in GitHub Actions checkout

### Code Style

- Uses Styler for code formatting
- Credo for static analysis
- Dialyzer for type checking
- Standard Phoenix conventions throughout