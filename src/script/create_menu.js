let isLoggedin = false;

const menuLinks = [
  { text: "HOME", href: "/HOME" },
  {
    text: "GAMES",
    href: "#",
    subLinks: [
      { text: "Alchemist's Labyrinth", href: "/games/prologue.html" },
      { text: "Errant Knight Online", href: "/games/ek_online.html" },
    ],
  },
  {
    text: "NEWS",
    href: "#",
    subLinks: [
      { text: "Updates", href: "/news/updates.html" },
      { text: "Releases", href: "/news/release.html" },
      { text: "CS Studio", href: "/news/csstudios.html" },
    ],
  },
  {
    text: "ACCOUNT",
    href: "#",
    subLinks: isLoggedin ? [
      { text: "profile", href:"/account/profile.html"},
      { text: "sign out", href:"/account/signout.html"},
    ] 
    :  
    [    
    { text: "login", href: "/account/login.html" },
    { text: "register", href: "/account/register.html"},
  ],
  },
];

const topMenuEl = document.getElementById("top-menu");
//const subMenuEl = document.getElementById("sub-menu");

//316SBA
const subMenuEl = document.querySelectorAll("nav")[1];

const topMenuLinks = [];

function aLab2() {
  // set height to 100%.
  topMenuEl.style.height = "100%";
  // set background color to value.
  topMenuEl.style.backgroundColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--top-menu-bg");
  // add class
  topMenuEl.setAttribute("class", "flex-around");
}

function rLab3() {
  //set height
  subMenuEl.style.height = "100%";

  //set submenu bg to css stored submenu bg color
  subMenuEl.style.backgroundColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--sub-menu-bg");

  subMenuEl.setAttribute("class", "flex-around");

  //   Set the CSS position property of subMenuEl to the value of absolute.
  subMenuEl.style.position = "absolute";

  // Set the CSS top property of subMenuEl to the value of 0.
  subMenuEl.style.top = 0;
}

function rLab4() {
  // iterate over menuLinks array.
  for (let i = 0; i < menuLinks.length; i++) {
    // created element hyperling element
    const menuLinkEl = document.createElement("a");
    // edit hyperlink text
    menuLinkEl.textContent = menuLinks[i].text;
    // adds hyperling reference to a element
    menuLinkEl.setAttribute("href", menuLinks[i].href);
    // adds the generated a element to menu
    topMenuEl.appendChild(menuLinkEl);
    // stores a cache reference topmenulinks array
    topMenuLinks.push(topMenuEl.childNodes[i]);
  }
}

function rLab5() {
  // Add click event listener to the parent
  topMenuEl.addEventListener("click", function (event) {
    // Prevent default behavior
    event.preventDefault();
    // Check if the clicked element is an <a> element
    if (event.target.tagName === "A") {
      const l_class = event.target.classList;
      const l_active = document.getElementsByClassName("active");
      if (
        event.target.textContent != "HOME" &&
        l_class.length == 0 &&
        l_active.length == 0
      ) {
        deletechildrenEl();

        //populates submenulink
        subMenuEl.style.top = "100%";

        let j;
        let n;
        if (event.target.textContent == "GAMES") {
          j = 1;
          n = 2;
          populatesubmenu(j, n);
        } else if (event.target.textContent == "NEWS") {
          j = 2;
          n = 3;
          populatesubmenu(j, n);
        } else if (event.target.textContent == "ACCOUNT") {
          j = 3;
          n = 2;
          populatesubmenu(j, n);
        }

        //add active class to clicked link
        event.target.setAttribute("class", "active");
      } else if (
        event.target.textContent != "HOME" &&
        l_class.length == 0 &&
        l_active.length > 0
      ) {
        deletechildrenEl();

        let j;
        let n;
        if (event.target.textContent == "GAMES") {
          j = 1;
          n = 3;
          populatesubmenu(j, n);
        } else if (event.target.textContent == "NEWS") {
          j = 2;
          n = 3;
          populatesubmenu(j, n);
        } else if (event.target.textContent == "ACCOUNT") {
          j = 3;
          n = 2;
          populatesubmenu(j, n);
        }
        //remvoe active class from all links
        topMenuLinks.forEach(function (element) {
          element.classList.remove("active");
        });
        // set active
        event.target.setAttribute("class", "active");
      } else {
        //remvoe active class from all links
        topMenuLinks.forEach(function (element) {
          element.classList.remove("active");
        });
        // hide submenu
        subMenuEl.style.top = "0%";
      }
    } else {
      subMenuEl.style.top = "0%";

      deletechildrenEl();

      //remvoe active class from all links
      topMenuLinks.forEach(function (element) {
        element.classList.remove("active");
      });
      // hide submenu
    }
    //debug onclicked link
    console.log("Clicked link content:", event.target.textContent);
  });
}
function populatesubmenu(index, num) {
  for (let i = 0; i < num; i++) {
    // created element hyperling element
    const menuLinkEl = document.createElement("a");
    // edit hyperlink text
    menuLinkEl.textContent = menuLinks[index].subLinks[i].text;
    // adds hyperling reference to a element
    menuLinkEl.setAttribute("href", menuLinks[index].subLinks[i].href);
    // adds the generated a element to menu
    subMenuEl.appendChild(menuLinkEl);
  }
}
function deletechildrenEl() {
  while (subMenuEl.firstChild) {
    subMenuEl.removeChild(subMenuEl.firstChild);
  }
}

aLab2();
rLab3();
rLab4();
rLab5();
