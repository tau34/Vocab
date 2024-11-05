document.getElementById('generateButton').addEventListener('click', generateSchedule);

function generateSchedule() {
    const startWord = 961;
    const totalWords = 2400;
    const weeklyShift = 180; // 毎週の開始単語を180語ずつずらす
    const schedule = [];
    const days = [
        { newWords: [0, 19], previous: [-40, -1], weekBefore: [-180, -161] },
        { newWords: [20, 39], previous: [0, 19], weekBefore: [-160, -141], monthBefore: [[-700, -681]] },
        { newWords: [40, 59], previous: [20, 39], weekBefore: [-140, -121], monthBefore: [[-680, -661]] },
        { newWords: [60, 79], previous: [40, 59], weekBefore: [-120, -101], monthBefore: [[-660, -641]] },
        { newWords: [80, 99], previous: [60, 79], weekBefore: [-100, -81], monthBefore: [[-640, -621]] },
        { newWords: [100, 139], previous: [80, 99], weekBefore: [-80, -41], monthBefore: [[-620, -581], [-560, -541]] },
        { newWords: [140, 179], previous: [100, 139], weekBefore: [-40, -1], monthBefore: [[-600, -561]] }
    ];

    const numberOfWeeks = parseInt(document.getElementById('weeks').value);
    for (let week = 0; week < numberOfWeeks; week++) {
        for (let day = 0; day < days.length; day++) {
            let currentDay = days[day];
            let newWords = currentDay.newWords.map(word => getWordNumber(word + startWord + week * weeklyShift, totalWords)).join('-');
            let previous = currentDay.previous ? currentDay.previous.map(word => getWordNumber(word + startWord + week * weeklyShift, totalWords)).join('-') : '';
            let weekBefore = currentDay.weekBefore ? currentDay.weekBefore.map(word => getWordNumber(word + startWord + week * weeklyShift, totalWords)).join('-') : '';

            // Month before groups separated by commas
            let monthBefore = currentDay.monthBefore ? currentDay.monthBefore.map(range => range.map(word => getWordNumber(word + startWord + week * weeklyShift, totalWords)).join('-')).join(', ') : '';

            let scheduleItem = `<div class="schedule-item"><strong>${getDayDate(week, day)}</strong><br>`;
            scheduleItem += `新規単語: ${newWords}<br>`;
            scheduleItem += `1日前の復習: ${previous}<br>`;
            scheduleItem += `1週間前の復習: ${weekBefore}<br>`;
            if (monthBefore) {
                scheduleItem += `1か月前の復習: ${monthBefore}<br>`;
            }
            scheduleItem += `</div>`;
            schedule.push(scheduleItem);
        }
    }

    document.getElementById('schedule').innerHTML = schedule.join('');
}

function getWordNumber(word, totalWords) {
    // 0以下なら最後の単語に回す
    word = ((word - 1) % totalWords + totalWords) % totalWords + 1;
    return word;
}

function getDayDate(week, day) {
    const baseDate = new Date(2024, 10, 11); // 11月11日
    const currentDate = new Date(baseDate);
    currentDate.setDate(baseDate.getDate() + week * 7 + day);
    return `${currentDate.getMonth() + 1}月 ${currentDate.getDate()}日`;
}
