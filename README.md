# ConfigShip

[![npm version](https://img.shields.io/npm/v/config-ship)](https://www.npmjs.com/package/config-ship)
[![npm downloads](https://img.shields.io/npm/dm/config-ship)](https://www.npmjs.com/package/config-ship)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ConfigShip is a lightweight, package-safe configuration resolver that layers
defaults, root config, environment variables, and runtime overrides.

Designed for apps and npm packages.

## Features

- **Layered config resolution** - defaults → file → env → runtime
- **Nested ENV support** - use `__` for nested keys (e.g., `APP_DB__HOST`)
- **Raw env names** - access vars by original name (`APP_NAME`) or transformed (`name`)
- **Auto-parsing** - booleans, numbers, JSON automatically parsed
- **Runtime overrides** - dynamically update config at runtime
- **TypeScript support** - built with strict mode enabled
- **Secure** - protected against prototype pollution
- **Zero dependencies** - lightweight and fast
- **No validation** - simple and flexible
- **No crashes** - graceful fallbacks

## Resolution Order

runtime → env → file → defaults

## Install

```bash
npm install config-ship
```

## Usage

### Basic Example

```ts
import { createConfig } from "config-ship"

const config = createConfig({
  defaults: {
    db: { host: "localhost", port: 5432 }
  },
  envPrefix: "APP_",
  rootFile: "app.config.ts"
})

config.get("db.host") // "localhost"
config.set("db.host", "127.0.0.1")
```

### Environment Variables

Use double underscores (`__`) for nested keys. After the prefix, the first underscore separates the prefix, then `__` creates nested paths:

```bash
# .env or environment
APP_DB__HOST=production.db.com      # becomes db.host
APP_DB__PORT=3306                   # becomes db.port
APP_FEATURE__ENABLED=true           # becomes feature.enabled
```

```ts
const config = createConfig({
  defaults: { db: { host: "localhost" } },
  envPrefix: "APP_",
  envFile: ".env"
})

config.get("db.host") // "production.db.com"
config.get("feature.enabled") // true (auto-parsed)

// You can also use raw env names
config.get("APP_DB__HOST") // "production.db.com"
config.get("APP_FEATURE__ENABLED") // true
```

### Configuration Files

Supports multiple formats:

**JSON** (`app.config.json`):

```json
{
  "db": {
    "host": "staging.db.com"
  }
}
```

**JavaScript** (`app.config.js`):

```js
export default {
  db: {
    host: "staging.db.com"
  }
}
```

**TypeScript** (`app.config.ts`):

```ts
export default {
  db: {
    host: "staging.db.com" as string
  }
}
```

### Runtime Overrides

```ts
const config = createConfig({
  defaults: { db: { host: "localhost" } }
})

// Override at runtime
config.set("db.host", "custom.db.com")
config.get("db.host") // "custom.db.com"
```

### API Reference

- `config.get(path, fallback?)` - Get value at path, with optional fallback
- `config.set(path, value)` - Set value at runtime
- `config.has(path)` - Check if path exists
- `config.all()` - Get entire config object

## Recent Changes (v0.1.2)

- **Raw env names**: Access environment variables using original names (e.g., `APP_NAME`) or transformed names (e.g., `name`)
- **Security**: Fixed prototype pollution vulnerability in deep merge
- **TypeScript**: Enabled strict mode for better type safety
- **Documentation**: Added comprehensive examples and MIT license

## License

MIT - see [LICENSE](LICENSE) file for details
