# ConfigShip

[![npm version](https://img.shields.io/npm/v/config-ship)](https://www.npmjs.com/package/config-ship)
[![npm downloads](https://img.shields.io/npm/dm/config-ship)](https://www.npmjs.com/package/config-ship)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ConfigShip is a lightweight, package-safe configuration resolver that layers
defaults, root config, environment variables, and runtime overrides.

Designed for apps and npm packages.

## Features

- Layered config resolution
- Nested ENV support via __
- Runtime overrides
- Node js/ts support
- No validation
- No crashes

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

Use double underscores (`__`) for nested keys:

```bash
# .env or environment
APP__DB__HOST=production.db.com
APP__DB__PORT=3306
APP__FEATURE__ENABLED=true
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
