# Chrome Sleep Timer

Currently supports

1. Youtube
2. HBO Max
3. Netflix
4. Hulu
5. Disney+

Click [here](https://www.paypal.com/donate/?business=CTVS7P8FUPRHC&no_recurring=0&currency_code=USD) to support the maintenance and further development of this project.

## For devs

Required:

- Node.js
- pnpm

Run the following to install:

```[bash]
git clone https://github.com/wesleyyuan17/chrome_sleep_timer.git
cd chrome_sleep_timer/app
pnpm install
```

To build:

```[bash]
pnpm run build
```

This will package code from `app/src/` and `app/public/` in an `app/dist/` directory for distribution. This is the directory to be loaded as the chrome extension.
