import axios from 'axios'
export default {
  getAllGames () {
    return axios.get('http://starlord.hackerearth.com/gamesext')
      .then(res => {
        return res.data
      })
  }
}
