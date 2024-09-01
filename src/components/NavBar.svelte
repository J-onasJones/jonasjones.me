<script>
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { recordRequest } from './analytics';

  // Function to handle navigation events
  function handleNavigation() {
    recordRequest();
  }

  // Call the analytics function on initial page load and after each navigation
  onMount(() => {
    handleNavigation();
    afterNavigate(() => {
      handleNavigation();
    });
  });

  let showMenu = false;

  function toggleMenu() {
    showMenu = !showMenu;
  }

  import TooSmallDimsOverlay from "./TooSmallDimsOverlay.svelte";

  let navLinks = [
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: "Docs", url: "https://docs.jonasjones.dev" },
    { name: "Blog", url: "https://blog.jonasjones.dev" },
    // just removed this cause it bothered me
    //{ name: 'For The Based™', url: '/based'},
    //{ name: 'Status', url: '/status'},
    { name: "About", url: "/about" },
  ];

  // @ts-ignore
  let miscLinks = [{ name: "For The Based&trade;", url: "/based" }];
  const fetch_url =
    "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Jonas_Jones&api_key=57c0ca64285c7ca676bb8c2acf320f41&format=json&limit=1";

  /**
   * @param {string} str
   */
  function truncateString(str) {
    const max_length = 27;
    if (str.length > max_length) {
      return str.slice(0, max_length) + "...";
    } else {
      return str;
    }
  }

  async function fetchLastFmData() {
    try {
      let response = await fetch(fetch_url);
      let data = await response.json();
      let album_cover = data.recenttracks.track[0].image[1]["#text"];
      let song_title = truncateString(data.recenttracks.track[0].name);
      //let song_title = truncateString("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWw");
      let artist = truncateString(data.recenttracks.track[0].artist["#text"]);

      try {
        // @ts-ignore
        document.getElementById("lastfm_title").innerHTML = song_title;
        // @ts-ignore
        document.getElementById("lastfm_artist").innerHTML = artist;
        // @ts-ignore
        document.getElementById(
          "lastfm_logo"
        ).style.backgroundImage = `url(${album_cover})`;
      } catch (error) {}

      try {
        let is_playing = data.recenttracks.track[0]["@attr"].nowplaying;
        if (is_playing == "true") {
          // @ts-ignore
          document.getElementById("lastfm_logo_overlay").src = "/equalizer.gif";
        } else {
          // @ts-ignore
          document.getElementById("lastfm_logo_overlay").src =
            "/pause-icon-256.png";
        }
      } catch (error) {
        try {
          // @ts-ignore
          document.getElementById("lastfm_logo_overlay").src =
            "/pause-icon-256.png";
        } catch (error) {}
      }
    } catch (error) {}
  }
  fetchLastFmData();
  setInterval(fetchLastFmData, 15000);
</script>

<div class="navbar">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="hamburger-menu {showMenu ? 'open' : ''}" on:click={toggleMenu}>
    <div class="hamburger-line line-1" />
    <div class="hamburger-line line-2" />
    <div class="hamburger-line line-3" />
  </div>
  <div class="logo">
    <a href="/">
      <img src="/icon_80x80.webp" alt="Logo" class="logo" />
    </a>
  </div>
  <div class="nav-links">
    <nav>
      <ul>
        {#each navLinks as link}
          <li><a href={link.url}>{link.name}</a></li>
        {/each}
      </ul>
    </nav>
  </div>
  <div class="lastfm">
    <a href="https://fm.jonasjones.dev">
      <span class="link" />
    </a>
    <div class="lastfmlogoclass" id="lastfm_logo">
      <img src="" alt=" " class="lastfmlogooverlay" id="lastfm_logo_overlay" />
    </div>

    <div class="lastfm-text">
      <p id="lastfm_title" />
      <p id="lastfm_artist" />
    </div>
  </div>
  <div class="navigation-menu {showMenu ? 'show' : ''}">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="hamburger-menu close-button {showMenu ? 'open' : ''}"
      on:click={toggleMenu}
    >
      <div class="hamburger-line line-1" />
      <div class="hamburger-line line-2" />
      <div class="hamburger-line line-3" />
    </div>
    <ul class="links">
      {#each navLinks as link}
        <li><a href={link.url} on:click={toggleMenu}>{link.name}</a></li>
      {/each}
    </ul>
  </div>
</div>
<div class="unsupported">
  <TooSmallDimsOverlay />
</div>

<style>
  .hamburger-menu {
    position: relative;
    width: 30px;
    height: 21.5px;
    cursor: pointer;
    display: none;
    margin: 16px;
  }

  .hamburger-line {
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: var(--header-font-color);
    border-radius: 4px;
    transition: transform 0.3s, opacity 0.3s;
  }

  .hamburger-line:nth-child(2) {
    top: 50%;
    transform: translateY(-50%);
  }

  .hamburger-line:nth-child(3) {
    bottom: 0;
  }

  .hamburger-menu.open .line-1 {
    transform: rotate(-45deg) translate(-6px, 6px);
  }

  .hamburger-menu.open .line-2 {
    opacity: 0;
  }

  .hamburger-menu.open .line-3 {
    transform: rotate(45deg) translate(-6px, -6px);
  }

  .navigation-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--nav-menu-background-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  }

  .navigation-menu.show {
    opacity: 1;
    pointer-events: auto;
  }

  .close-button {
    position: absolute;
    top: 1px;
    left: 1px;
    font-size: 24px;
    color: var(--header-font-color);
    cursor: pointer;
  }

  .links {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .links li {
    margin: 10px 0;
  }

  .links a {
    color: var(--header-font-color);
    text-decoration: none;
    font-size: 18px;
  }

  .navbar {
    background-color: var(--header-background-color);
    padding: 10px;
    padding-top: 0;
    padding-bottom: 0;
    text-align: center;
    width: 100%;
    height: 58px;
    display: flex;
    position: fixed;
    top: 0;
    z-index: 1;
  }

  .logo {
    height: 45px;
    border-radius: 10px;
    margin-top: 3.5px;
  }

  .nav-links {
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }

  .nav-links {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  nav {
    padding: 10px;
    justify-content: center;
    width: 100%;
    display: table;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: inline;
    margin-right: 10px;
  }

  a {
    text-decoration: none;
    color: var(--header-font-color);
    padding: 5px;
    font-size: 23px;
  }

  a:hover {
    color: var(--header-font-color-hover);
  }

  .lastfm {
    padding: 3px;
    padding-right: 10px;
    padding-left: 0;
    margin: 0;
    justify-content: right;
    justify-self: right;
    align-items: right;
    float: right;
    display: flex;
    position: relative;
    right: 3px;
    top: 3.5px;
    border-radius: 5px;
    max-width: 300px;
    height: 43px;
    overflow: hidden;
  }
  .lastfm:hover {
    background-color: var(--header-background-color-hover);
  }
  .lastfm img {
    width: 30px;
    height: 30px;
    border-radius: 10%;
    margin-right: 10px;
  }
  .lastfm #lastfm_logo {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10%;
    align-items: center;
  }
  .lastfm #lastfm_artist {
    font-size: 13px;
    text-align: left;
    padding: 0;
    margin: 0;
    display: flex;
  }
  .lastfm #lastfm_title {
    font-size: 19px;
    text-align: left;
    padding: 0;
    margin: 0;
    display: flex;
  }
  .lastfm #lastfm_logo_overlay {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    opacity: 0.5;
    align-self: center;
  }
  .lastfm-text {
    display: none;
    transition: width 0.3s ease-out;
  }

  .lastfm:hover .lastfm-text {
    display:block
  }

  .link {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .unsupported {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
  }

  @media only screen and (max-width: 900px) and (min-width: 650px) {
    .lastfm {
      width: 50px;
    }
    .navigation-menu {
      display: none;
    }
  }

  @media only screen and (max-width: 650px) and (min-width: 375px) {
    .lastfm-text {
      display: block;
    }
    .nav-links {
      display: none;
    }
    .lastfm #lastfm_title,
    .lastfm #lastfm_artist {
      display: flex;
    }
    .hamburger-menu {
      display: block;
    }
    .logo {
      display: none;
    }
  }

  @media only screen and (max-width: 375px) and (min-width: 300px) {
    .lastfm {
      width: 50px;
    }
    .nav-links {
      display: none;
    }
    .hamburger-menu {
      display: block;
    }
    .logo {
      display: none;
    }
  }

  @media only screen and (max-width: 300px) and (min-width: 0px) {
    .lastfm {
      width: 50px;
    }
    .nav-links {
      display: none;
    }
    .hamburger-menu {
      display: block;
    }
    .logo {
      display: none;
    }
  }
</style>
