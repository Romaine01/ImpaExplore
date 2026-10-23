# Implementation decisions and limitations

- Separate Vite/React and Express apps, each with an independent package manifest and environment file.
- MongoDB is authoritative for users, published listings, applications, and bookings. No sample listings are seeded.
- Sessions use `connect-mongo` and HttpOnly cookies. Origin checking provides an initial CSRF defense for browser writes; a dedicated CSRF token and proxy/cookie deployment review are still needed.
- Public DTOs use selected fields. Private application records are only returned to owner and admin.
- The PWA precaches static assets and an offline page. It does not cache API responses. All account and booking actions require live API acknowledgement.
- Booking confirmation allows one confirmed booking per guide per Manila calendar day, enforced by a MongoDB unique partial index. This conservative policy avoids concurrent double confirmation but does not model multi-day tours. Existing bookings created before `serviceDay` was added need a migration before deployment.
- Approval currently publishes the guide immediately. Production needs document verification policy, protected evidence storage, and a separate publish decision.
- The service starts with an empty database. No real operating data or privileged credentials are invented.
