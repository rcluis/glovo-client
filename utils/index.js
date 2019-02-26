const getTimeFormated = () => {
    // I have used date because the day first day (1) is monday otherwise I would have use moment to change the starting day
    const date = new Date()
    const time = `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
    return { day: date.getDay(), time }
}
const isStoreOpen = ({ schedule }) => {
    const { day: currentDay, time: currentTime } = getTimeFormated()
    let todaySchedule = schedule.find(({ day }) => currentDay === day)
    if (todaySchedule === undefined) {
        return false
    }
    const { open, close } = todaySchedule
    return open <= currentTime && close >= currentTime
}

const getNextOpeningTime = ({ schedule }) => {
    if (schedule.length === 0){
        return false;
    }
    const { day: currentDay, time: currentTime } = getTimeFormated()

    const findIndex = (schedule) => {
        return schedule.findIndex(({ day }) => day === currentDay)
    }

    let todayScheduleIndex;
    for (let i = 0; i <= 6 - currentDay; i ++) {
        todayScheduleIndex = schedule.findIndex(({ day }) => day === currentDay + i)
        console.log('i: ' + i)
        console.log(todayScheduleIndex)
        if (todayScheduleIndex !== -1) {
            break
        }
    }
    console.log(todayScheduleIndex)
    if (todayScheduleIndex === -1) {
      console.log('aquii')
        return { day: schedule[0].day, time: schedule[0].open }
    }

    const { open } = schedule[todayScheduleIndex]

    if (currentTime <= open) {
        return { day: currentDay, time: open }
    }

    return { day: schedule[todayScheduleIndex].day, time: schedule[todayScheduleIndex].open }
}

export {
    isStoreOpen,
    getTimeFormated,
    getNextOpeningTime
}
