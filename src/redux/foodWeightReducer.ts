import {v1} from 'uuid';

export enum ActionName {
    ADD_TO_LIST,
    DELETE_ITEM,
    CLEAR_LIST,
    ADD_NAME,
    ADD_PRICE,
    ADD_WEIGHT,
    CLEAR_INPUT
}

export type ActionType =
    ReturnType<typeof AddToListAC>
    | ReturnType<typeof DeleteItemAC>
    | ReturnType<typeof ClearListAC>
    | ReturnType<typeof AddName>
    | ReturnType<typeof AddPrice>
    | ReturnType<typeof AddWeight>
    | ReturnType<typeof ClearInputAC>

export type SingleFoodType = {
    id: string,
    name: string,
    startWeight: number,
    startPrice: number,
    finalPrice: string,
}
export type FoodWeightType = {
    foodContainer: Array<SingleFoodType>,
    InputName: string,
    InputPrice: number,
    InputWeight: number,
    OutputPricePerKG: string,
}

export const initialState: FoodWeightType = {
    foodContainer: [
        {id: v1(), name: 'СЫР', startPrice: 500, startWeight: 400, finalPrice: '1200'}
    ],
    InputName: '',
    InputPrice: 0,
    InputWeight: 0,
    OutputPricePerKG: 'Введите цену и вес',
}

export const foodWeightReducer = (state: FoodWeightType = initialState, action: ActionType): FoodWeightType => {

    let finalPrice = '';
    switch (action.type) {
        case (ActionName.ADD_TO_LIST):
            return {
                ...state,
                foodContainer: [{
                    id: v1(),
                    name: state.InputName,
                    startPrice: state.InputPrice,
                    startWeight: state.InputWeight,
                    finalPrice: state.OutputPricePerKG
                }, ...state.foodContainer]
            }
        case (ActionName.DELETE_ITEM):
            return {...state, foodContainer: state.foodContainer.filter(el => el.id !== action.id)}
        case (ActionName.CLEAR_LIST):
            //Обнуляю потому что я так решил.
            return {foodContainer: [], InputName: '', InputPrice: 0, InputWeight: 0, OutputPricePerKG: '0'}
        case (ActionName.ADD_NAME):
            return {...state, InputName: action.name}
        case ActionName.ADD_PRICE:
            if (action.price === 0) {
                finalPrice = 'Введена некорректная цена'
            } else if (state.InputWeight === 0) {
                finalPrice = 'Введен нулевой вес'
            } else {
                finalPrice = (1000 / state.InputWeight * action.price).toFixed(2)
            }
            return {
                ...state,
                InputPrice: action.price,
                OutputPricePerKG: finalPrice
            }
        case ActionName.ADD_WEIGHT:
            finalPrice = '';
            if(action.weight === 0) {finalPrice ='Введен нулевой вес'}
            else if (state.InputPrice===0) {finalPrice = 'Введена некорректная цена'}
            else
            {
                finalPrice = (1000 / action.weight * state.InputPrice).toFixed(2)
            }
            return {
                ...state,
                InputWeight: action.weight,
                OutputPricePerKG: finalPrice
            }
        case
        ActionName.CLEAR_INPUT
        :
            return {
                ...state,
                InputName: '',
                InputWeight: 0,
                InputPrice: 0
            }
        default :
            return state;
    }
}

export const AddToListAC = () => {
    return {
        type: ActionName.ADD_TO_LIST,
    } as const
}

export const DeleteItemAC = (id: string) => {
    return {type: ActionName.DELETE_ITEM, id} as const
}

export const ClearListAC = () => {
    return {type: ActionName.CLEAR_LIST} as const
}

export const AddName = (name: string) => {
    return {type: ActionName.ADD_NAME, name} as const
}

export const AddPrice = (price: number) => {
    return {type: ActionName.ADD_PRICE, price} as const
}

export const AddWeight = (weight: number) => {
    return {type: ActionName.ADD_WEIGHT, weight} as const
}
export const ClearInputAC = () => {
    return {type: ActionName.CLEAR_INPUT} as const
}