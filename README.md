# Sync it | سينك إت

Website for **Sync it**, an alternative entertainment cafe in Gosaibi Village, Al Khobar.
Bilingual (English / Arabic, right-to-left), no build step: plain HTML, CSS and JavaScript.

## Pages
- `index.html` Home (the bar, live open status, countdowns)
- `menu.html` Menu
- `music-gathering.html` Tuesday Music Gathering
- `musical-events.html` Artist nights, with ticket buttons
- `chess.html` Play the Sync it family, and the Wednesday tournament
- `girls-only.html` Mini Market, Fancy Nancy, dress-up game (pink "Girls mode")
- `thrift.html` Thrift rail and mystery bags
- `guidelines.html` House rules and FAQ

## Put it online with GitHub Pages
1. Repository **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Save. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

## Later: a real domain (for example syncit.sa)
Register the domain, add it under **Settings → Pages → Custom domain**, and add the DNS records GitHub shows.

## Things still to fill in
- Thrift prices (none are shown yet).
- Confirm the event dates in `js/events.js` and the countdown dates in `js/home.js`.
- Arabic text is machine-translated and should be checked by a native reader.
- Higher-resolution thrift photos and a larger logo file would look sharper.
