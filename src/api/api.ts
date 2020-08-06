//npx ts-node src/api/api.ts for start
export interface Parent {
    child: Child
}

interface Child {
    value: string
}

const type = <T>(arg: keyof T) => arg


console.log(type<Parent>("child"))
