<template>
  <div id="game" v-if="getGame!==undefined">
    <div class="banner">
      <div class="text">
        <mdc-display>
          {{ game.title }}
          <div class="tooltip">
              <mdc-icon v-if="game.editors_choice=='Y'" class="editors-choice" icon="check"></mdc-icon>
              <span class="tooltiptext">Editor's Choice</span>
          </div>
          <mdc-fab mini :href="tweetLink">
             <mdc-icon class="fab fa-twitter"></mdc-icon>
          </mdc-fab>
        </mdc-display>
      </div>
    </div>
    <mdc-list class="list">
      <mdc-list-item>Release Year <span class="gameDescription">{{game.release_year}}</span></mdc-list-item>
      <mdc-list-item>Platform <span class="gameDescription">{{game.platform}}</span></mdc-list-item>
      <mdc-list-item>Score <span class="gameDescription">{{game.score}}/10</span></mdc-list-item>
      <mdc-list-item>Genre <span class="gameDescription">{{game.genre}}</span></mdc-list-item>
    </mdc-list>
  </div>
  <div id="game" v-else-if="games.length==0">
    <mdc-linear-progress indeterminate></mdc-linear-progress>
    <center>
      <mdc-headline> Loading <br> <a class="mdc-button" href="/">Go to Homepage</a></mdc-headline>
    </center>
  </div>
  <div id="game" v-else>
    <center>
      <mdc-headline> 404 Not Found <br> <a class="mdc-button" href="/">Go to Homepage</a></mdc-headline>
    </center>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'game',
  data () {
    return {
      game: {},
      tweetLink: ''
    }
  },
  computed: mapState({
    games: state => state.data,
    getGame () {
      var game = this.games.find(obj => {
        return obj.id === this.$route.params.id
      })
      this.game = game
      if (game !== undefined) {
        var baseURL = 'http://localhost:8080'
        var tweet = `https://twitter.com/intent/tweet?text=Check ${game.title}, a ${game.genre} game for ${game.platform} with gameArena score of ${game.score}. Follow at ${baseURL}`
        this.tweetLink = encodeURI(tweet)
      }
      return game
    }
  })
}
</script>

<style scoped>
  .gameDescription{
    background-color: #512da8;
    color: white;
    padding: 2px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 15px;
    margin-left: 10px;
  }
  .mdc-fab{
    background-color: #00838f;
    color: white;
    padding-bottom: 14px;
  }
  .editors-choice{
    color: #1b5e20;
    background-color: #8bc34a;
    border-radius: 50%;
    padding: 2px;
  }
  .list {
    margin-top: 30px;
    color: black;
  }
  .tooltip {
      position: relative;
      display: inline-block;
  }
  .text {
    background-color: #263238;
    padding: 2px;
    padding-left: 20px;
  }
  .tooltip .tooltiptext {
      visibility: hidden;
      width: 120px;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      font-size: 15px;
      /* Position the tooltip */
      position: absolute;
      z-index: 1;
      bottom: 100%;
      left: 50%;
      margin-left: -60px;
  }

  .tooltip:hover .tooltiptext {
      visibility: visible;
  }
</style>
