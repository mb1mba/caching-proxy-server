# Caching Proxy Server

## Overview
This project implements a caching proxy server CLI tool built with Deno and Oak. The proxy server forwards requests to an origin server, caches the responses, and serves subsequent identical requests from the cache to improve performance and reduce load on the origin server.
Note: This is a side project and is not intended for production use.
## Features
- Starts a caching proxy server on a specified port.
- Forwards requests to an origin server and caches responses.
- Adds custom headers to indicate cache status:
  - `X-Cache: HIT` for cached responses.
  - `X-Cache: MISS` for origin server responses.
- Provides a CLI option to clear the cache.

## Requirements
- [Deno](https://deno.land/) version 1.30.0 or higher.
- Redis server for caching.

## Installation
1. Install Deno if not already installed:
   ```bash
   curl -fsSL https://deno.land/x/install/install.sh | sh
   ```

2. Clone the repository:
   ```bash
   git clone https://github.com/mb1mba/cache_proxy.git
   cd cache_proxy
   ```

3. Install Redis on your system if not already installed:
   ```bash
   # On Ubuntu/Debian
   sudo apt update
   sudo apt install redis

   # On macOS using Homebrew
   brew install redis
   ```

4. Start the Redis server:
   ```bash
   redis-server
   ```

## Usage
### Start the Proxy Server
To start the caching proxy server, use the following command:
```bash
caching-proxy --port <number> --origin <url>
```

- **`--port`**: Specifies the port on which the proxy server will run.
- **`--origin`**: Specifies the URL of the origin server to forward requests to.

**Example**:
```bash
caching-proxy --port 3000 --origin http://dummyjson.com/products
```
This starts the proxy server on port 3000 and forwards requests to `http://dummyjson.com/products`.

### Clear the Cache
To clear the cache, use the `--clear-cache` option:
```bash
caching-proxy --clear-cache
```
This clears all cached responses and exits the program.

## Development
### Project Structure
```plaintext
src/
├── main.ts                # Entry point of the application.
├── server.ts              # Server initialization logic.
├── router/
│   └── createRouter.ts    # Router setup.
├── middleware/
│   └── cacheMiddleware.ts # Middleware for caching logic.
├── redis/
│   └── client.ts          # Redis client setup.
│   └── empty.ts      # Cache clearing logic.
├── utils/
│   ├── parseArguments.ts  # CLI argument parsing.
└── errors/
    └── handleArgsError.ts # Error handling for invalid arguments.
```

### Running in Development
To run the server in development mode:
```bash
deno run --allow-net src/main.ts --port 3000 --origin http://dummyjson.com/products
```

### Permissions
This project requires the following permissions:
- `--allow-net`: To allow network access for the proxy server and Redis.
- `--allow-env`: To access environment variables.

## Future Improvements
- Implement logging for request and cache activity.
- Implement caching strategy to optimize cache usage (e.g., Least Recently Used (LRU), Least Frequently Used (LFU), time-to-live (TTL) based caching).

---

