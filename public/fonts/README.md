# Local Fonts

The portfolio stores its variable fonts locally to avoid a third-party font request and keep typography available during local development.

## Included Files

- `Inter-VariableFont_opsz,wght.woff2`
- `Inter-Italic-VariableFont_opsz,wght.woff2`
- `JetBrainsMono-VariableFont_wght.woff2`
- `JetBrainsMono-Italic-VariableFont_wght.woff2`

`src/app/globals.css` currently declares the regular Inter variable font for interface text and the regular JetBrains Mono variable font for code. Both use `font-display: swap` and include system-font fallbacks.

Keep font declarations and this inventory synchronized if files are added or removed.
