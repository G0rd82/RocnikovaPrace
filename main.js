let calendar = document.querySelector(".calendar")
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
const eventTitleInput = document.getElementById('eventTitleInput');
const deleteEventModal = document.getElementById('deleteEventModal');
const newEventModal = document.getElementById('newEventModal');
const backDrop = document.getElementById('modalBackDrop');
let clicked = null;

const openModal = (date) => {
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay) {
        document.getElementById('eventText').innerText = eventForDay.title;
        deleteEventModal.style.display = 'block';
    } else {
        newEventModal.style.display = 'block';
    }

    backDrop.style.display = 'block';
}

const closeModal = () => {
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;

}
const LeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

const FebDays = (year) => {
    return LeapYear(year) ? 29 : 28
}
const month_names = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec']

let month_picker = document.querySelector("#month-picker")

const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector(".calendar-days")
    calendar_days.innerHTML = ""
    let calendar_header_year = document.querySelector("#year")
    let days_of_month = [31, FebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    let currDate = new Date()

    month_picker.innerHTML = month_names[month]
    calendar_header_year.innerHTML = year
    const first_day = new Date(year, month, 1);

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement("div")
        if (i >= first_day.getDay()) {
            day.classList.add("calendar-day-hover")
            const eventForDay = events.find(e => e.date === first_day);
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                              <span></span>
                              <span></span>
                              <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add("curr-date")
            }

            const eventForDayCheck = events.find(e => e.date === day.innerHTML);
            if (eventForDayCheck !== undefined) {
                day.classList.add('day-mark');
            }


            if (eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.innerText;
                day.appendChild(eventDiv);
            }
            day.addEventListener('click', () => openModal(day.innerHTML));
        }
        calendar_days.appendChild(day)
    }
}

let currDate = new Date()
let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)


let dayClick;
window.onclick = e => {
    if (e.target.tagName === 'DIV') {
        dayClick = e.target;
    }
}


const saveEvent = () => {
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove('error');
        events.push({
            date: clicked,
            title: eventTitleInput.value,
        });

        dayClick.classList.add('day-mark');

        closeModal();
        localStorage.setItem('events', JSON.stringify(events));
    } else {
        eventTitleInput.classList.add('error');
    }
}
const deleteEvent = () => {
    events = events.filter(e => e.date !== clicked);

    dayClick.classList.remove('day-mark');

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}

document.querySelector("#prev-month").onclick = () => {
    --curr_month.value
    if (curr_month.value < 0)
        curr_month.value = 11;
    generateCalendar(curr_month.value, curr_year.value)
};
document.querySelector("#next-month").onclick = () => {
    ++curr_month.value
    if (curr_month.value >= 12)
        curr_month.value = 0;
    generateCalendar(curr_month.value, curr_year.value)
};
document.querySelector("#prev-year").onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}
document.querySelector("#next-year").onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}
let dark_mode_toggle = document.querySelector('.dark-mode-switch')

let isDarkMode = false;
dark_mode_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('light')
    document.querySelector('body').classList.toggle('dark')
    if (isDarkMode) {
        document.getElementById('sun').style.display = 'block';
        document.getElementById('moon').style.display = 'none';
        isDarkMode = false
    } else {
        document.getElementById('sun').style.display = 'none';
        document.getElementById('moon').style.display = 'block';
        isDarkMode = true

    }
}
const initButtons = () => {
    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('closeButton').addEventListener('click', closeModal);
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
}
initButtons();
