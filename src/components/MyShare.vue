<template>
  <div class="menu" :class="{ active: menuActive }">
    <div class="toggle" @click="toggleMenu" :class="{ active: menuActive,  }">
      <i class="pi pi-share-alt app-iconn"></i>
    </div>
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
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faInstagram, faDiscord, faWhatsapp, faVk, faTelegram, faGitlab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faGithub, faInstagram, faDiscord, faWhatsapp, faVk, faTelegram, faGitlab);

export default {
  components: {
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
.icn{
  color: var(--clr);
  transform: rotate(calc(360deg/7*var(--i)));
}
.menu {
  position: relative;
  display: flex;
 margin-top: 20px;
 margin-right: 20px;
}

.app-iconn {
  font-size: 15px;
  
}

.toggle {
  position: relative;
  bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: #f1f1f1;
  border-radius: 50%;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
  transition: 1.25s;
  font-size: 2em;
  cursor: pointer;
}
.toggle:hover .app-iconn{
    color: #048bfa;
}
.menu-items {
  /* Add your styles for the menu items */
}

.toggle.active {
  transform: rotate(360deg);
  box-shadow: 0 5px 5px #048bfa, 0 0 0 2px #048bfa, 0 0 0 8px #fff;
}

.menu li{
position: absolute;
left:  -30px;
list-style: none;
transition: 0.5s;
transform: rotate(calc(360deg/7*var(--i)));
transform-origin: 45px;
scale: 0;
transition-delay: calc(0.05s * var(--i));
}
.menu.active li{

  scale: 1;

}
.menu.active .toggle {
  transform: rotate(45deg);
}

.menu li a{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
 
  transform: rotate(calc(360deg/7*var(--i)));




}
 </style>

  


