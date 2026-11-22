const config = window.AGROMAGIC_CONFIG || {};

const header = document.querySelector("[data-header]");
const footer = document.querySelector("[data-footer]");

if (header) {
  header.innerHTML = `
    <div class="announcement">
      🌱 A little land. A lot of possibility.
      <a href="/get-involved.html">Come grow with us ↗</a>
    </div>

    <div class="site-header">
      <div class="wrap nav">

        <a
          class="brand"
          href="/"
          aria-label="AgroMagic home"
        >
          <img
            src="/img/Agromajic%20.png"
            alt="AgroMagic Logo"
            class="site-logo"
          >
        </a>

        <button
          class="menu-toggle"
          type="button"
          aria-expanded="false"
          aria-controls="nav-links"
        >
          ☰ MENU
        </button>

        <nav
          class="nav-links"
          id="nav-links"
          aria-label="Main navigation"
        >
          <a href="/">Home</a>
          <a href="/about.html">Our Story</a>
          <a href="/farm.html">The Farm</a>
          <a href="/market.html">The Market</a>
          <a href="/workshops.html">Workshops</a>
          <a href="/get-involved.html">Get Involved</a>
          <a href="/donate.html">Donate</a>
          <a href="/festival.html" class="nav-cta">
            AgroMagic Fest ↗
          </a>
        </nav>

      </div>
    </div>
  `;
}

if (footer) {
  footer.innerHTML = `
    <div class="footer">

      <div class="wrap">

        <div class="footer-grid">

          <div>

            <a class="brand" href="/">

              <img
                src="/img/Agromajic%20.png"
                alt="AgroMagic Logo"
                style="height:90px;width:auto;"
              >

            </a>

            <p>
              A place to grow food, build community,
              celebrate creativity, and create
              meaningful experiences together.
            </p>

          </div>

          <div>

            <h3>Explore</h3>

            <div class="footer-links">
              <a href="/about.html">Our Story</a>
              <a href="/farm.html">The Farm</a>
              <a href="/market.html">The Market</a>
              <a href="/workshops.html">Workshops</a>
            </div>

          </div>

          <div>

            <h3>Get Involved</h3>

            <div class="footer-links">
              <a href="/get-involved.html">Volunteer</a>
              <a href="/get-involved.html">Artists & Creators</a>
              <a href="/donate.html">Support AgroMagic</a>
            </div>

          </div>

        </div>

        <div class="footer-bottom">
          <span>
            © ${new Date().getFullYear()} AgroMagic.
            Grow Something Wonderful Together.
          </span>

          <span>
            🌱 Stockbridge, Georgia
          </span>
        </div>

      </div>

    </div>
  `;
}

const menu = document.querySelector(".menu-toggle");

if (menu) {
  menu.addEventListener("click", () => {

    const expanded =
      menu.getAttribute("aria-expanded") === "true";

    menu.setAttribute(
      "aria-expanded",
      String(!expanded)
    );

    const navLinks =
      document.querySelector("#nav-links");

    if (navLinks) {
      navLinks.classList.toggle("open");
    }
  });
}

const form = document.querySelector("#volunteer-form");

if (form) {

  const status =
    document.querySelector("#form-status");

  if (!config.contactEmail) {

    form.querySelector("button").disabled = true;

    if (status) {
      status.textContent =
        "Volunteer signup is coming soon.";
    }

  } else {

    form.querySelector("button").disabled = false;

    if (status) {
      status.textContent =
        "Submitting will open your email app.";
    }

    form.addEventListener("submit", (event) => {

      event.preventDefault();

      const data =
        new FormData(form);

      const body = `
Name: ${data.get("name")}
Email: ${data.get("email")}
Interest: ${data.get("interest")}
Availability: ${data.get("availability")}

${data.get("message")}
`;

      window.location.href =
        `mailto:${encodeURIComponent(config.contactEmail)}?subject=${encodeURIComponent("AgroMagic Volunteer Interest")}&body=${encodeURIComponent(body)}`;

    });

  }

}

const donate =
  document.querySelector("#donation-link");

if (donate && config.donationUrl) {

  try {

    const url =
      new URL(config.donationUrl);

    if (url.protocol === "https:") {

      donate.href = url.href;

      donate.hidden = false;

      const status =
        document.querySelector("#donation-status");

      if (status) {
        status.textContent =
          "You will be redirected to our secure donation page.";
      }

    }

  } catch {

    const status =
      document.querySelector("#donation-status");

    if (status) {
      status.textContent =
        "Donation page is currently unavailable.";
    }

  }

}
