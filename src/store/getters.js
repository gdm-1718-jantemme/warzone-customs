import { filterByDate } from "@/utils/functions"

export default {
  getUpcomingEvents: state => {
    let filteredLobbies = state.lobbies.filter(filterByDate)
    return filteredLobbies.sort(function(a,b){
      if (a.date === b.date) return a.time.localeCompare(b.time);
      else return  new Date(a.date) - new Date(b.date);
    })
  }
}