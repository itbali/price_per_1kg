import {v1} from 'uuid';

export enum ActionName {
    ADD_TO_LIST,
    DELETE_ITEM,
    CLEAR_LIST,
}

export type ActionType =
    ReturnType<typeof AddToListAC>
    | ReturnType<typeof DeleteItemAC>
    | ReturnType<typeof ClearListAC>

export type singleFoodType = {
    id: string,
    name: string,
    startWeight: number,
    startPrice: number,
    finalPrice: number,
}
export type foodWeightType = Array<singleFoodType>
export type actionType = void

export const initialState: foodWeightType = [
    {id: v1(), name: 'chees', startPrice: 500, startWeight: 400, finalPrice: 1200}
]

export const foodWeightReducer = (state: foodWeightType = initialState, action: ActionType): foodWeightType => {
    switch (action.type) {
        case (ActionName.ADD_TO_LIST):
            return [...state,
                {
                    id: action.id,
                    name: action.name,
                    startPrice: action.price,
                    startWeight: action.weight,
                    finalPrice: (action.price * (1000 / action.weight))
                }]
        case (ActionName.DELETE_ITEM):
            return state.filter(el => el.id !== action.id)
        case (ActionName.CLEAR_LIST):
            return []
        default :
            return state;
    }
}

export const AddToListAC = (name: string, price: number, weight: number) => {
    return {
        type: ActionName.ADD_TO_LIST,
        id: v1(),
        name,
        price,
        weight,
    } as const
}

export const DeleteItemAC = (id: string) => {
    return {type: ActionName.DELETE_ITEM, id} as const
}

export const ClearListAC = () => {
    return {type: ActionName.CLEAR_LIST} as const
}