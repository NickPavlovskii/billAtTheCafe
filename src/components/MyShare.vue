<template>
  <div :class="['menu', { active: menuActive }]">
    <button
      type="button"
      :class="['toggle', 'nav-style', { active: menuActive }]"
      aria-label="Поделиться"
      @click="toggleMenu"
    >
      <Icon icon="mdi:share-variant" class="toggle-icon" />
    </button>
    <li style="--i:0; --clr:#1877f2">
      <a href="https://github.com/NickPavlovskii">
        <i class=" pi pi-github icn" style="--clr: gray"></i>
      </a>  
    </li>
       <li style="--i:1; --clr: #c32aa3">
      <a href="https://www.instagram.com/o__niklad__o/?hl=ru">
      <font-awesome-icon icon="fa-brands fa-instagram icn" class="icn" />
      </a>
    </li>  
    <li style="--i:2;--clr:#7289da">
      <a href="https://discordapp.com/users/318683913579134977/ ">
       <font-awesome-icon icon="fa-brands fa-discord " class="icn"/>
      </a>
    </li>
    <li style="--i:3;--clr: #25d366">
      <a href="">
        <font-awesome-icon icon="fa-brands fa-whatsapp"  class="icn"/>
      </a>
    </li>
    <li style="--i:4;--clr:#4e76a8">
      <a href="https://vk.com/o_0niklad0_o">
        <font-awesome-icon icon="fa-brands fa-vk icn"  class="icn"/>
      </a>
    </li>
    <li style="--i:5;--clr:#1877f2">
      <a href="https://t.me/N1klad">
        <font-awesome-icon icon="fa-brands fa-telegram icn" class="icn" />
      </a>
    </li>
    <li style="--i:6;--clr:orange">
      <a href="https://gitlab.com/">
        <font-awesome-icon icon="fa-brands fa-gitlab icn" class="icn" />
      </a>
    </li>

 
  </div>
</template>

<script>
import { Icon } from '@iconify/vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faInstagram, faDiscord, faWhatsapp, faVk, faTelegram, faGitlab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faGithub, faInstagram, faDiscord, faWhatsapp, faVk, faTelegram, faGitlab);

export default {
  components: {
    Icon,
    FontAwesomeIcon
  },
  data() {
    return {
      menuActive: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive;
    }
  }
};
</script>

<style>
.icn {
  color: var(--clr);
}
.menu {
  position: relative;
  display: flex;
  margin: 10px 0 0;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  overflow: visible;
  z-index: 30;
  flex-shrink: 0;
  align-self: flex-end;
}

.toggle.nav-style {
  width: 30px;
  height: 30px;
  min-width: 30px;
  min-height: 30px;
  padding: 0;
  border-radius: 50%;
  background: #f1f1f1;
  border: none;
  color: #333;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.12s;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.toggle.nav-style:hover {
  background: #048bfa;
  color: #fff;
  box-shadow: 0 4px 6px rgba(4, 139, 250, 0.35);
}
.toggle.nav-style:active {
  transform: scale(0.91);
}
.toggle.nav-style .toggle-icon {
  width: 16px;
  height: 16px;
  color: inherit;
}
.toggle.nav-style.active {
  background: #048bfa;
  color: #fff;
  transform: none;
  box-shadow: 0 4px 6px rgba(4, 139, 250, 0.35);
}
.toggle.nav-style.active:hover {
  background: #048bfa;
  color: #fff;
}

.menu li {
  --count: 7;
  --radius: 54px;
  position: absolute;
  left: 50%;
  top: 50%;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 32px;
  height: 32px;
  margin-left: -16px;
  margin-top: -16px;
  transform-origin: center center;
  transform: rotate(calc(360deg / var(--count) * var(--i))) translateY(calc(-1 * var(--radius)));
  scale: 0;
  transition: transform 0.35s ease-out, scale 0.25s ease-out;
  transition-delay: calc(0.03s * var(--i));
}
.menu.active li {
  scale: 1;
}
.menu li a {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #f1f1f1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  color: inherit;
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;
  transform: rotate(calc(-360deg / var(--count) * var(--i)));
}
.menu li a:hover {
  background: #e0e0e0;
  transform: rotate(calc(-360deg / var(--count) * var(--i))) scale(1.1);
}
.menu li a .icn,
.menu li a i {
  width: 18px;
  height: 18px;
  font-size: 18px;
}

.toggle.nav-style {
  position: relative;
  z-index: 2;
}

@media (max-width: 480px) {
  .menu {
    width: 40px;
    height: 40px;
    margin-top: 25px;
  }
  .toggle.nav-style {
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
  }
  .menu li {
    --radius: 50px;
  }
}

</style>

  


