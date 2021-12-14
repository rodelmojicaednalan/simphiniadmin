<template>
  <div>
    <!-- <div class="navbar-bg"></div> -->
    <nav class="navbar navbar-bg navbar-expand-lg main-navbar">
      <form class="form-inline mr-auto">
        <ul class="navbar-nav mr-3">
          <li>
            <a
              href="javascript:;"
              class="nav-link nav-link-lg"
              @click="miniSidebar"
            >
              <i class="fas fa-bars"></i>
            </a>
          </li>
          <li>
            <a
              href="#"
              data-toggle="search"
              class="nav-link nav-link-lg d-sm-none"
              ><i class="fas fa-search"></i
            ></a>
          </li>
        </ul>
        <div class="search-element">
          <input
            class="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            data-width="250"
          />
          <button class="btn" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </form>
      <ul class="navbar-nav navbar-right">
        <li class="dropdown" v-bind:class="{ show: isNameClick }">
          <a
            href="javascript:;"
            data-toggle="dropdown"
            class="nav-link dropdown-toggle nav-link-lg nav-link-user"
            v-click-outside="hideMenuName"
            v-on:click="isNameClick = !isNameClick"
          >
            <img
              alt="image"
              :src="user.display_photo"
              class="rounded-circle mr-1"
            />
            <div class="d-sm-none d-lg-inline-block">{{ user.name }}</div></a
          >
          <transition name="slide">
            <div
              class="dropdown-menu dropdown-menu-right show"
              v-if="isNameClick"
            >
              <router-link to="/admin/profile" class="dropdown-item has-icon">
                <i class="far fa-user"></i> Profile
              </router-link>
              <a href="#" class="dropdown-item has-icon">
                <i class="fas fa-cog"></i> Settings
              </a>
              <div class="dropdown-divider"></div>
              <a
                href="javascript:;"
                class="dropdown-item has-icon text-danger"
                @click="logout"
              >
                <i class="fas fa-sign-out-alt"></i> Logout
              </a>
            </div>
          </transition>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isNameClick: false,
      user: JSON.parse(localStorage.getItem("authuser")),
      isAvailable: false,
    };
  },
  methods: {
    ...mapActions({
      signOut: "auth/signOut",
    }),
    nameclick() {
      this.isNameClick = !this.isNameClick;
    },
    hideMenuName() {
      this.isNameClick = false;
    },
    miniSidebar() {
      const el = document.body;
      if (el.classList.contains("sidebar-mini")) {
        el.classList.remove("sidebar-mini");
      } else {
        el.classList.add("sidebar-mini");
      }
    },
    logout() {
      this.signOut().then(() => {
        this.$router.go("/");
      });
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style scoped>
.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>