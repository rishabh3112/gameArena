<template>
  <div id="app">
    <mdc-layout-app>
      <mdc-toolbar slot="toolbar" fixed>
        <mdc-toolbar-row>
          <mdc-toolbar-section align-start >
            <mdc-toolbar-menu-icon event="toggle-drawer"></mdc-toolbar-menu-icon>
            <mdc-toolbar-title>Game Arena</mdc-toolbar-title>
          </mdc-toolbar-section>
        </mdc-toolbar-row>
      </mdc-toolbar>
      <mdc-drawer slot="drawer" toggle-on="toggle-drawer">
        <mdc-drawer-list>
            <mdc-drawer-item start-icon="home" to='/'>Home page</mdc-drawer-item>
            <mdc-drawer-item start-icon="person" href="https://rishabh3112.github.io/">About Developer</mdc-drawer-item>
        </mdc-drawer-list>
      </mdc-drawer>
      <main class="content">
        <router-view></router-view>
      </main>
    </mdc-layout-app>

  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
</style>
