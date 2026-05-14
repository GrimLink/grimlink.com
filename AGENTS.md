# AI Agent Instructions (AGENTS.md)

This file contains foundational mandates and project context for AI assistants (Gemini, Claude, etc.).

## Project Context
- **Tech Stack:** Astro (Static Site Generation).
- **Styling:** [Fylgja CSS](https://fylgja.dev) (using `@fylgja/base`, `@fylgja/tokens`, and `@fylgja/utilities`).
- **No Starlight:** This project does **not** use Astro Starlight. Avoid assuming its presence or using its components/conventions.

## Engineering Standards & Patterns

### 1. Fylgja CSS Usage
- **Layout Helpers:** Use `container`, `flow`, `stack`, and `grid-cols` from Fylgja utilities.
- **Design Tokens:** Prioritize Fylgja design tokens for spacing (`--size-x`), typography (`--font-size-x`), and colors.
- **Responsive Design:** Use Fylgja's responsive CSS variable pattern (e.g., `--md_grid-cols: 2`).
- **Accessibility:** For unstyled lists (using `list-style: none`), always set `role="list"` on the `<ul>` or `<ol>` element to preserve accessibility for screen readers.

### 2. Component Structure & Styling
- **Minimal Markup:** Keep the HTML/Astro markup as lean as possible. Avoid adding repetitive classes to child elements (e.g., `.tag`, `.item`) if they can be styled via inheritance or parent selectors in the `<style>` block.
- **CSS Inheritance:** Favor CSS inheritance for properties like `font-style`, `color`, and `font-family`. Apply these to the parent container to style all children consistently.
- **Local Styles:** Use local `<style>` blocks only for component-specific overrides that cannot be handled by Fylgja utilities. Keep these focused and inheritance-friendly.

## Workflow Constraints
- **NPM Commands:** Do NOT run `npm` commands (e.g., `npm run build`, `npm install`). The user is already managing the development environment and will handle builds and dependencies manually.

## Hallucination Prevention
- Always verify the existence of a library or framework in `package.json` before suggesting its use.
- Do not assume Tailwind CSS or other popular frameworks are available unless explicitly found in the project configuration.
