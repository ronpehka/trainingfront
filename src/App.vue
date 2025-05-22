<template>
  <nav>
    <router-link to="/">Avaleht</router-link> |
    <router-link to="/about">Meist</router-link> |
    <router-link to="/locations">Asukohad</router-link> |
    <router-link to="/training-info">Treeningud</router-link> |
    <router-link to="/login">Logi sisse</router-link>

  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
