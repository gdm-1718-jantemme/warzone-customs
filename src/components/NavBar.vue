<template>
  <div class="custom-navbar">
    <div class="margin-container">
      <h2> WARZONE CUSTOMS</h2>
      <div class="links-container">
        <router-link class="nav-item" to="/">Upcoming</router-link>
        <router-link class="nav-item" to="/add">+ Add</router-link>
        <router-link class="nav-item" to="/calendar">Kalender</router-link>
      </div>
    </div>
  </div>
</template>

<style>
h2 {
  color: white;
  margin: 0 !important;
  font-family: 'Oswald', sans-serif;
}
.custom-navbar {
  display: flex;
  width: 100%;
  height: 100px;
  background-color: rgb(59, 59, 59);
  margin-bottom: 20px;
  justify-content: center;
}

.margin-container {
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-item {
  margin-left: 24px;
  color: white;
}

.nav-item:hover {
  color: lightgray;
}

@media only screen and (max-width: 700px) {
  .margin-container {
    width: 90%;
  }

  .margin-container h2{
    text-align: left;
    width: 50%;
  }

  .links-container {
    display: flex;
    flex-direction: column;
  }
}
</style>