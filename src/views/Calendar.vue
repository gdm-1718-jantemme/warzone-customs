<template>
  <div style="width: 100%; height: 100vh;">
    <NavBar/>
    <div class="calendar-container">
       <FullCalendar :options="{...calendarOptions, events: lobbies}" />
    </div>
    <div id="modal" class="event-modal" v-if="isEventModalVisible">
      <div class="event-container">
        <div class="event-header">
          <div class="close-button"/>
          <h4 class="event-title">{{ currentEvent.title }}</h4>
          <div class="close-button" @click="toggleModal()">X</div>
        </div>
        <div class="info-container">
          <div>
            <p>Organiser:</p>
            <p>Start:</p>
            <p>Sign Up:</p>
            <p>Stream:</p>
          </div>
          <div>
            <p>{{ currentEvent.name }}</p>
            <p>{{ currentEvent.time }}</p>
            <p>
              <a :href="currentEvent.signUpLink">{{ currentEvent.signUpLink }}</a>
            </p>
            <p>
              <a :href="currentEvent.streamLink">{{ currentEvent.streamLink }}</a>
            </p>
          </div>
        </div>
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
      currentEvent: {
        title: '',
        name: '',
        signUpLink: '',
        streamLink: '',
        time: ''

      },
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        selectable: true,
        initialView: 'dayGridMonth',
        eventClick: this.onClick,
        eventColor: 'rgb(59, 59, 59)',
        height: 600
      }
    }
  },
  computed: {
    ...mapState(['lobbies'])
  },
  mounted: function() {
    this.loadLobbies()
  },
  methods: {
    ...mapActions(['loadLobbies']),
    onClick: function(e) {
      this.isEventModalVisible = true
      console.log(e.event._def.extendedProps)
      this.currentEvent.title = e.event._def.title
      this.currentEvent.name = e.event._def.extendedProps.name
      this.currentEvent.signUpLink = e.event._def.extendedProps.signUpLink
      this.currentEvent.streamLink = e.event._def.extendedProps.streamLink
      this.currentEvent.time = e.event._def.extendedProps.time
    },
    toggleModal: function() {
      if(this.isEventModalVisible)
        this.isEventModalVisible = false
      else this.isEventModalVisible = true
    },
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
  margin: 0 auto;
  background-color: darkgray;
  padding: 10px;
}
.event-modal {
  position: fixed;
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
  color: rgba(0, 0, 0, 0.9);
  justify-content: center;
}
.event-header {
  background-color: rgb(59, 59, 59);
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.event-title {
  color: white;
  margin: 0;
}
.close-button {
  color: white;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.info-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding: 0 20px;
}
.info-container div:first-child {
  text-align: left;
  width: 25%;
  margin-right: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.info-container div:last-child {
  text-align: left;
  width: 70%;
  text-overflow: ellipsis;
  overflow: hidden;
}

@media only screen and (max-width: 700px) {
  .calendar-container {
    width: 95%;
    min-height: 100%;
  }
  .event-container {
    width: 90%;
  }
  .info-container {
    display: flex;
    justify-content: flex-start;
  }
}
</style>