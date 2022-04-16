<<<<<<<<< Temporary merge branch 1
let calendar = document.querySelector('.calendar')
const month_names = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {
=========
let calendar = document.querySelector(".calendar")
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
const eventTitleInput = document.getElementById('eventTitleInput');
const deleteEventModal = document.getElementById('deleteEventModal');
const newEventModal = document.getElementById('newEventModal');
const backDrop = document.getElementById('modalBackDrop');
let clicked = null;

openModal =(date)  =>{
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay) {
        document.getElementById('eventText').innerText = eventForDay.title;
        deleteEventModal.style.display = 'block';
    } else {
        newEventModal.style.display = 'block';
    }
>>>>>>>>> Temporary merge branch 2

    backDrop.style.display = 'block';
}

const closeModal = () =>{
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;
}
isLeapYear = (year) =>{
    return (year % 4===0 && year % 100 !== 0 && year % 400 !==0) || (year % 100 === 0 && year % 400 ===0)
}

<<<<<<<<< Temporary merge branch 1
    calendar_days.innerHTML = ''
=========
getFebDays = (year) =>{
    return isLeapYear(year) ? 29 : 29
}
const month_names = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec']
>>>>>>>>> Temporary merge branch 2

let month_picker = document.querySelector("#month-picker")

<<<<<<<<< Temporary merge branch 1
    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year
=========
const generateCalendar = (month, year) =>{
    let calendar_days = document.querySelector(".calendar-days")
    calendar_days.innerHTML= ""
    let calendar_header_year = document.querySelector("#year")
    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
>>>>>>>>> Temporary merge branch 2

    let currDate =new Date ()

<<<<<<<<< Temporary merge branch 1
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
=========
    month_picker.innerHTML = month_names[month]
    calendar_header_year.innerHTML = year
    const first_day = new Date(year, month, 1);

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++){
        let day = document.createElement("div")
        if(i >= first_day.getDay()){
            day.classList.add("calendar-day-hover")
            const eventForDay = events.find(e => e.date === first_day);
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                              <span></span>
                              <span></span>
                              <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()){
                day.classList.add("curr-date")
            }
            if (eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                day.appendChild(eventDiv);
>>>>>>>>> Temporary merge branch 2
            }
        }

        calendar_days.appendChild(day)
        day.addEventListener('click', () => openModal(first_day));
    }
}

let currDate = new Date()
let curr_month = {value: currDate.getMonth()}
let curr_year= {value: currDate.getFullYear()}

<<<<<<<<< Temporary merge branch 1
let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')


}
document.querySelector('#prev-month').onclick = () => {
    if (this.curr_month == 0){
        this.curr_month = 11;
    }else {
        this.curr_month = this.curr_month-1;
=========
const saveEvent = () => {
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove('error');

        events.push({
            date: clicked,
            title: eventTitleInput.value,
        });
        closeModal();
        localStorage.setItem('events', JSON.stringify(events));
    } else {
        eventTitleInput.classList.add('error');
>>>>>>>>> Temporary merge branch 2
    }
}
const deleteEvent =() =>{
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}

document.querySelector("#prev-month").onclick = () => {
    --curr_month.value
    if(curr_month.value<0)
        curr_month.value=11;
    generateCalendar(curr_month.value, curr_year.value)
};
document.querySelector("#next-month").onclick = () => {
    ++curr_month.value
    if(curr_month.value>=12)
        curr_month.value=0;
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

dark_mode_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('light')
    document.querySelector('body').classList.toggle('dark')
<<<<<<<<< Temporary merge branch 1
}
=========
}
const initButtons = () => {
    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('closeButton').addEventListener('click', closeModal);
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
}
initButtons();
>>>>>>>>> Temporary merge branch 2
