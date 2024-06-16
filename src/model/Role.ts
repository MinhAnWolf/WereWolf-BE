export interface Role {
    villagerRole: {
        villager: {
            id: number
            name: string
            skill: string
            kick: [number]
            effect: [number]
        },
        seer: {
            id: number
            name: string
            skill: string
            kick: [number]
            effect: [number]
        },
        bodyguard: {
            id: number
            name: string
            skill: string
            kick: [number]
            effect: [number]
        },
        hunter: {
            id: number
            name: string
            skill: string
            kick: [number]
            effect: [number]
        },
        witch: {
            id: number
            name: string
            skill: string
            kick: [number]
            effect: [number]
        },
        littleGirl: {
            id: number
            name: string
            skill: string
            kick: [number]
            effect: [number]
        },
        medium: {
            id: number
            name: string
            skill: string
            kick: [number]
            effect: [number]
        },
        cupid: {
            id: number
            name: string
            skill: string
            kick: [number]
            effect: [number]
        }
    },

    werewolfRole: {
        werewolf: {
            id: number
            name: string
            skill: string
            kick: [number]
            effect: [number]
        },
        wolfCub: {
            id: number
            name: string
            skill: string
            kick: [number]
            effect: [number]
        },
        alphaWolf: {
            id: number
            name: string
            skill: string
            kick: [number]
            effect: [number]
        },
    },

    specialRole: {
        traitor: {
            id: number
            name: string
            skill: string
            kick: [number]
            effect: [number]
        },
        piedPiper: {
            id: number
            name: string
            skill: string
            kick: [number]
            effect: [number]
        },
        mason: {
            id: number
            name: string
            skill: string
            kick: [number]
            effect: [number]
        },
        count: {
            id: number
            name: string
            skill: string
            kick: [number]
            effect: [number]
        },
    }
}