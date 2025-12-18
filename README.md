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

```ts
import { createConfig } from "config-ship"

const config = createConfig({
  defaults: {
    db: { host: "localhost" }
  },
  envPrefix: "APP_",
  rootFile: "app.config.ts"
})

config.get("db.host")
config.set("db.host", "127.0.0.1")
```
