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
              <a :href="checkUrl(currentEvent.signUpLink)">{{ currentEvent.signUpLink }}</a>
            </p>
            <p>
              <a :href="checkUrl(currentEvent.streamLink)">{{ currentEvent.streamLink }}</a>
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

import NavBar from '@/components/NavBar'
import { checkUrl } from '@/utils/functions'

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
    lobbies() {
      return this.$store.getters.getUpcomingEvents
    }
  },
  mounted() {
    this.onDocumentClick()
  },
  // TODO: remove event listener
  methods: {
    checkUrl,
    onClick(e) {
      this.isEventModalVisible = true
      this.currentEvent = { title: e.event._def.title, ...e.event._def.extendedProps }
    },
    toggleModal() {
      if(this.isEventModalVisible)
        this.isEventModalVisible = false
      else this.isEventModalVisible = true
    },
    onDocumentClick() {
      let _this = this
      document.addEventListener('click', (event) => {
        if (event.target.id == 'modal') {
          _this.isEventModalVisible = false
        }
      });
    }
  },
  components: {
    NavBar,
    FullCalendar
  }
}
</script>

<style>
.fc-col-header-cell-cushion {
  color: rgb(59, 59, 59) !important
}
.fc-daygrid-day-number{
  color: black;
}
.fc .fc-button-primary {
  background-color: rgb(59, 59, 59);
  border: none;
}
.fc .fc-button-primary:disabled {
  background-color: rgba(59, 59, 59, 0.7);
}
</style>

<style scoped>
.calendar-container {
  width: 70%;
  margin: 0 auto;
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