<template>
<div id="index">
  <div class="banner">
    <div class="text">
      <mdc-textfield class="search" @click="()=>{pageNumber=0}" v-if="games.length!=0" v-model="searchText" @input="search(searchText)" label="Search awesome games" box leading-icon="search"/>
    </div>
  </div>
  <center>
  <mdc-select @click="()=>{pageNumber=0}" v-if="games.length!=0" v-model="sortText" label="Sort">
    <option value="Score Increasing">Score low to high</option>
    <option value="Score Decreasing">Score high to low</option>
    <option>Lexographically</option>
  </mdc-select>
  <mdc-linear-progress indeterminate v-if="games.length==0"></mdc-linear-progress>
  <mdc-text v-if="games.length==0"> Loading awesome games </mdc-text>
  <div class="card-container">
    <mdc-card v-for="game in gamesOnThisPage" :key="game.id" v-if="game.show">
      <mdc-card-media :src="game.img">
      </mdc-card-media>
      <div class="text">
        <mdc-card-text>
          <mdc-headline>
            <a :href="'/#/game/ga'+game.platform+'@'+game.title">{{game.title}}</a>
            <div class="tooltip">
              <mdc-icon v-if="game.editors_choice=='Y'" class="editors-choice" icon="check"></mdc-icon>
              <span class="tooltiptext">Editor's Choice</span>
            </div>
          </mdc-headline>
        </mdc-card-text>
        <mdc-card-text class="platform">
          <mdc-chip-set>
            <mdc-chip>{{ game.platform }}</mdc-chip>
            <mdc-chip>Score: {{ game.score }}</mdc-chip>
            <mdc-chip>{{game.genre}}</mdc-chip>
          </mdc-chip-set>
        </mdc-card-text>
      </div>
    </mdc-card>
  </div>
  </center>
  <br>
  <br>
  <hr>
  <br>
  <center>
    <div class="pagination" v-if="games.length!=0">
    <mdc-button outlined :disabled="pageNumber <= 0" @click="prevPage">Previous</mdc-button>
    <mdc-text typo='body2' tag="span" adjust-margin>{{pageNumber+1}}/{{pageCount}}</mdc-text>
    <mdc-button outlined :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</mdc-button>
  </div>
  </center>
  <br>
  <br>
  <br>
  <br>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      pageNumber: 0,
      size: 15,
      searchText: '',
      sortText: 'Default',
      gamesCount: 0
    }
  },
  methods: {
    nextPage () {
      this.pageNumber++
    },
    prevPage () {
      this.pageNumber--
    },
    search (s) {
      this.gamesCount = 0
      this.games.map(obj => {
        if (typeof obj.title !== 'string') {
          obj.title = obj.title.toString()
        }
        if (obj.title.toLowerCase().indexOf(s.toLowerCase()) === -1) {
          obj.show = false
        } else {
          obj.show = true
          this.gamesCount++
        }
      })
      var result = this.games.filter(el => {
        return el.show
      })
      return result
    },
    sort (s) {
      let result
      if (s === 'Score Increasing') {
        result = this.games.sort((a, b) => {
          return a.score - b.score
        })
      } else if (s === 'Score Decreasing') {
        result = this.games.sort((a, b) => {
          return b.score - a.score
        })
      } else if (s === 'Lexographically') {
        result = this.games.sort((a, b) => {
          if (a.title < b.title) return -1
          if (a.title > b.title) return 1
          return 0
        })
      } else {
        result = this.games
      }
      return result
    }
  },
  computed: mapState({
    games: (state) => {
      let data = state.data
      data.map(el => {
        el.show = true
      })
      return data
    },
    pageCount () {
      let l = this.games.length
      l = this.gamesCount
      let s = this.size
      return Math.floor(l / s)
    },
    gamesOnThisPage () {
      let start = this.pageNumber * this.size
      let end = start + this.size
      let games = this.sort(this.sortText)
      games = this.search(this.searchText)
      return games.slice(start, end)
    }
  })

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-container{
    margin: 0 auto;
  }
  .banner{
    height: 200px;
  }
  .banner .text {
    position: relative;
    top: 150px;
  }
  .mdc-card{
    width: 280px;
    margin: 10px;
    display: inline-block;
    background-color: #ff8f00;
  }
  .mdc-card:nth-child(odd){
    background-color: #1565c0 !important;
  }
  .mdc-card .text{
    background: #ffffff;
  }
  .mdc-linear-progress{
    width: 200px;
  }
  .search{
    position: relative;
    width: 80%;
    top: -50px;
  }
  a {
    color: black;
    text-decoration: none; /* no underline */
  }
  .editors-choice{
    color: #1b5e20;
    background-color: #8bc34a;
    border-radius: 50%;
    padding: 2px;
  }
  .tooltip {
      position: relative;
      display: inline-block;
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
  .platform {
    margin-top: -10px;
  }
</style>
