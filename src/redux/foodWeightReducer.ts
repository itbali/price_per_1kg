import {v1} from 'uuid';

export enum ActionName {
    ADD_TO_LIST,
    DELETE_ITEM,
    CLEAR_LIST,
    ADD_NAME,
    ADD_PRICE,
    ADD_WEIGHT,
    CLEAR_INPUT,
    DELETE_UNIT,
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
    foodContainer: [],
    InputName: '',
    InputPrice: 0,
    InputWeight: 0,
    OutputPricePerKG: 'Введите данные',
}

export const foodWeightReducer = (state: FoodWeightType = initialState, action: ActionType): FoodWeightType => {

    let finalPrice = '';
    switch (action.type) {
        case (ActionName.ADD_TO_LIST):
            if (state.InputName.trim().length !== 0 && state.InputWeight !== 0 && state.InputPrice !== 0) {
                return {
                    ...state,
                    foodContainer: [{
                        id: v1(),
                        name: state.InputName,
                        startPrice: state.InputPrice,
                        startWeight: state.InputWeight,
                        finalPrice: state.OutputPricePerKG
                    }, ...state.foodContainer],
                    //обнуляем поля для ввода после добавления товара в список
                    InputName: '',
                    InputPrice: 0,
                    InputWeight: 0,
                    OutputPricePerKG: '0'
                }
            } else {
                return state
            }

        case (ActionName.DELETE_ITEM):
            return {...state, foodContainer: state.foodContainer.filter(el => el.id !== action.id)}
        case (ActionName.CLEAR_LIST):
            //Обнуляю потому что я так решил.
            return {foodContainer: [], InputName: '', InputPrice: 0, InputWeight: 0, OutputPricePerKG: '0'}
        case (ActionName.ADD_NAME):
            return {...state, InputName: action.name}
        case ActionName.ADD_PRICE:
            if (isFinite(action.price)) {
                // Динамически формируем содержимое веса за 1 единицу
                if (action.price === 0) {
                    finalPrice = 'Введите цену'
                } else if (state.InputWeight === 0) {
                    finalPrice = 'Введите вес'
                } else {
                    finalPrice = (1000 / state.InputWeight * action.price).toFixed(2)
                }
                return {
                    ...state,
                    InputPrice: action.price,
                    OutputPricePerKG: finalPrice,
                }
            } else {
                return state
            }
        case ActionName.ADD_WEIGHT:
            finalPrice = '';
            if (isFinite(action.weight)) {
                // Динамически формируем содержимое веса за 1 единицу
                if (action.weight === 0) {
                    finalPrice = 'Введите вес'
                } else if (state.InputPrice === 0) {
                    finalPrice = 'Введите цену'
                } else {
                    finalPrice = (1000 / action.weight * state.InputPrice).toFixed(2)
                }
                return {
                    ...state,
                    InputWeight: action.weight,
                    OutputPricePerKG: finalPrice
                }
            } else {
                return state
            }
        case ActionName.CLEAR_INPUT:
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
    return {type: ActionName.ADD_TO_LIST,} as const
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
    return {type: ActionName.ADD_PRICE, price: +price} as const
}
export const AddWeight = (weight: number) => {
    return {type: ActionName.ADD_WEIGHT, weight: +weight} as const
}
export const ClearInputAC = () => {
    return {type: ActionName.CLEAR_INPUT} as const
}
export const DeleteUnit = () => {
    return {type: ActionName.DELETE_UNIT} as const
}

// TODO сделать сохранение в локал сторадж и в кэш браузера