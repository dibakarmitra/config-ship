# Changelog

All notable changes to this project will be documented in this file.

This project follows semantic versioning.

---

## [0.1.0] – Initial Release

### Added
- Layered configuration resolution:
  - defaults
  - root config file
  - environment variables
  - runtime overrides
- Nested environment variable support using `__`
  - `APP_DB__HOST` → `db.host`
- Runtime overrides via `config.set()`
- Safe, package-friendly behavior (no crashes on missing config)
- Support for Node.js, Deno, and Bun
- Minimal public API:
  - `createConfig()`
  - `get()`
  - `set()`
  - `has()`
  - `all()`

### Behavior Guarantees
- Deterministic resolution order
- Environment keys are lowercased
- Missing config never throws
- Defaults always apply

### Known Limitations
- Root config file loading is skipped (async loaders planned)
- No schema validation by design

---

## Planned
- Async loaders
- Custom loader ordering
- Read-only config snapshots
