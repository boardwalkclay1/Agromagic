const config = window.AGROMAGIC_CONFIG || {};
const header = document.querySelector("[data-header]");
const footer = document.querySelector("[data-footer]");

header.innerHTML = `<div class="announcement">A little land. A lot of possibility. <a href="get-involved.html">Come grow with us ↗</a></div>
<div class="site-header"><div class="wrap nav">
  <a class="brand" href="index.html" aria-label="AgroMagic home"><span class="brand-mark" aria-hidden="true">✳</span><span class="brand-name">agromagic<small>Stockbridge, Georgia</small></span></a>
  <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-links">Menu ☰</button>
  <nav class="nav-links" id="nav-links" aria-label="Main navigation">
    <a href="about.html">Our story</a><a href="farm.html">The farm</a><a href="workshops.html">Workshops</a><a href="market.html">The market</a><a href="get-involved.html">Get involved</a><a class="nav-cta" href="donate.html">Support the vision ↗</a>
  </nav>
</div></div>`;

footer.innerHTML = `<div class="footer"><div class="wrap">
  <div class="footer-grid"><div><a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">✳</span><span class="brand-name">agromagic<small>Stockbridge, Georgia</small></span></a><p>A place to grow good things, make meaningful connections, and imagine a more sustainable future together.</p></div>
  <div><h3>Explore</h3><div class="footer-links"><a href="about.html">Our story</a><a href="farm.html">The farm</a><a href="workshops.html">Workshops</a><a href="market.html">The market</a></div></div>
  <div><h3>Get involved</h3><div class="footer-links"><a href="get-involved.html">Volunteer</a><a href="get-involved.html#creators">Creators &amp; artists</a><a href="donate.html">Give support</a></div></div></div>
  <div class="footer-bottom"><span>© ${new Date().getFullYear()} AgroMagic. Made for growing together.</span><span>Rooted in Stockbridge, Georgia ✳</span></div>
</div></div>`;

const menu = document.querySelector(".menu-toggle");
menu.addEventListener("click", () => {
  const expanded = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!expanded));
  document.querySelector("#nav-links").classList.toggle("open", !expanded);
});

const form = document.querySelector("#volunteer-form");
if (form) {
  const status = document.querySelector("#form-status");
  if (!config.contactEmail) {
    form.querySelector("button").disabled = true;
    status.textContent = "Signups are not open yet. We’re setting up a contact address; please check back soon.";
  } else {
    form.querySelector("button").disabled = false;
    status.textContent = "This opens an email draft in your email app. Your signup is sent only when you send that email.";
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nInterest: ${data.get("interest")}\nAvailability: ${data.get("availability")}\n\n${data.get("message")}`;
      window.location.href = `mailto:${encodeURIComponent(config.contactEmail)}?subject=${encodeURIComponent("I'd like to get involved with AgroMagic")}&body=${encodeURIComponent(body)}`;
    });
  }
}

const donate = document.querySelector("#donation-link");
if (donate && config.donationUrl) {
  try {
    const url = new URL(config.donationUrl);
    if (url.protocol === "https:") {
      donate.href = url.href;
      donate.hidden = false;
      document.querySelector("#donation-status").textContent = "You’ll continue to our secure giving page to complete your contribution.";
    }
  } catch {
    document.querySelector("#donation-status").textContent = "The giving link is not configured correctly yet. Please check back soon.";
  }
}
