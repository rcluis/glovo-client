const isStoreOpen = ({ schedule }) => {
    const today = new Date()
    // I have used date because the day first day (1) is monday otherwise I would have use moment to change the starting day
    const currentDay = today.getDay()
    const currentTime = `${today.getHours()}:${today.getMinutes() < 10 ? '0' : ''}${today.getMinutes()}`
    let todaySchedule = schedule.find(({ day }) => currentDay === day)
    console.log(schedule)
    console.log(today.getDay())
    if (todaySchedule === undefined) {
        return false
    }
    const { open, close } = todaySchedule
    console.log(open <= currentTime && close >= currentTime)
    return open <= currentTime && close >= currentTime
}

export {
    isStoreOpen
}