# CookieCloud Firefox Privacy Notice

_Last updated: July 23, 2026_

CookieCloud is a browser extension that synchronizes browser cookies and, when enabled by the user, selected website local-storage data with a server chosen and configured by the user.

## Data the extension accesses

To provide its synchronization functions, the extension may access:

- Browser cookies, including cookie names, values, domains, paths, expiration information, and security attributes.
- Website domains and URLs associated with synchronized cookies.
- Local-storage values for website domains explicitly matched by the user's synchronization settings.
- Extension settings stored locally in the browser, including the configured server address, synchronization identifier, synchronization options, and schedule.

Cookies and local-storage values may contain authentication tokens or other highly sensitive account information.

## How data is used and transmitted

The extension uses this data only to perform user-requested cookie and local-storage synchronization.

Before upload, synchronized cookie and local-storage data is encrypted locally using the identifier and password configured by the user. The encrypted payload is then sent to the CookieCloud server address selected by the user. Downloaded payloads are decrypted locally in the browser before being restored.

The extension does not intentionally include advertising, analytics, telemetry, or tracking services.

## Server operators and third parties

The maintainer of this Firefox fork does not receive synchronized data unless the user explicitly configures a server operated by that maintainer.

Users may configure a self-hosted server, an official test server, or another third-party server. The chosen server operator may receive:

- The encrypted synchronization payload.
- The synchronization identifier.
- Connection metadata normally visible to a web server, such as IP address, request time, and user-agent information.

Data retention and server-side logging are controlled by the selected server operator. Users should prefer a trusted self-hosted server over public test or third-party services.

## Passwords and encryption

The synchronization password is used locally to derive the encryption key. Users should choose a long, unique password and protect both the password and synchronization identifier.

Encryption reduces exposure of the synchronized content, but it does not eliminate all risk. A weak password, compromised browser, malicious server, or unauthorized access to the user's settings may expose account sessions.

## Data sharing and sale

The extension does not sell user data. It does not intentionally share synchronized content with the extension maintainer, advertisers, data brokers, or analytics providers.

Data is transmitted only to the server address selected by the user as necessary to provide synchronization.

## Data control and deletion

Users can stop transmission at any time by disabling synchronization, clearing the extension configuration, uninstalling the extension, or changing the configured server.

Deleting data already stored on a server depends on the server implementation and operator. Users running their own server can remove the stored server data directly. Users of a third-party server should contact that server operator or stop using that service.

## Browser permissions

CookieCloud requests broad browser permissions because its core function requires it to read and restore cookies across websites and, when enabled, access matching website local-storage values. These permissions should be treated as highly sensitive.

## Changes to this notice

Material changes to this notice will be published in this repository with an updated revision date.

## Contact

Questions or security concerns can be submitted through the issue tracker for this repository:

`https://github.com/NeoHeee/CookieCloud/issues`
