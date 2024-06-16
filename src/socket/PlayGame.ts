import { Room } from "../model/Room";

export function playGame(room: Room, stage: string) {
    let countDay = 0;
    switch (stage) {
        case "start":
            room.user.forEach((item) => {
                let randomRole = Math.floor(Math.random() * (49 - 0 + 1)) + 0;
                // check slot để random role phù hợp
                // if () {
                    
                // }
                // get data role
                // item.role
                // item.status = true;
            })
            return room;
        case "morning":
            // cộng nữa ngày
            countDay += 0.5;
            return;
        case "night":
            // cộng nữa ngày
            countDay += 0.5;
            return;
        default:
            break;
    }
}