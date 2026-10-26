REGINE KRIS S. CADIAO — RESPONSIVE PORTFOLIO
===========================================

HOW TO OPEN
1. Extract the ZIP file.
2. Open index.html in a browser, or open the folder in VS Code and use Live Server.

FILES
- index.html: all page sections and editable content
- style.css: colors, responsive layout, hover states, and animations
- script.js: mobile navigation, scroll reveal, active section, certificate zoom modal
- assets/profile.png: portrait image
- assets/merch-haven.png: project image from your reference
- assets/service-examples.png: project/service preview from your reference
- assets/certificate-placeholder.svg: editable/reusable sample certificate graphic

HOW TO CUSTOMIZE CERTIFICATES
In index.html, find the CERTIFICATES section. Each .certificate-card includes:
1. Image: change the src in <img src="assets/certificate-placeholder.svg">
2. Name: edit the text inside <h3>
3. Introduction: edit the paragraph <p>
4. Issuing organization and year: edit .certificate-meta
To add a certificate, copy an entire <article class="certificate-card ...">...</article> and edit it.
Put your certificate pictures in the assets folder and use paths such as assets/my-certificate.jpg.
Clicking a certificate opens a larger preview.

HOW TO CUSTOMIZE CONTACT DETAILS
In index.html, find the CONTACT section and replace:
- Location: Davao del Norte, Philippines
- Email: your.email@example.com (update both visible email and mailto)
- Contact number: +63 9XX XXX XXXX
- Personal description and career interests
These are examples—replace them with your own details before publishing.

HOW TO ADD SOCIAL LINKS
At the bottom of index.html, find <div class="social-links">.
Replace each href="#" with your profile URL for Facebook, Instagram, LinkedIn, GitHub, Behance, Dribbble, or other platforms. Remove any platforms you do not use.

OTHER EDITS
- Name and role: hero section in index.html
- Education and skills: ABOUT ME section
- Projects: duplicate a <article class="work-row ..."> block in WORKS
- Profile photo: replace assets/profile.png (keep the same filename or update the image src)
- Colors, spacing, animations: style.css
- Mobile menu and animations: script.js

The design supports desktop, tablet, and mobile. Animations respect the user's reduced-motion preference.
