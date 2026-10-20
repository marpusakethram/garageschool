# Security

This project is evolving and has no published security support SLA.

Do not put credentials, private data or exploit details in public issues. Use GitHub's private vulnerability reporting option if available for this repository; otherwise contact the maintainer privately through the contact links on the GitHub profile before sharing details.

For a report, include the affected commit, a minimal synthetic reproduction, expected impact and any suggested mitigation. Never include live tokens or real customer records.

Run demos locally with synthetic data. Review authentication, authorization, API-key restrictions, network exposure and data retention before hosting. Environment examples contain placeholders or development defaults, not production credentials.

## Firebase client configuration

The one fingerprint in `.gitleaksignore` refers only to the intentionally public Firebase web configuration. Firebase documents this configuration as public. This exception does not cover service-account keys or other Google Cloud API credentials. Restrict API usage to the required services and enforce authorization in Firebase; the key does not replace access controls.
