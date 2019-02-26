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
    const { day: currentDay, time: currentTime } = getTimeFormated()
    const todayScheduleIndex = schedule.findIndex(({ day }) => day === currentDay)
    const { open } = schedule[todayScheduleIndex]

    if (currentTime <= open) {
        return { day: currentDay, time: open }
    }

    return schedule.length - 1 > todayScheduleIndex ?
        { day: schedule[todayScheduleIndex + 1].day, time: schedule[todayScheduleIndex + 1].open } :
        { day: schedule[0].day, time: schedule[0].open }
}
export {
    isStoreOpen,
    getTimeFormated,
    getNextOpeningTime
}
