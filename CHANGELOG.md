# Changelog

All notable changes to this project will be documented in this file.

This project follows semantic versioning.

---

## [0.1.2] - 2025-12-26

### Added

- **Raw environment variable name support**: Access env vars using original names (e.g., `APP_NAME`) or transformed names (e.g., `name`)
- Comprehensive test suite for raw env name functionality (6 new tests)
- MIT LICENSE file
- `homepage` and `bugs` fields in package.json
- Enhanced README with detailed examples and API documentation

### Fixed

- **Security**: Fixed critical prototype pollution vulnerability in `deepMerge` function
- Added protection against `__proto__`, `constructor`, and `prototype` injection

### Changed

- Enabled TypeScript strict mode for improved type safety
- Updated environment variable adapter to return both transformed and raw env data
- Enhanced `Store.get()` and `Store.has()` to support raw env name lookup
- Improved documentation with clearer examples and explanations

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
