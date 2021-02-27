<template>
  <div>
    <NavBar/>
    <div class="calendar-container">
       <FullCalendar :options="{...calendarOptions, events: lobbies}" />
    </div>
    <div id="modal" class="event-modal" v-if="isEventModalVisible">
      <div class="event-container">
        <h4>My Game</h4>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { mapState, mapActions } from 'vuex'

import NavBar from '@/components/NavBar'

export default {
  data() {
    return {
      isEventModalVisible: false,
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        selectable: true,
        initialView: 'dayGridMonth',
        eventClick: this.onClick
      }
    }
  },
  computed: {
    ...mapState(['lobbies'])
  },
  mounted: function() {
    this.loadLobbies()
    document.addEventListener('click', function(event) {
      console.log(this.isEventModalVisible)
      if (event.target.id == 'modal') {
        console.log('put to false')
        this.toggleModal()
      }
    });
  },
  methods: {
    ...mapActions(['loadLobbies']),
    onClick: function(e) {
      this.isEventModalVisible = true
      console.log(e.event._def.title)
    },
    toggleModal: function() {
      if(this.isEventModalVisible)
        this.isEventModalVisible = false
      else this.isEventModalVisible = true
    }
  },
  components: {
    NavBar,
    FullCalendar
  }
}
</script>

<style>
.calendar-container {
  width: 70%;
  margin: 0 auto
}

.event-modal {
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
.event-container {
  width: 50%;
  background-color: white;
  padding: 20px;
  color: rgba(0, 0, 0, 0.9);
}
</style>