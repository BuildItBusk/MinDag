class ScheduleApp {
    constructor() {
        this.scheduleData = null;
        this.currentDay = null;
        this.init();
    }

    async init() {
        await this.loadScheduleData();
        this.setCurrentDate();
        this.displaySchedule();
    }

    async loadScheduleData() {
        try {
            const response = await fetch('schedule.json');
            this.scheduleData = await response.json();
        } catch (error) {
            console.error('Error loading schedule data:', error);
            this.scheduleData = { schedule: {} };
        }
    }

    setCurrentDate() {
        const now = new Date();
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        this.currentDay = days[now.getDay()];
        
        const dayDisplay = document.getElementById('currentDay');
        dayDisplay.textContent = this.getDayName(this.currentDay);
        
        const dateDisplay = document.getElementById('currentDate');
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateDisplay.textContent = now.toLocaleDateString('da-DK', options);
    }

    displaySchedule() {
        const scheduleContainer = document.getElementById('schedule');
        const daySchedule = this.scheduleData.schedule[this.currentDay];

        if (!daySchedule || daySchedule.length === 0) {
            scheduleContainer.innerHTML = '<div class="no-classes">Ingen timer i dag</div>';
            return;
        }

        daySchedule.forEach(item => {
            const classElement = this.createClassElement(item);
            scheduleContainer.appendChild(classElement);
        });
    }

    createClassElement(item) {
        const classDiv = document.createElement('div');
        classDiv.className = 'class-item';
        
        // Add break class if it's a break
        if (item.type === 'break') {
            classDiv.classList.add('break');
        }
        
        const status = this.getClassStatus(item);
        if (status) {
            classDiv.classList.add(status);
        }

        const contentDiv = document.createElement('div');
        contentDiv.className = 'class-content';

        const timeDiv = document.createElement('div');
        timeDiv.className = 'class-time';
        timeDiv.textContent = item.time;

        const nameDiv = document.createElement('div');
        nameDiv.className = 'class-name';
        nameDiv.textContent = item.name;

        contentDiv.appendChild(timeDiv);
        contentDiv.appendChild(nameDiv);
        classDiv.appendChild(contentDiv);

        // Add checkmark for completed items (classes and breaks)
        if (status === 'completed') {
            const checkmarkDiv = document.createElement('div');
            checkmarkDiv.className = 'checkmark';
            checkmarkDiv.textContent = '✅';
            classDiv.appendChild(checkmarkDiv);
        }

        // Add arrow for current class
        if (status === 'current') {
            const arrowDiv = document.createElement('div');
            arrowDiv.className = 'current-arrow';
            arrowDiv.textContent = '⬅️';
            classDiv.appendChild(arrowDiv);
        }

        return classDiv;
    }

    getClassStatus(item) {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        
        const [startTime, endTime] = item.time.split('-');
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);
        
        const classStartMinutes = startHour * 60 + startMinute;
        const classEndMinutes = endHour * 60 + endMinute;

        if (currentTime < classStartMinutes) {
            return 'upcoming';
        } else if (currentTime >= classStartMinutes && currentTime <= classEndMinutes) {
            return 'current';
        } else {
            return 'completed';
        }
    }

    getDayName(dayKey) {
        const dayNames = {
            'monday': 'Mandag',
            'tuesday': 'Tirsdag',
            'wednesday': 'Onsdag',
            'thursday': 'Torsdag',
            'friday': 'Fredag',
            'saturday': 'Lørdag',
            'sunday': 'Søndag'
        };
        return dayNames[dayKey] || dayKey;
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ScheduleApp();
}); 