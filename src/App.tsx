import React, {ChangeEvent,} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {Accordion, AccordionDetails, AccordionSummary, Button, Grid, Paper, TextField, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {RootStoreType, store} from "./redux/redux";
import {AddName, AddPrice, AddToListAC, AddWeight, ClearListAC, SingleFoodType} from "./redux/foodWeightReducer";

function App() {
    const foodList = useSelector<RootStoreType, Array<SingleFoodType>>(store => store.foodList.foodContainer)
    const inputName = useSelector<RootStoreType, string>(store => store.foodList.InputName)
    const inputWeigh = useSelector<RootStoreType, number>(store => store.foodList.InputWeight)
    const inputPrice = useSelector<RootStoreType, number>(store => store.foodList.InputPrice)
    const outputWeight = useSelector<RootStoreType, string>(store => store.foodList.OutputPricePerKG)
    const dispatch = useDispatch()

    const ShowState = () => {
        console.log(store)
    }
    const onNameInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(AddName(e.currentTarget.value))
    }
    const onPriceInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (isFinite(+e.currentTarget.value)) {
            dispatch(AddPrice(+e.currentTarget.value))
        }
    }
    const onWeightInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (isFinite(+e.currentTarget.value)) {
            dispatch(AddWeight(+e.currentTarget.value))
        }
    }
    const addToListHandler = () => {
        dispatch(AddToListAC())
    }
    const clearListHandler = () => {
        dispatch(ClearListAC())
    }


    return (
        <div className="App">
            <Button onClick={ShowState}>КОНСОЛЬ</Button>
            <hr/>

            <span> ИМЯ: <TextField variant={'outlined'} size={'small'} label={'Название'}
                                   onChange={onNameInputChangeHandler} value={inputName}/></span>
            <span> ЦЕНА: <TextField variant={'outlined'} size={'small'} label={'Цена'}
                                    onChange={onPriceInputChangeHandler} value={inputPrice}/></span>
            <span> ВЕС: <TextField variant={'outlined'} size={'small'} label={'Вес'}
                                   onChange={onWeightInputChangeHandler} value={inputWeigh}/></span>
            <span> ЦЕНА ЗА 1КГ: <TextField size={"small"} disabled value={outputWeight}/></span>

            <Button variant="contained" onClick={addToListHandler}>Добавить в список</Button>
            <hr/>
            <Button variant={"contained"} onClick={clearListHandler}>Очистить список</Button>
            <Grid container spacing={2}>
                {foodList.map(el =>
                    <Grid item xs={12} md={6} lg={2} key={el.id}>
                        <Paper elevation={5}>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant={"h5"}>{`${el.name}`}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>{`${el.startPrice}P за ${el.startWeight} гр.`}</Typography><br/>
                                    <Typography>{`${el.finalPrice}P за 1 кг.`}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}

export default App;
